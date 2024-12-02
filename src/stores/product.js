import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  //States
  const products = ref([])

  //Getter
  //   const sample = computed(() => count.value * 2)

  //Actions
  async function getProductsFromApi() {
    const response = await axios.get('https://api.restful-api.dev/objects')

    products.value = response.data
  }

  return { products, getProductsFromApi }
})
