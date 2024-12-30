import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'
import { useAuthUserStore } from './authUser'

export const useOrdersStore = defineStore('orders', () => {
  const authStore = useAuthUserStore()

  // States
  const orders = ref([])

  // Reset State Action
  function $reset() {
    orders.value = []
  }

  // Get active order for the logged-in user
  async function getActiveOrderForUser() {
    const userId = authStore.userData?.id

    if (!userId) {
      console.error('User is not logged in.')
      return null
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .eq('status', false) // Find only active (incomplete) orders
      .single() // Get the first matching order

    if (error && error.code !== 'PGRST116') {
      // PGRST116 means no rows found
      console.error('Error fetching active order:', error)
      return null
    }

    return data
  }

  // Create a new order
  async function createOrder({ totalPrice = 0, status = false }) {
    const userId = authStore.userData?.id

    if (!userId) {
      console.error('User is not logged in.')
      return null
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          total_price: totalPrice,
          status,
          user_id: userId,
        },
      ])
      .select()
      .single() // Return the inserted row

    if (error) {
      console.error('Error creating order:', error)
      return null
    }

    console.log('Order created:', data)
    return data
  }

  // Update an order (e.g., mark as completed or update total price)
  async function updateOrder(orderId, updates) {
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .select()
      .single()

    if (error) {
      console.error('Error updating order:', error)
      return null
    }

    console.log('Order updated:', data)
    return data
  }

  return {
    orders,
    $reset,
    getActiveOrderForUser,
    createOrder,
    updateOrder,
  }
})
