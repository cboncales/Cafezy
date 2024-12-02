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
      <v-container>
        <div class="my-3">
          <h1 class="text-h5 mb-4 d-flex align-center">
            <v-icon class="text-h5" color="black">mdi-history</v-icon>
            Order Management
          </h1>
        </div>

        <!-- Product Table -->
        <div class="mt-4">
          <v-row class="font-weight-bold my-2">
            <v-col>ID</v-col>
            <v-col>Order</v-col>
            <v-col>Total</v-col>
            <v-col>Status</v-col>
            <v-col>Order Date</v-col>
            <v-col>Actions</v-col>
          </v-row>

          <v-divider></v-divider>

          <v-row
            v-for="product in products"
            :key="product.id"
            class="align-center"
          >
            <v-col>{{ product.id }}</v-col>
            <v-col>{{ product.name }}</v-col>
            <v-col>{{ product.price }}</v-col>
            <v-col class="text-wrap">{{ product.description }}</v-col>
            <v-col>{{ product.category }}</v-col>
            <v-col>
              <v-btn class="mx-1" icon @click="openForm(product)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn class="mx-1" icon color="error">
                <v-icon>mdi-delete</v-icon>
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
</script>

<style scoped>
* {
  font-family: 'Quicksand', sans-serif;
}
</style>
