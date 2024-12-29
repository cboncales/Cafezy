import { supabase, tableSearch } from '@/utils/supabase'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthUserStore } from './authUser'
import { getSlugText } from '@/utils/helpers'

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
    // Check if there is an image
    if (formData.image) {
      // Upload image in supabase and get the image_url
      formData.image_url = await updateProductImage(
        formData.image,
        formData.name,
      )
      delete formData.image
    }

    // Insert the product with the formData
    return await supabase.from('products').insert([formData]).select()
  }

  // Update Products
  async function updateProduct(formData) {
    // Check if there is an image
    if (formData.image) {
      // Update image in supabase and get the image_url
      formData.image_url = await updateProductImage(
        formData.image,
        formData.name,
      )
      delete formData.image
    }

    // Update the product with the formData
    return await supabase
      .from('products')
      .update(formData)
      .eq('id', formData.id)
      .select()
  }

  // Delete Product
  async function deleteProduct(id) {
    return await supabase.from('products').delete().eq('id', id)
  }

  // Update Product Image
  async function updateProductImage(file, filename) {
    // Upload the file with the file name and file extension
    const { data } = await supabase.storage
      .from('cafezy')
      .upload('products/' + getSlugText(filename) + '.png', file, {
        cacheControl: '3600',
        upsert: true,
      })

    // If no error set data to userData state with the image_url
    if (data) {
      // Retrieve Image Public Url
      const { data: imageData } = supabase.storage
        .from('cafezy')
        .getPublicUrl(data.path)
      return imageData.publicUrl
    }
  }

  return {
    productsFromApi,
    products,
    $reset,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  }
})
