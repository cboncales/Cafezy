<script setup>
const props = defineProps({
  isVisible: Boolean,
  userData: Object,
})
</script>

<template>
  <v-dialog
    :model-value="isVisible"
    @update:model-value="$emit('update:isVisible', $event)"
    max-width="520px"
    persistent
  >
    <v-card>
      <v-card-title class="text-h5 text-center">Account Settings</v-card-title>
      <v-divider></v-divider>
      <v-row>
        <v-col
          class="d-flex justify-center flex-column align-center"
          cols="12"
          md="6"
        >
          <v-avatar class="my-2" color="deep-orange-lighten-1" size="large">
            <span class="text-h5">{{ userData.initials }}</span>
          </v-avatar>
          <v-btn variant="plain" class="my-5 w-100">Edit Profile</v-btn>
        </v-col>
        <v-col
          class="d-flex justify-center flex-column align-center"
          cols="12"
          md="6"
        >
          <p class="text-center text-h6 my-2">{{ userData.fullname }}</p>
          <p class="text-center my-2">{{ userData.email }}</p>

          <v-btn variant="plain" class="my-5 w-100">Change Password</v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>

      <v-card-actions class="d-flex justify-center">
        <v-btn
          color="orange-darken-2"
          text
          @click="$emit('update:isVisible', false)"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
* {
  font-family: 'Quicksand', sans-serif;
}
</style>
