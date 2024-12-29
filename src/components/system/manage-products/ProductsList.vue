<script setup>
import { ref, onMounted } from 'vue'
import ProductsFormDialog from '@/components/system/manage-products/ProductsFormDialog.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useProductsStore } from '@/stores/product'
import { getMoneyText } from '@/utils/helpers'
import { formActionDefault } from '@/utils/supabase'

// Use Pinia Store
const productsStore = useProductsStore()

// Load Variables
const tableFilters = ref({
  search: '',
})
const productData = ref(null)
const isDialogVisible = ref(false)
const isConfirmDeleteDialog = ref(false)
const deleteId = ref('')
const formAction = ref({
  ...formActionDefault,
})

// Add Product Functionality
const onAdd = () => {
  productData.value = null
  isDialogVisible.value = true
}

// Update Product Functionality
const onUpdate = product => {
  productData.value = product
  isDialogVisible.value = true
}

// Delete Item; You can modify this, check other Components like ProductsTable, so that you could have confirm dialog
const onDelete = async id => {
  deleteId.value = id
  isConfirmDeleteDialog.value = true
}

// Confirm Delete
const onConfirmDelete = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  const { error } = await productsStore.deleteProduct(deleteId.value)

  formAction.value.formProcess = false

  if (error) {
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
    return
  }

  formAction.value.formSuccessMessage = 'Successfully Deleted Product.'

  // Refresh the product list after successful deletion
  await productsStore.getProducts('')
}

const onSearchProducts = async () => {
  const searchValue = tableFilters.value.search || ''
  if (searchValue.length >= 3 || searchValue === '') {
    await productsStore.getProducts(searchValue)
  }
}

// Trigger retrieve from API and reset db
const onRetrieveFromApi = async () => {
  await productsStore.getProductsFromApi()
}

// Load Functions during component rendering
onMounted(async () => {
  if (productsStore.products.length === 0) await productsStore.getProducts('')
})
</script>

<template>
  <v-row>
    <v-col cols="12" sm="8">
      <v-text-field
        v-model="tableFilters.search"
        variant="outlined"
        label="Search Product"
        density="compact"
        append-inner-icon="mdi-magnify"
        clearable
        @click:clear="onSearchProducts"
        @input="onSearchProducts"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="3">
      <v-btn
        prepend-icon="mdi-plus"
        color="orange-darken-2"
        @click="onAdd"
        block
        >Add Product</v-btn
      >
    </v-col>
    <v-col cols="12" sm="1">
      <v-btn
        variant="elevated"
        density="comfortable"
        @click="onRetrieveFromApi"
        icon
      >
        <v-icon icon="mdi-refresh"></v-icon>
      </v-btn>
    </v-col>

    <v-divider></v-divider>

    <!-- Product Table -->

    <!-- prettier-ignore -->
    <v-col cols="12" sm="4" v-for="product in productsStore.products" :key="product.id"> 
        <v-card :title="product.name" min-height="200">
            <v-card-text>
                <v-img v-if="product.image_url" :src="product.image_url" height="150" cover ></v-img>
                <!-- Display price and description -->
                <p><strong>Price:</strong> {{ getMoneyText(product.price) }}</p>
                <p><strong>Description:</strong> {{ product.description }}</p>
            </v-card-text>
            <v-card-actions>
                <v-btn variant="elevated" density="comfortable" @click="onUpdate(product)" icon>
                    <v-icon icon="mdi-pencil"></v-icon>
                </v-btn>
                <v-btn variant="elevated" density="comfortable" @click="onDelete(product.id)" icon>
                    <v-icon color="error" icon="mdi-delete"></v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
  </v-row>

  <!-- Product Form Dialog -->
  <ProductsFormDialog
    v-model:is-dialog-visible="isDialogVisible"
    :product-data="productData"
    :table-filter="tableFilters"
  ></ProductsFormDialog>

  <!-- Confirm Delete Dialog -->
  <ConfirmDialog
    v-model:is-dialog-visible="isConfirmDeleteDialog"
    title="Confirm Delete"
    text="Are you sure you want to delete product?"
    @confirm="onConfirmDelete"
  ></ConfirmDialog>
</template>
<style scoped>
* {
  font-family: 'Quicksand', sans-serif;
}
</style>
