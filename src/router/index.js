import { createRouter, createWebHistory } from 'vue-router'
import { useAuthUserStore } from '@/stores/authUser'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

router.beforeEach(async to => {
  const authUser = useAuthUserStore()
  const isLoggedIn = await authUser.isAuthenticated()

  // Redirect to appropriate page if accessing home route
  if (to.name === 'home') {
    return isLoggedIn ? { name: 'dashboard' } : { name: 'login' }
  }

  // Allow public access to FoodPage and ContactPage regardless of login status
  if (to.name === 'food' || to.name === 'contact') {
    return true
  }

  // If logged in, redirect to dashboard when accessing login page
  if (isLoggedIn && !to.meta.requiresAuth) {
    return { name: 'dashboard' }
  }

  // If not logged in and trying to access protected routes
  if (!isLoggedIn && to.meta.requiresAuth) {
    return { name: 'login' }
  }

  // If logged in, check user roles for restricted routes
  if (isLoggedIn) {
    await authUser.getUserInformation()
    const isAdmin = authUser.userData?.is_admin || false

    // Restrict access to admin-only routes
    if (!isAdmin && to.meta.requiresAdmin) {
      return { name: 'forbidden' }
    }
  }

  // Redirect to 404 Not Found if the route does not exist
  if (router.resolve(to).matched.length === 0) {
    return { name: 'not-found' }
  }
})

export default router
