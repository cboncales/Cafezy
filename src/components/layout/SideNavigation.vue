<template>
  <v-navigation-drawer
    v-model="isDrawerVisible"
    :temporary="mobile"
    :permanent="!mobile"
    width="325"
    class="custom-sidebar"
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

      <v-list-item title="User Management" class="rounded-button rounded" to="">
        <template #prepend>
          <v-icon color="white">mdi-account-group</v-icon>
        </template>
      </v-list-item>

      <v-list-item
        title="Order Management"
        class="rounded-button rounded"
        to=""
      >
        <template #prepend>
          <v-icon color="white">mdi-history</v-icon>
        </template>
      </v-list-item>

      <v-list-item title="Reports" class="rounded-button rounded" to="">
        <template #prepend>
          <v-icon color="white">mdi-chart-bar</v-icon>
        </template>
      </v-list-item>

      <v-divider class="custom-divider"></v-divider>

      <!-- Settings -->
      <v-list-item title="Settings" class="rounded-button rounded">
        <template #prepend>
          <v-icon>mdi-cog</v-icon>
        </template>
      </v-list-item>
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
  background-color: rgba(0, 0, 0, 0.897); /* Subtle white highlight */
  transform: scale(1.02); /* Slight enlargement */
}

/* Custom Divider */
.custom-divider {
  color: rgba(0, 0, 0, 0.767); /* Semi-transparent white */
}

/* Active State */
.rounded-button:active {
  background-color: rgba(255, 255, 255, 0.3); /* Slightly darker highlight */
}
</style>
