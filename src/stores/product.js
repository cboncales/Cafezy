import { supabase } from '@/utils/supabase'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthUserStore } from './authUser'

export const useProductsStore = defineStore('products', () => {
  const authStore = useAuthUserStore()
  // States
  const productsFromApi = ref([])
  const products = ref([])

  // Reset State Action
  function $reset() {
    productsFromApi.value = []
    products.value = []
  }

  // Actions
  // Retrieve from API and insert more to products table in Supabase
  async function getProductsFromApi() {
    // Ensure user is authenticated
    if (!authStore.userData || !authStore.userData.id) {
      console.error("User is not authenticated or user data is missing.");
      return;
    }
    
    // Fetch products from API
    const response = await axios.get('https://api.restful-api.dev/objects')

    productsFromApi.value = response.data

    
    await supabase .from('products') .delete() .neq('id', 0)
        

    const transformedProducts = response.data.map(product => {
      return {
        name: product.name,
        description: product.data?.Description ?? '', 
        price: product.data?.Price ?? 0,
        user_id: authStore.userData.id,
      }
    })

    // Insert products into Supabase
    const { data, error } = await supabase.from('products').insert(transformedProducts).select()

    if (error) {
      console.error("Error inserting products:", error);
    } else {
      console.log("Inserted products:", data)
    }

    if (data) await getProducts()
  }

  // Retrieve products from Supabase
  async function getProducts() {
    const { data, error } = await supabase.from('products').select('*')

    if (error) {
      console.error("Error retrieving products:", error);
    } else {
      products.value = data
    }
  }

  return { productsFromApi, products, $reset, getProductsFromApi, getProducts }
})
