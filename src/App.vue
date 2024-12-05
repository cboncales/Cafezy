<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import BurgerPreloader from './components/PreLoader.vue'

const isLoading = ref(true)

onMounted(() => {
  // Check if the preloader has been shown before
  const hasLoaded = localStorage.getItem('hasLoaded')

  if (!hasLoaded) {
    // Simulate preloader duration
    setTimeout(() => {
      isLoading.value = false
      localStorage.setItem('hasLoaded', 'true') // Mark as loaded
    }, 2000) // Adjust the delay as needed
  } else {
    // Skip preloader if already loaded
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <BurgerPreloader v-if="isLoading" />
    <RouterView v-else />
  </div>
</template>
