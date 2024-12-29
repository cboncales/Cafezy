<script setup>
import ProductsFormDialog from '@/components/system/manage-products/ProductsFormDialog.vue'
import { ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import ProductsTable from '@/components/system/manage-products/ProductsTable.vue'
import { useProductsStore } from '@/stores/product'

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

// Use Pinia Store
const productStore = useProductsStore()

// Load Variables
const tableFilters = ref({
  search: '',
})
const productData = ref(null)
const isDialogVisible = ref(false)

// Add Product Functionality
const onAdd = () => {
  isDialogVisible.value = true
}

// Trigger retrieve from API and reset db
const onRetrieveFromApi = async () => {
  await productStore.getProductsFromApi()
}

// Load Functions during component rendering
onMounted(async () => {
  if (productStore.products.length === 0)
    await productStore.getProducts(tableFilters)
})
</script>

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
            <p>Add and Manage Products</p>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" sm="5">
            <v-card max-width="400">
              <v-card-text>
                <v-text-field
                  v-model="tableFilters.search"
                  :loading="loading"
                  append-inner-icon="mdi-magnify"
                  density="compact"
                  label="Search Product"
                  variant="solo"
                  hide-details
                  @click:append-inner="onClick"
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3">
            <v-btn
              class="my-5"
              color="orange-darken-2"
              prepend-icon="mdi-plus"
              block
              @click="onAdd"
              >Add Product</v-btn
            >
          </v-col>
          <v-col cols="12" sm="1">
            <v-btn
              class="my-5"
              variant="elevated"
              density="comfortable"
              @click="onRetrieveFromApi"
              icon
            >
              <v-icon icon="mdi-refresh"></v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>

        <!-- Product Table -->
        <v-card>
          <v-card-text>
            <ProductsTable></ProductsTable>
          </v-card-text>
        </v-card>

        <!-- Product Form Dialog -->
        <ProductsFormDialog
          v-model:is-dialog-visible="isDialogVisible"
          :product-data="productData"
          :table-filter="tableFilters"
        ></ProductsFormDialog>
      </v-container>
    </template>
  </AppLayout>
</template>

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
