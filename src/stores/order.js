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
      .eq('status', false) // Look for incomplete (cart) orders
      .maybeSingle() // Use `maybeSingle` to avoid errors when no rows are found

    if (error) {
      console.error('Error fetching active order:', error)
      return null
    }

    if (!data) {
      console.log('No active cart order found.')
    }

    return data // Will be null if no matching row exists
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

  const onOrderNow = async () => {
    if (!activeOrder.value) {
      console.error('No active order to update.')
      return
    }

    try {
      // Update the order status to true (pending)
      const updatedOrder = await orderStore.updateOrder(activeOrder.value.id, {
        status: true,
      })

      if (updatedOrder) {
        console.log('Order status updated successfully.')

        // Clear the active order since it's now in pending status
        activeOrder.value = null
        orderItems.value = []

        // Move to the "Pending" tab
        tab.value = 'two'

        // Optional: Fetch the latest orders if needed
        // await fetchOrders();
      }
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  // Fetch pending orders for the logged-in user
  async function getPendingOrdersForUser() {
    const userId = authStore.userData?.id

    if (!userId) {
      console.error('User is not logged in.')
      return []
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .eq('status', true) // Fetch orders marked as pending

    if (error) {
      console.error('Error fetching pending orders:', error)
      return []
    }

    return data
  }

  return {
    orders,
    $reset,
    getActiveOrderForUser,
    getPendingOrdersForUser,
    createOrder,
    updateOrder,
    onOrderNow,
  }
})
