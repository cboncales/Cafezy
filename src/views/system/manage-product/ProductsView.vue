<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import ProductList from '@/components/system/manage-products/ProductsList.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'

// Utilize pre-defined vue functions
const { mobile } = useDisplay()

// Load Variables
const isDrawerVisible = ref(!mobile.value)
const isAdmin = ref(true)
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
        <v-card>
          <v-card-text>
            <ProductList></ProductList>
          </v-card-text>
        </v-card>
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
