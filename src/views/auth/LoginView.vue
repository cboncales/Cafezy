<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="6"
          ><v-card class="mx-auto mt-16" color="orange-darken-2" elevation="24">
            <v-card-title class="text-center">
              <v-img
                class="mx-auto"
                src="/public/images/logo-favicon.png"
                :width="mobile ? '75%' : '25%'"
              ></v-img>
              <h3 class="font-weight-black">Welcome to FitQuest</h3>
              <p class="font-weight-bold">Login Form</p>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-4">
              <v-divider class="my-5"></v-divider>
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

              <v-divider class="my-5"></v-divider>

              <h5 class="text-center">
                Don't have account?
                <router-link class="text-primary" to="/register"
                  >Click here to Register</router-link
                >
              </h5>
            </v-card-text>
          </v-card></v-col
        >
      </v-row>
    </template>
  </AppLayout>
</template>
