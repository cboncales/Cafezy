<script setup>
// Import necessary Vue functions
import { ref, watch } from 'vue'

// Prop to control visibility from the parent (v-model binding)
const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
})

// Emit function to notify the parent to update the modal visibility
const emit = defineEmits(['update:value'])

// Local state for modal visibility
const isVisible = ref(props.value)

// Watch for changes in the `value` prop to sync modal visibility with the parent
watch(
  () => props.value,
  newVal => {
    // Only update the local state when the parent changes the value
    if (newVal !== isVisible.value) {
      isVisible.value = newVal
    }
  },
)

// Function to close the modal and emit updated visibility to the parent
const closeModal = () => {
  // Change the state to false to close the modal
  isVisible.value = false
  emit('update:value', false) // Emit 'update:value' to parent to close the modal
}
</script>

<template>
  <!-- v-dialog is bound to 'value' using v-model, automatically syncing visibility -->
  <v-dialog v-model="isVisible" max-width="400px" persistent>
    <v-card>
      <v-card-title class="text-h6">Account Settings</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item>
            <v-btn variant="plain" class="w-100">Profile</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn variant="plain" class="w-100">Edit Profile</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn variant="plain" class="w-100">Change Password</v-btn>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="closeModal">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
