<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { ref, onMounted, watch } from 'vue'
import { useOrdersStore } from '@/stores/order'
import { useOrderItemsStore } from '@/stores/orderItems'
import { sendOrderNowEmail } from '@/utils/email'

// Tab management
const tab = ref('one')

// Stores
const orderStore = useOrdersStore()
const orderItemsStore = useOrderItemsStore()

// States
const activeOrder = ref(null)
const orderItems = ref([])
const pendingOrders = ref([])
const pendingOrderItems = ref({})

// Drawer (your template uses it)
const isDrawerVisible = ref(false)

// Fetch orders and order items on mount
onMounted(async () => {
  // Fetch active order for the logged-in user
  activeOrder.value = await orderStore.getActiveOrderForUser()

  if (activeOrder.value) {
    // Fetch order items with product details for the active order
    orderItems.value = await orderItemsStore.getOrderItemsWithProductDetails(
      activeOrder.value.id,
    )
  } else {
    console.log('No active order found. User may need to create a new order.')
  }

  // Fetch pending orders and their items
  await fetchPendingOrdersAndItems()
})

// Function to fetch pending orders and order items
const fetchPendingOrdersAndItems = async () => {
  pendingOrders.value = await orderStore.getPendingOrdersForUser()
  pendingOrderItems.value = {}

  for (const order of pendingOrders.value) {
    pendingOrderItems.value[order.id] =
      await orderItemsStore.getOrderItemsWithProductDetails(order.id)
  }
}

const removeOrderItem = async itemId => {
  try {
    const success = await orderItemsStore.deleteOrderItem(itemId)

    if (success) {
      orderItems.value = await orderItemsStore.getOrderItemsWithProductDetails(
        activeOrder.value.id,
      )
      console.log('Order item removed successfully')
    } else {
      console.error('Failed to remove order item')
    }
  } catch (error) {
    console.error('Error removing order item:', error)
  }
}

// Watch the "Pending" tab and refresh data when it becomes active
watch(
  () => tab.value,
  async newTab => {
    if (newTab === 'two') {
      await fetchPendingOrdersAndItems()
    }
  },
)

// Handle "Order Now" button click (NOW includes EmailJS)
const onOrderNow = async () => {
  if (!activeOrder.value) {
    console.error('No active order to update.')
    return
  }

  try {
    // 1) Build email message from the cart
    const itemsText = orderItems.value
      .map(
        i =>
          `${i.product_name} x${i.quantity} (₱${Number(i.subtotal).toFixed(2)})`,
      )
      .join(', ')

    const templateParams = {
      order_id: String(activeOrder.value.id),
      items: itemsText,
      total_price: `₱${Number(activeOrder.value.total_price).toFixed(2)}`,
      // CHANGE THIS to your real receiver
      to_email: 'yourgmail@gmail.com',
    }

    // 2) Send email (EmailJS)
    await sendOrderNowEmail(templateParams)

    // 3) Update the order status to true (mark as pending)
    const updatedOrder = await orderStore.updateOrder(activeOrder.value.id, {
      status: true,
    })

    if (updatedOrder) {
      console.log('Order status updated successfully.')

      // Clear the active order since it's now in pending status
      activeOrder.value = null
      orderItems.value = []

      // Move to the "Pending" tab and fetch pending orders
      tab.value = 'two'
      await fetchPendingOrdersAndItems()
    }
  } catch (error) {
    console.error('Error updating order / sending email:', error)
  }
}
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #content>
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" md="8">
            <v-card-title class="headline text-center text-h3 font-fam">
              Your Orders
            </v-card-title>

            <div class="d-flex justify-center">
              <v-tabs v-model="tab" color="orange">
                <v-tab class="mx-10" value="one">Cart</v-tab>
                <v-tab class="mx-10" value="two">Pending</v-tab>
                <v-tab class="mx-10" value="three">Finished</v-tab>
              </v-tabs>
            </div>

            <div class="tab-content mt-10">
              <!-- Cart Orders -->
              <div v-show="tab === 'one'" v-if="activeOrder">
                <v-card class="mb-4">
                  <v-card-title class="font-weight-bold text-h4">
                    Order #{{ activeOrder.id }}
                  </v-card-title>
                  <v-card-subtitle class="font-weight-bold">
                    Ordered on:
                    {{ new Date(activeOrder.created_at).toLocaleDateString() }}
                  </v-card-subtitle>

                  <v-list>
                    <v-list-item
                      v-for="item in orderItems"
                      :key="item.id"
                      class="d-flex justify-space-between align-center my-3"
                    >
                      <div class="d-flex align-center my-2">
                        <v-list-item-title class="font-weight-bold text-h6">
                          {{ item.product_name }}
                        </v-list-item-title>

                        <v-btn
                          icon
                          color="red"
                          size="28"
                          @click="removeOrderItem(item.id)"
                          class="ml-auto"
                        >
                          <v-icon size="18">mdi-delete</v-icon>
                        </v-btn>
                      </div>

                      <v-list-item-subtitle class="font-weight-bold">
                        Quantity: {{ item.quantity }} | Subtotal: ₱{{
                          item.subtotal.toFixed(2)
                        }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>

                  <v-card-text>
                    <div class="d-flex justify-between align-center">
                      <span class="font-weight-bold text-lg text-h6">
                        Total Price:
                        <span
                          class="text-lg font-weight-bold text-orange darken-2 text-h6"
                        >
                          ₱{{ activeOrder.total_price.toFixed(2) }}
                        </span>
                      </span>
                    </div>
                  </v-card-text>

                  <v-card-actions class="justify-end">
                    <v-btn
                      class="order-now-button"
                      color="orange-darken-2"
                      variant="elevated"
                      @click="onOrderNow"
                    >
                      Order Now
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </div>

              <!-- Pending Orders -->
              <div v-show="tab === 'two'">
                <v-card
                  v-for="order in pendingOrders"
                  :key="order.id"
                  class="mb-4"
                >
                  <v-card-title class="font-weight-bold text-h4">
                    Order #{{ order.id }}
                  </v-card-title>
                  <v-card-subtitle class="font-weight-bold">
                    Ordered on:
                    {{ new Date(order.created_at).toLocaleDateString() }}
                  </v-card-subtitle>

                  <v-list v-if="pendingOrderItems[order.id]">
                    <v-list-item
                      v-for="item in pendingOrderItems[order.id]"
                      :key="item.id"
                    >
                      <v-list-item-title class="font-weight-bold text-h6">
                        {{ item.product_name }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="font-weight-bold">
                        Quantity: {{ item.quantity }} | Subtotal: ₱{{
                          item.subtotal.toFixed(2)
                        }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>

                  <v-card-text>
                    <span class="font-weight-bold text-lg text-h6">
                      Total Price:
                      <span
                        class="text-lg font-weight-bold text-orange darken-2 text-h6"
                      >
                        ₱{{ order.total_price.toFixed(2) }}
                      </span>
                    </span>
                  </v-card-text>
                </v-card>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
* {
  font-family: 'Quicksand', sans-serif;
  font-weight: 700;
  color: rgb(82, 80, 80);
}

.custom-tabs .v-tabs-slider {
  display: none;
}

.tab-content {
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
}

.order-now-button {
  margin-top: 16px;
}
</style>
