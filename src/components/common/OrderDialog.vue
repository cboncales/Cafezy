<script setup>
import { ref, watch, computed } from 'vue'
import { useOrderItemsStore } from '@/stores/orderItems'
import { useOrdersStore } from '@/stores/order'

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  product: {
    type: Object,
    default: () => ({}),
  },
})

// Use Pinia Store
const orderItemsStore = useOrderItemsStore()
const ordersStore = useOrdersStore()

// Emit events
const emit = defineEmits(['update:modelValue', 'close'])

// Local state for dialog visibility
const dialogVisible = ref(props.modelValue)

// Watch `modelValue` to sync local `dialogVisible`
watch(
  () => props.modelValue,
  newValue => {
    dialogVisible.value = newValue
  },
)

// Emit updates to parent
watch(dialogVisible, newValue => {
  emit('update:modelValue', newValue)
})

// Close dialog
const closeDialog = () => {
  dialogVisible.value = false
  emit('close')
}

// Submit order logic
const quantity = ref(1)
const isSubmitting = ref(false)

const totalPrice = computed(() => {
  return (props.product?.price ?? 0) * quantity.value
})

const submitOrder = async () => {
  isSubmitting.value = true

  try {
    let orderId = props.order?.id

    if (!orderId) {
      // Create a new order
      const newOrder = await ordersStore.createOrder({
        totalPrice: 0, // Initial price (will be updated)
        status: false, // Active order
      })

      orderId = newOrder.id
    }

    await orderItemsStore.addOrderItem({
      orderId,
      productId: props.product.id,
      quantity: quantity.value,
      subtotal: totalPrice.value,
    })

    console.log('Order successfully added!')
    closeDialog()
  } catch (error) {
    console.error('Error adding order:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <v-dialog v-model="dialogVisible" persistent max-width="500px">
    <v-card>
      <v-card-title class="text-center">
        <span class="text-h5">Order Now</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="9">
              <p><strong>Product:</strong> {{ props.product.name }}</p>
              <p><strong>Price:</strong> {{ props.product.price }}</p>
              <p>
                <strong>Description:</strong> {{ props.product.description }}
              </p>
            </v-col>
            <v-col cols="3">
              <v-img
                :src="props.product.image_url"
                :alt="props.product.name"
                height="70"
                width="70"
                cover
              ></v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Quantity"
                type="number"
                v-model="quantity"
                min="1"
                :disabled="isSubmitting"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <p><strong>Total Price:</strong> {{ totalPrice }}</p>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-btn variant="outlined" @click="closeDialog">Cancel</v-btn>
        <v-btn
          variant="outlined"
          color="orange-darken-2"
          :loading="isSubmitting"
          :disabled="isSubmitting"
          @click="submitOrder"
        >
          Add Order
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
* {
  font-family: 'Quicksand', sans-serif;
}

.text-h5 {
  font-weight: bold;
}
</style>
