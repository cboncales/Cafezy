<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3" color="grey-darken-1">
        <v-spacer></v-spacer>

        <v-btn
          :prepend-icon="
            theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
          "
          text="Toggle Theme"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <v-row class="d-flex justify-center">
            <v-col cols="12" md="6">
              <v-card
                class="mx-auto mt-16"
                prepend-icon="mdi-dumbbell"
                subtitle="The #1 Fitness App"
                color="orange-darken-2"
                elevation="24"
              >
                <template v-slot:title>
                  <span class="font-weight-black">Register to FitQuest</span>
                </template>

                <v-card-text class="bg-surface-light pt-4">
                  <v-form fast-fail @submit.prevent>
                    <v-text-field label="FirstName"></v-text-field>

                    <v-text-field label="LastName"></v-text-field>

                    <v-text-field
                      label="Email"
                      variant="outlined"
                    ></v-text-field>

                    <v-text-field
                      label="Password"
                      type="password"
                      variant="outlined"
                    ></v-text-field>

                    <v-text-field
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                    ></v-text-field>

                    <v-btn class="mt-2" type="submit" block>Register</v-btn>
                  </v-form>

                  <v-divider class="my-5"></v-divider>

                  <h5 class="text-center">
                    Already have an account?
                    <router-link class="text-primary" to="login"
                      >Click here to Login</router-link
                    >
                  </h5>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <v-footer border app color="grey-darken-1"
        >2024 - Copyright FitQuest</v-footer
      >
    </v-app>
  </v-responsive>
</template>
