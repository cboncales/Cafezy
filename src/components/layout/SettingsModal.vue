<script setup>
const props = defineProps({
  isVisible: Boolean,
})
</script>

<template>
  <v-dialog
    :model-value="isVisible"
    @update:model-value="$emit('update:isVisible', $event)"
    max-width="400px"
    persistent
  >
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
        <v-btn color="primary" text @click="$emit('update:isVisible', false)"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
