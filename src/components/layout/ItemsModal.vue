<script setup>
import { ref, computed } from 'vue'

const isModalVisible = ref(false)

// Mock item data
const item = ref({
  image: '/images/sample-item.jpg',
  name: 'Sample Item',
  description: 'This is a delicious food item.',
  price: 120,
})

const quantity = ref(1)

// Calculate subtotal based on quantity and price
const subtotal = computed(() => quantity.value * item.value.price)

// Increase quantity
const increaseQuantity = () => {
  quantity.value += 1
}

// Decrease quantity
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1
  }
}

// Add to cart function
const addToCart = () => {
  console.log(`Added ${quantity.value} of ${item.value.name} to cart.`)
  closeModal()
}

// Close modal
const closeModal = () => {
  isModalVisible.value = false
}
</script>

<template>
  <v-dialog v-model="isModalVisible" max-width="800">
    <v-card>
      <v-card-title class="text-h5">Item Details</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <!-- Left Column: Image and Quantity -->
          <v-col cols="12" md="6" class="d-flex flex-column align-center">
            <v-img
              :src="item.image"
              alt="Item Image"
              max-height="300"
              class="rounded-lg mb-4"
              contain
            ></v-img>
            <div class="d-flex align-center">
              <v-btn icon @click="decreaseQuantity" :disabled="quantity <= 1">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <span class="mx-2 text-h6">{{ quantity }}</span>
              <v-btn icon @click="increaseQuantity">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </v-col>

          <!-- Right Column: Item Details -->
          <v-col cols="12" md="6">
            <div>
              <h3 class="text-h5 font-weight-bold">{{ item.name }}</h3>
              <p class="text-subtitle-1">{{ item.description }}</p>
              <h4 class="text-h6 font-weight-bold">Price: ₱{{ item.price }}</h4>
            </div>

            <!-- Subtotal and Add to Cart Button -->
            <div class="mt-10 d-flex justify-space-between align-center">
              <div>
                <h5 class="text-h6 font-weight-bold">
                  Subtotal: ₱{{ subtotal }}
                </h5>
              </div>
              <v-btn
                color="primary"
                class="rounded-pill"
                block
                @click="addToCart"
              >
                Add to Cart
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="primary" @click="closeModal">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
/* Styling adjustments for layout */
.v-img {
  max-height: 300px;
  object-fit: contain;
}

.text-subtitle-1 {
  color: #555;
}
</style>
