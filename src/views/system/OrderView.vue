<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { ref, computed, onMounted } from 'vue'
import { useOrdersStore } from '@/stores/order'
import { useOrderItemsStore } from '@/stores/orderItems'

// Tab management
const tab = ref('one')

// Stores
const orderStore = useOrdersStore()
const orderItemsStore = useOrderItemsStore()

// States
const activeOrder = ref(null)
const orderItems = ref([])

// Fetch orders and order items on mount
onMounted(async () => {
  // Fetch active order for the logged-in user
  activeOrder.value = await orderStore.getActiveOrderForUser()

  if (activeOrder.value) {
    // Fetch order items with product details for the active order
    orderItems.value = await orderItemsStore.getOrderItemsWithProductDetails(
      activeOrder.value.id,
    )
  }
})
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
                  <v-card-title>Order #{{ activeOrder.id }}</v-card-title>
                  <v-card-subtitle>
                    Ordered on:
                    {{ new Date(activeOrder.created_at).toLocaleDateString() }}
                  </v-card-subtitle>
                  <v-list>
                    <v-list-item v-for="item in orderItems" :key="item.id">
                      <v-list-item-title>
                        {{ item.product_name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        Quantity: {{ item.quantity }} | Subtotal: ₱{{
                          item.subtotal.toFixed(2)
                        }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                  <v-card-subtitle>
                    Total Price: ₱{{ activeOrder.total_price.toFixed(2) }}
                  </v-card-subtitle>
                  <v-card-actions>
                    <v-btn icon color="primary">
                      <v-icon>mdi-receipt</v-icon>
                    </v-btn>
                  </v-card-actions>
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
.font-fam {
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
</style>
