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
      <v-list-item title="Cafezy" class="rounded-button">
        <template #prepend>
          <v-icon color="white">mdi-cup</v-icon>
        </template>
      </v-list-item>

      <v-divider class="custom-divider"></v-divider>

      <!-- Navigation Buttons -->
      <v-list-item
        v-for="([title, icon], i) in mainNav"
        :key="i"
        class="rounded-button"
      >
        <template #prepend>
          <v-icon>{{ icon }}</v-icon>
        </template>
        <template #title>
          {{ title }}
        </template>
      </v-list-item>

      <v-divider class="custom-divider"></v-divider>

      <!-- Settings -->
      <v-list-item title="Settings" class="rounded-button">
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
  ['Place Order', 'mdi-cart'],
  ['Order History', 'mdi-history'],
  ['Menu Management', 'mdi-food'],
  ['Customer Management', 'mdi-account-group'],
  ['Reports', 'mdi-chart-bar'],
]
</script>

<style scoped>
/* Sidebar Background Image */
.custom-sidebar {
  background-image: url('images/sbbackground.png'); /* Replace with your image */
  background-size: cover;
  background-position: center;
  color: white; /* Ensure text is readable */
}

/* Transparent Title */
.transparent-title {
  color: white; /* Adjust for contrast */
  font-weight: bold;
  text-align: center;
  font-size: 1.25rem;
}

/* Rounded Buttons */
.rounded-button {
  margin: 8px 16px; /* Space around buttons */
  border-radius: 24px; /* Rounded corners */
  background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent black */
  color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  display: flex;
  align-items: center;
  padding: 10px 16px;
}

/* Hover Effect */
.rounded-button:hover {
  background-color: rgba(255, 255, 255, 0.2); /* Subtle white highlight */
  transform: scale(1.02); /* Slight enlargement */
}

/* Custom Divider */
.custom-divider {
  border-color: rgba(255, 255, 255, 0.2); /* Semi-transparent white */
}

/* Active State */
.rounded-button:active {
  background-color: rgba(255, 255, 255, 0.3); /* Slightly darker highlight */
}
</style>
