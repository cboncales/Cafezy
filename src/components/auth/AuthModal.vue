<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'

const props = defineProps({
  isVisible: Boolean,
  isRegisterMode: Boolean,
})
</script>

<template>
  <v-dialog
    :model-value="isVisible"
    @update:model-value="$emit('update:isVisible', $event)"
    persistent
    max-width="400"
  >
    <v-card class="rounded-xl">
      <v-card-title class="text-h5 text-center">
        {{ isRegisterMode ? 'Register' : 'Log in' }}
      </v-card-title>
      <v-card-text>
        <component :is="isRegisterMode ? RegisterForm : LoginForm" />
        <v-divider class="my-5"></v-divider>
        <h5 class="text-center">
          {{
            isRegisterMode
              ? 'Already have an account?'
              : "Don't have an account?"
          }}
          <span
            class="text-orange-darken-2"
            @click="$emit('toggleFormMode')"
            style="cursor: pointer"
          >
            {{
              isRegisterMode ? 'Click here to Log in' : 'Click here to Register'
            }}
          </span>
        </h5>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="cancel-btn"
          color="orange-darken-3"
          text
          @click="$emit('update:isVisible', false)"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
