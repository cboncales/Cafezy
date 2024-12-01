import { getUserInformation, isAuthenticated } from '@/utils/supabase'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/auth/HomePage.vue'
import FoodPage from '@/views/auth/FoodPage.vue'
import ContactPage from '@/views/auth/ContactPage.vue'
import DashboardView from '@/views/system/DashboardView.vue'
import OrderView from '@/views/system/OrderView.vue'
import ForbiddenView from '@/views/errors/ForbiddenView.vue'
import NotFoundView from '@/views/errors/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Auth Pages
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/login',
      name: 'login',
      component: HomePage,
      meta: { requiresAuth: false },
    },
    {
      path: '/food',
      name: 'food',
      component: FoodPage,
      meta: { requiresAuth: false },
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage,
      meta: { requiresAuth: false },
    },

    // System Pages
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/order',
      name: 'order',
      component: OrderView,
      meta: { requiresAuth: true },
    },
    // Add More Pages Here
    // {
    //   path: '/system/sample-page',
    //   name: 'sample-page',
    //   component: sample-page
    // },
    // Errors Pages
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenView,
    },
    {
      path: '/:catchAll(.*)',
      component: NotFoundView,
    },
  ],
})

router.beforeEach(async to => {
  const isLoggedIn = await isAuthenticated()

  // Redirect to appropriate page if accessing home route
  if (to.name === 'home') {
    return isLoggedIn ? { name: 'dashboard' } : { name: 'login' }
  }

  // Check if the user is logged in
  if (isLoggedIn && !to.meta.requiresAuth) {
    // redirect the user to the dashboard page
    return { name: 'dashboard' }
  }

  // If not logged in and going to system pages
  if (!isLoggedIn && to.meta.requiresAuth) {
    // redirect the user to the login page
    return { name: 'login' }
  }

  // Check if the user is logged in
  if (isLoggedIn) {
    // Retrieve information
    const userMetadata = await getUserInformation()

    // Get the user role
    const isAdmin = userMetadata.is_admin

    // remove this comment if not need; Boolean Approach
    // const isCashier = userMetadata.is_cashier
    // remove this comment if not need; String Approach
    // const isCashier = userMetadata.role === 'Cashier'

    // Restrict access to admin-only routes
    if (!isAdmin && to.meta.requiresAdmin) {
      return { name: 'forbidden' }
    }

    // Add conditions here if needed
    // if(isCashier) {
    // }
  }

  // Redirect to 404 Not Found if the route does not exist
  if (router.resolve(to).matched.length === 0) {
    return { name: 'not-found' }
  }
})

export default router
