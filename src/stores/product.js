import { supabase, tableSearch } from '@/utils/supabase'
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
      console.error('User is not authenticated or user data is missing.')
      return
    }

    // Fetch products from API
    const response = await axios.get('https://api.restful-api.dev/objects')

    // Set response data to state
    productsFromApi.value = response.data

    // Delete all rows from products Supabase
    await supabase.from('products').delete().neq('id', 0)

    // Re-map/Restructure array of objects to fit the products table's column
    const transformedProducts = response.data.map(product => {
      return {
        name: product.name,
        description: product.data?.Description ?? '',
        price: product.data?.Price ?? 0,
        user_id: authStore.userData.id,
      }
    })

    // Insert multiple rows from the re-mapped array of objects
    const { data } = await supabase
      .from('products')
      .insert(transformedProducts)
      .select()

    if (data) await getProducts({ search: '' })
  }

  // Retrieve products from Supabase
  async function getProducts(search) {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('name', { ascending: true })
      .ilike('name', `%${search || ''}%`)

    // Set the retrieved data to state
    products.value = data || []
  }

  async function addProduct(formData) {
    return await supabase.from('products').insert([formData]).select()
  }

  return {
    productsFromApi,
    products,
    $reset,
    getProductsFromApi,
    getProducts,
    addProduct,
  }
})
