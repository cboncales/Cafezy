<template>
  <v-form fast-fail @submit.prevent>
    <v-text-field label="Email" variant="outlined"></v-text-field>

    <v-text-field
      label="Password"
      type="password"
      variant="outlined"
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
