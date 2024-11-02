<script setup>
import { ref } from 'vue'

const isPasswordVisible = ref(false)
</script>

<template>
  <v-form fast-fail @submit.prevent>
    <v-text-field
      label="Email"
      prepend-inner-icon="mdi-email-outline"
    ></v-text-field>

    <v-text-field
      prepend-inner-icon="mdi-lock-outline"
      label="Password"
      :type="isPasswordVisible ? 'text' : 'password'"
      :append-inner-icon="
        isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
      "
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
    ></v-text-field>

    <v-btn
      class="mt-2 bg-orange-darken-2"
      type="submit"
      block
      prepend-icon="mdi-dumbbell"
      >Log in</v-btn
    >
  </v-form>
</template>
