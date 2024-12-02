<script setup>
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/product.js'

const productsStore = useProductsStore()

onMounted(async () => {
  if (productsStore.products.length == 0)
    await productsStore.getProductsFromApi()

  console.log(productsStore.products)
})
</script>
<template>
  <v-row>
    <v-col
      cols="12"
      sm="4"
      v-for="product in productsStore.products"
      :key="product.id"
    >
      <v-card :title="product.name" min-height="200">
        <v-card-text>
          <ul class="ms-5">
            <li v-for="(value, key) in product.data" :key="key">
              <span class="font-weight-bold"> {{ key }}:</span> {{ value }}
            </li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="elevated" density="comfortable" icon>
            <v-icon icon="mdi-pencil"></v-icon>
          </v-btn>
          <v-btn variant="elevated" density="comfortable" icon>
            <v-icon color="error" icon="mdi-delete"></v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<style scoped></style>
