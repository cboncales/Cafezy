<script setup>
import SideNavigation from '@/components/layout/SideNavigation.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import AuthModal from '@/components/auth/AuthModal.vue'
import OrderDialog from '@/components/common/OrderDialog.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { useProductsStore } from '@/stores/product'
import { useDisplay } from 'vuetify'
import { onMounted, ref, computed } from 'vue'

const { mobile } = useDisplay()

// Use the authUser and product stores
const authUser = useAuthUserStore()
const productStore = useProductsStore()

// State for dialog visibility
const dialogVisible = ref(false)
const selectedProduct = ref(null)

const selectedCategories = ref([])

// State for drawer visibility
const isDrawerVisible = ref(false)

// State to track modal visibility
const isLoginModalVisible = ref(false)
const isRegisterMode = ref(false)
const isAdmin = ref(false)

// Products state
const products = ref([])

// Dynamic filter based on selected chips
const filteredProducts = computed(() => {
  // If no category is selected, show all products
  if (selectedCategories.value.length === 0) {
    return products.value
  }

  // Otherwise, filter products that match the selected categories
  return products.value.filter(product =>
    selectedCategories.value.includes(product.category_id),
  )
})

// Toggle chip selection
const toggleCategory = categoryId => {
  if (selectedCategories.value.includes(categoryId)) {
    selectedCategories.value = selectedCategories.value.filter(
      id => id !== categoryId,
    )
  } else {
    selectedCategories.value.push(categoryId)
  }
}

// Handle "Order Now" button click
const handleOrderNow = item => {
  if (!authUser.userData) {
    isLoginModalVisible.value = true
    isRegisterMode.value = false
  } else {
    console.log('Order placed for:', item)
  }
}

// Open Order Dialog
const openOrderDialog = product => {
  selectedProduct.value = product
  dialogVisible.value = true
}

const handleDialogClose = () => {
  dialogVisible.value = false
  selectedProduct.value = null
}

// Get Authentication status and user data
const getLoggedStatus = async () => {
  const loggedIn = await authUser.isAuthenticated()
  if (loggedIn) {
    await authUser.getUserInformation()
    isAdmin.value = authUser.userData?.is_admin || false
  } else {
    isAdmin.value = false
    authUser.$reset()
  }
}

// Fetch products on mount
const fetchProducts = async () => {
  await productStore.getProducts()
  products.value = productStore.products
}

// Toggle login to register modal
const toggleFormMode = () => {
  isRegisterMode.value = !isRegisterMode.value
}

// Load Functions during component rendering
onMounted(() => {
  getLoggedStatus()
  fetchProducts()
})

// Food Categories
const foodCategories = ['Rice', 'Dishes', 'Street Foods', 'Drinks', 'Desserts']
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation>
      <SideNavigation
        v-if="isAdmin"
        :is-drawer-visible="isDrawerVisible"
      ></SideNavigation>
    </template>

    <template #content>
      <v-container>
        <v-row>
          <v-container>
            <div class="head-container my-16">
              <h1 class="head-text text-center my-5">Food Menu</h1>
              <v-item-group class="text-center" multiple>
                <v-chip
                  v-for="(category, index) in foodCategories"
                  :key="index"
                  class="mx-2"
                  :class="{
                    'bg-orange text-white': selectedCategories.includes(
                      index + 1,
                    ),
                  }"
                  @click="toggleCategory(index + 1)"
                >
                  {{ category }}
                </v-chip>
              </v-item-group>
            </div>

            <!-- Products filtered by category -->
            <v-row justify="center" align="center">
              <v-col
                v-for="product in filteredProducts"
                :key="product.id"
                cols="12"
                md="4"
              >
                <v-card class="ordering-card rounded-xl" outlined>
                  <v-img
                    class="card-img rounded-xl hover-image"
                    :src="product.image_url"
                    :alt="product.name"
                    height="300"
                    cover
                  >
                    <div class="overlay">
                      <v-card-actions class="hover-actions">
                        <v-btn
                          class="order-btn rounded-pill"
                          color="white"
                          block
                          prepend-icon="mdi mdi-cart"
                          @click="openOrderDialog(product)"
                        >
                          Order
                        </v-btn>
                      </v-card-actions>
                    </div>
                  </v-img>
                  <v-card-title>
                    <h2 class="text-center">{{ product.name }}</h2>
                    <h3 class="text-center">
                      ₱{{ product.price }}/per serving
                    </h3>
                  </v-card-title>
                  <v-card-text class="text-center">
                    {{ product.description }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-row>
      </v-container>

      <OrderDialog
        v-if="selectedProduct"
        :product="selectedProduct"
        :modelValue="dialogVisible"
        @update:modelValue="value => (dialogVisible = value)"
        @close="handleDialogClose"
      />

      <AuthModal
        v-model:isVisible="isLoginModalVisible"
        :is-register-mode="isRegisterMode"
        @toggleFormMode="toggleFormMode"
      />
    </template>
  </AppLayout>
</template>

<style scoped>
.head-text {
  font-size: 50px;
  color: rgb(82, 80, 80);
}

.ordering-card {
  margin-bottom: 20px;
  position: relative;
}

.ordering-card h2,
.ordering-card h3 {
  color: rgb(82, 80, 80);
}

.hover-image {
  position: relative;
  transition: filter 0.3s ease;
}

.hover-image:hover {
  filter: brightness(0.7);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.hover-image:hover .overlay {
  opacity: 1;
}

.hover-actions {
  z-index: 2;
}

.order-btn {
  background-color: #000;
}
</style>
