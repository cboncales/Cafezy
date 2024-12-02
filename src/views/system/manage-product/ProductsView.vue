<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <!-- Side Navigation -->
    <template #navigation>
      <SideNavigation
        v-if="isAdmin"
        :is-drawer-visible="isDrawerVisible"
      ></SideNavigation>
    </template>

    <!-- Content -->
    <template #content>
      <v-container class="content-container">
        <v-row>
          <v-col class="my-3">
            <h1 class="text-h5 mb-4 d-flex align-center">
              <v-icon class="text-h5" color="black">mdi-food</v-icon> Product
              Management
            </h1>
          </v-col>
        </v-row>
        <v-row class="d-flex">
          <v-col>
            <v-btn color="orange-darken-2" @click="openForm"
              >Create New Product</v-btn
            >
            <v-card class="mx-auto my-10" max-width="400">
              <v-card-text>
                <v-text-field
                  :loading="loading"
                  append-inner-icon="mdi-magnify"
                  density="compact"
                  label="Search Product"
                  variant="solo"
                  hide-details
                  single-line
                  @click:append-inner="onClick"
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-divider></v-divider>

        <!-- Product Table -->
        <div class="mt-4 mb-10">
          <v-row class="font-weight-bold my-2">
            <v-col>ID</v-col>
            <v-col>Name</v-col>
            <v-col>Price</v-col>
            <v-col>Description</v-col>
            <v-col>Category</v-col>
            <v-col>Actions</v-col>
          </v-row>

          <v-divider></v-divider>

          <v-row
            v-for="product in products"
            :key="product.id"
            class="align-center py-4"
          >
            <v-col>{{ product.id }}</v-col>
            <v-col>{{ product.name }}</v-col>
            <v-col>{{ product.price }}</v-col>
            <v-col class="text-wrap">{{ product.description }}</v-col>
            <v-col>{{ product.category }}</v-col>
            <v-col>
              <v-btn
                variant="text"
                class="mx-1"
                density="comfortable"
                icon
                @click="openForm(product)"
              >
                <v-icon icon="mdi-pencil"></v-icon>
              </v-btn>
              <v-btn
                variant="text"
                class="mx-1"
                density="comfortable"
                icon
                color="error"
              >
                <v-icon icon="mdi-delete"></v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <!-- Product Form Dialog -->
        <v-dialog v-model="isFormVisible" max-width="500">
          <v-card>
            <v-card-title>
              {{ selectedProduct ? 'Edit Product' : 'Create Product' }}
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Product Name"
                  v-model="selectedProduct.name"
                ></v-text-field>
                <v-text-field
                  label="Price"
                  v-model="selectedProduct.price"
                ></v-text-field>
                <v-text-field
                  label="Description"
                  v-model="selectedProduct.description"
                ></v-text-field>
                <v-text-field
                  label="Category"
                  v-model="selectedProduct.category"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="closeForm">Save</v-btn>
              <v-btn text @click="closeForm">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </template>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'

const { mobile } = useDisplay()

const isDrawerVisible = ref(!mobile.value)
const isAdmin = ref(true)

const loaded = ref(false)
const loading = ref(false)

function onClick() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    loaded.value = true
  }, 2000)
}

const products = ref([
  {
    id: 1,
    name: 'Bulalo',
    price: 50,
    description: 'Beef Soup',
    category: 'Soup',
  },
  {
    id: 2,
    name: 'Halo Halo',
    price: 45,
    description:
      'made with crushed ice, sweetened fruits, beans, jellies, and sometimes ice cream, all topped with leche flan and purple yam (ube)',
    category: 'Dessert',
  },
  {
    id: 3,
    name: 'Burger',
    price: 30,
    description: 'beef burger',
    category: 'Burger',
  },
])

const selectedProduct = ref({})
const isFormVisible = ref(false)

const openForm = (product = null) => {
  selectedProduct.value = product
    ? { ...product }
    : { name: '', price: 0, description: '', category: '' }
  isFormVisible.value = true
}

const closeForm = () => {
  isFormVisible.value = false
}
</script>

<style scoped>
* {
  font-family: 'Quicksand', sans-serif;
}

.text-wrap {
  white-space: normal;
  word-wrap: break-word;
}

.v-card--variant-elevated {
  box-shadow: none;
}
</style>
