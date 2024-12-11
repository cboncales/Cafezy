<template>
  <v-navigation-drawer
    v-model="isDrawerVisible"
    :temporary="mobile"
    :permanent="!mobile"
    width="325"
    class="custom-sidebar"
    color="grey-lighten-3"
  >
    <v-list dense>
      <!-- App Title -->
      <v-list-item
        title="Dashboard"
        class="rounded-button rounded"
        to="/dashboard"
      >
        <template #prepend>
          <v-icon color="white">mdi-cup</v-icon>
        </template>
      </v-list-item>

      <v-divider class="custom-divider"></v-divider>

      <!-- Navigation Buttons -->
      <v-list-item
        title="Product Management"
        class="rounded-button rounded"
        to="/product"
      >
        <template #prepend>
          <v-icon color="white">mdi-food</v-icon>
        </template>
      </v-list-item>

      <v-list-item
        title="User Management"
        class="rounded-button rounded"
        to="/user"
      >
        <template #prepend>
          <v-icon color="white">mdi-account-group</v-icon>
        </template>
      </v-list-item>

      <v-list-item
        title="Order Management"
        class="rounded-button rounded"
        to="/manage-order"
      >
        <template #prepend>
          <v-icon color="white">mdi-history</v-icon>
        </template>
      </v-list-item>

      <v-list-item title="Reports" class="rounded-button rounded" to="/report">
        <template #prepend>
          <v-icon color="white">mdi-chart-bar</v-icon>
        </template>
      </v-list-item>

      <v-divider class="custom-divider"></v-divider>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { ref, watch } from 'vue'

const props = defineProps(['isDrawerVisible'])
const { mobile } = useDisplay()

const isDrawerVisible = ref(props.isDrawerVisible)
watch(props, () => {
  isDrawerVisible.value = props.isDrawerVisible
  console.log('Drawer visibility updated:', isDrawerVisible.value)
})

// Navigation items
const mainNav = [
  ['Menu Management', 'mdi-food'],
  ['Customer Management', 'mdi-account-group'],
  ['Order Management', 'mdi-history'],
  ['Reports', 'mdi-chart-bar'],
]
</script>

<style scoped>
/* Rounded Buttons */
.rounded-button {
  margin: 8px 16px; /* Space around buttons */
  border-radius: 24px; /* Rounded corners */
  background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent black */
  color: rgb(255, 255, 255);
  box-shadow: 0px 4px 6px rgba(214, 15, 15, 0.1); /* Subtle shadow */
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  display: flex;
  align-items: center;
  padding: 10px 16px;
}

/* Hover Effect */
.rounded-button:hover {
  background-color: rgba(0, 0, 0, 0.897);
  transform: scale(1.02);
}

/* Custom Divider */
.custom-divider {
  color: rgba(0, 0, 0, 0.767);
}

/* Active State */
.rounded-button:active {
  background-color: rgba(0, 0, 0, 0.897);
}
</style>
