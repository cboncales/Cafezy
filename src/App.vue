<script setup>
import { ref, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import PreLoader from './components/PreLoader.vue'

const isLoading = ref(true)

onMounted(() => {
  const route = useRoute()

  // Simulate a delay for demonstration
  setTimeout(() => {
    isLoading.value = false
  }, 2000) // Adjust as needed
})
</script>

<template>
  <div>
    <PreLoader v-if="isLoading" />
    <RouterView v-else />
  </div>
</template>
