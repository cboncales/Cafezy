<script setup>
import { isAuthenticated } from '@/utils/supabase'
import ProfileHeader from './ProfileHeader.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'

import { onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps(['isWithAppBarNavIcon'])

const emit = defineEmits(['isDrawerVisible'])

const isLoginModalVisible = ref(false)
const isRegisterMode = ref(false)

//utilize predefined vue functions
const { mobile } = useDisplay()

// const theme = ref(localStorage.getItem('theme') ?? 'light')

//Load Variables
const isLoggedIn = ref(false)

//Toggle Theme
// function onToggleTheme() {
//   theme.value = theme.value === 'light' ? 'dark' : 'light'
//   localStorage.setItem('theme', theme.value)
// }

//Get Authentication status from supabase
const getLoggedStatus = async () => {
  isLoggedIn.value = await isAuthenticated()
}

//Load Functions during component rendering
onMounted(() => {
  getLoggedStatus()
})

//Toggle login to register modal
const toggleFormMode = () => {
  isRegisterMode.value = !isRegisterMode.value
}
</script>

<template>
  <v-responsive>
    <v-app>
      <v-app-bar class="pa-3" border>
        <v-app-bar-nav-icon
          v-if="props.isWithAppBarNavIcon"
          icon="mdi-menu"
          @click="emit('isDrawerVisible')"
        >
        </v-app-bar-nav-icon>

        <v-img
          class="ms-10"
          src="/images/cafezy-logo3.png"
          alt="Cafezy Logo"
          max-width="45"
          contain
        ></v-img>
        <span class="text-logo me-16"
          >Café<span class="text-logos">zy</span></span
        >

        <v-btn class="nav-btn ml-16" to="">Home</v-btn>
        <v-btn class="nav-btn mx-2" to="">Food</v-btn>
        <v-btn class="nav-btn mx-2" to="">Contact Us</v-btn>

        <v-spacer></v-spacer>

        <ProfileHeader v-if="isLoggedIn"></ProfileHeader>

        <v-btn
          class="login-btn mx-2"
          prepend-icon="mdi mdi-login"
          @click="isLoginModalVisible = true"
        >
          Log in
        </v-btn>

        <v-dialog v-model="isLoginModalVisible" persistent max-width="400">
          <v-card>
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
                  class="text-orange-darken-2 font-weight-black"
                  @click="toggleFormMode"
                  style="cursor: pointer"
                >
                  {{
                    isRegisterMode
                      ? 'Click here to Log in'
                      : 'Click here to Register'
                  }}
                </span>
              </h5>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" text @click="isLoginModalVisible = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <span class="line">|</span>
        <div class="me-10">
          <v-btn
            icon
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener"
            class="social-links ms-5 me-2"
          >
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn
            icon
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener"
            class="social-links mx-2"
          >
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
          <v-btn
            icon
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener"
            class="social-links mx-2"
          >
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
        </div>

        <!-- <v-btn
          class="mx-3"
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="elevated"
          color="orange-darken-2"
          slim
          @click="onToggleTheme"
        ></v-btn> -->
      </v-app-bar>

      <slot name="navigation"></slot>

      <v-main>
        <slot name="content"></slot>
      </v-main>

      <v-footer
        class="font-weight-bold"
        :class="mobile ? 'text-caption' : ''"
        elevation="24"
        border
        app
      >
        <div :class="mobile ? 'w-100 text-center' : ''">
          Copyright © 2024 - Cafézy | All Rights Reserved
        </div>
      </v-footer>
    </v-app>
  </v-responsive>
</template>

<style scoped>
* {
  font-family: 'Quicksand', sans-serif;
}

.text-logo {
  font-size: 35px;
  font-weight: 900;
  color: rgb(82, 80, 80);
}

.text-logos {
  color: rgb(255, 145, 0);
}

.nav-btn {
  font-size: 18px;
  font-weight: 700;
  color: rgb(82, 80, 80);
}

.login-btn {
  font-size: 18px;
  font-weight: 700;
  color: rgb(82, 80, 80);
}

::v-deep(.nav-btn:hover) {
  background-color: rgba(255, 145, 0, 0.1) !important;
  color: rgb(255, 145, 0) !important;
}

::v-deep(.login-btn:hover) {
  background-color: rgba(255, 145, 0, 0.1) !important;
  color: rgb(255, 145, 0) !important;
}

::v-deep(.social-links:hover) {
  background-color: rgba(255, 145, 0, 0.1) !important;
  color: rgb(255, 145, 0) !important;
}

.line {
  font-size: 20px;
  font-weight: 800;
  color: rgb(82, 80, 80);
}
</style>
