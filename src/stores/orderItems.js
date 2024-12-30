import { supabase } from '@/utils/supabase'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthUserStore } from './authUser'

export const useOrderItemsStore = defineStore('orderItems', () => {
  const authStore = useAuthUserStore()

  // States
  const orderItems = ref([])

  // Reset State Action
  function $reset() {
    orderItems.value = []
  }

  // Retrieve order items by user
  async function getOrderItems() {
    const userId = authStore.userData?.id

    if (!userId) {
      console.error('User is not logged in.')
      return
    }

    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching order items:', error)
      return
    }

    orderItems.value = data || []
  }

  // Add Order Item
  async function addOrderItem({ orderId, productId, quantity, subtotal }) {
    const { data, error } = await supabase.from('order_items').insert([
      {
        order_id: orderId,
        product_id: productId,
        quantity,
        subtotal,
      },
    ])

    if (error) {
      console.error('Error adding order item:', error)
      return
    }

    console.log('Order item added:', data)
    return data
  }

  // Retrieve order items with product details for a specific order
  async function getOrderItemsWithProductDetails(orderId) {
    const { data, error } = await supabase
      .from('order_items')
      .select(
        `
        id,
        quantity,
        subtotal,
        product_id,
        products (name, price, image_url)
        `,
      )
      .eq('order_id', orderId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching order items with product details:', error)
      return []
    }

    // Format the data to include product details in each order item
    return data.map(item => ({
      ...item,
      product_name: item.products?.name || 'Unknown Product',
      product_price: item.products?.price || 0,
    }))
  }

  return {
    orderItems,
    $reset,
    getOrderItems,
    addOrderItem,
    getOrderItemsWithProductDetails,
  }
})
