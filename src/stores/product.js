import { supabase } from '@/utils/supabase'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthUserStore } from './authUser'

export const useProductsStore = defineStore('products', () => {
  const authStore = useAuthUserStore()
  //States
  const productsFromApi = ref([])
  const products = ref([])

  // Getter
  // const sample = computed(() => count.value * 2)

  // Actions
  // Retrieve from API and insert more to products table in Supabase
  async function getProductsFromApi() {
    const response = await axios.get('https://api.restful-api.dev/objects')

    productsFromApi.value = response.data

    const transformedProducts = response.data.map(product => {
      return {
        name: product.name,
        description: product.data?.Description ?? '', 
        price: product.data?.Price ?? 0,
        user_id: authStore.userData.id
      }
    })

    const { data } = await supabase .from('products') .insert(transformedProducts) .select()
    console.log(data)
  }

  // Retrieve from Supabase
  async function getProducts() {
    const { data } = await supabase .from('products') .select('*')

    products.value = data
  }

  return { productsFromApi, products, getProductsFromApi, getProducts }
})
