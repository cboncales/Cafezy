// Import views
import HomePage from '@/views/system/HomePage.vue'
import FoodPage from '@/views/auth/FoodPage.vue'
import ContactPage from '@/views/auth/ContactPage.vue'
import DashboardView from '@/views/auth/DashboardView.vue'
import ProductsView from '@/views/system/manage-product/ProductsView.vue'
import UserView from '@/views/system/manage-user/UserView.vue'
import ManageOrderView from '@/views/system/manage-order/ManageOrderView.vue'
import ReportView from '@/views/system/manage-report/ReportView.vue'
import OrderView from '@/views/system/OrderView.vue'
import ForbiddenView from '@/views/errors/ForbiddenView.vue'
import NotFoundView from '@/views/errors/NotFoundView.vue'

export const routes = [
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
    path: '/product',
    name: 'product',
    component: ProductsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
    meta: { requiresAuth: true },
  },
  {
    path: '/manage-order',
    name: 'manage-order',
    component: ManageOrderView,
    meta: { requiresAuth: true },
  },
  {
    path: '/report',
    name: 'report',
    component: ReportView,
    meta: { requiresAuth: true },
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView,
    meta: { requiresAuth: true },
  },

  // Error Pages
  {
    path: '/forbidden',
    name: 'forbidden',
    component: ForbiddenView,
  },
  {
    path: '/:catchAll(.*)',
    component: NotFoundView,
  },
]
