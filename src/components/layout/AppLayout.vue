<script setup>
import { isAuthenticated, getUserInformation } from '@/utils/supabase'
import ProfileHeader from './ProfileHeader.vue'
import AuthModal from '../auth/AuthModal.vue'

import { onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps(['isWithAppBarNavIcon'])

const emit = defineEmits(['isDrawerVisible'])

const isLoginModalVisible = ref(false)
const isRegisterMode = ref(false)
const isAdmin = ref(false)
//Load Variables
const isLoggedIn = ref(false)

// Get user info and check if admin
const getUser = async () => {
  const userMetadata = await getUserInformation()
  isAdmin.value = userMetadata?.is_admin || false
}

//utilize predefined vue functions
const { mobile } = useDisplay()

// const theme = ref(localStorage.getItem('theme') ?? 'light')

//Toggle Theme
// function onToggleTheme() {
//   theme.value = theme.value === 'light' ? 'dark' : 'light'
//   localStorage.setItem('theme', theme.value)
// }

//Get Authentication status from supabase
const getLoggedStatus = async () => {
  isLoggedIn.value = await isAuthenticated()
  if (isLoggedIn.value) {
    await getUser() // Fetch user data only if logged in
  } else {
    isAdmin.value = false // Reset admin status on logout
  }
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
      <v-app-bar class="pa-1" border>
        <v-app-bar-nav-icon
          v-if="props.isWithAppBarNavIcon && isAdmin"
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

        <v-btn class="nav-btn ml-16" to="/login">Home</v-btn>
        <v-btn class="nav-btn mx-2" to="/food">Food</v-btn>
        <v-btn class="nav-btn mx-2" to="/contact">Contact Us</v-btn>
        <v-btn v-if="isLoggedIn && !isAdmin" class="nav-btn mx-2" to="/order">
          Orders
        </v-btn>

        <v-spacer></v-spacer>

        <ProfileHeader v-if="isLoggedIn"></ProfileHeader>

        <v-btn
          v-if="!isLoggedIn && $route.name !== 'dashboard'"
          class="login-btn mx-2"
          prepend-icon="mdi mdi-login"
          @click="
            () => {
              isLoginModalVisible = true
              isRegisterMode = false
            }
          "
        >
          Log in
        </v-btn>

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

      <!-- Modals -->
      <AuthModal
        v-model:isVisible="isLoginModalVisible"
        :is-register-mode="isRegisterMode"
        @toggleFormMode="toggleFormMode"
      />

      <slot name="navigation"></slot>

      <v-main>
        <slot name="content"></slot>
      </v-main>

      <v-footer
        class="font-weight-bold footer-background"
        :class="mobile ? 'text-caption' : ''"
        border
      >
        <div
          class="py-10"
          :class="mobile ? 'w-100 text-center' : 'w-100 text-center'"
        >
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

/* navigation style */
.text-logo {
  font-size: 35px;
  font-weight: 900;
  color: rgb(82, 80, 80);
}

.text-logos {
  color: rgb(255, 145, 0);
}

.nav-btn {
  font-size: 16px;
  font-weight: 700;
  color: rgb(82, 80, 80);
}

.login-btn {
  font-size: 16px;
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
::v-deep(.cancel-btn:hover) {
  background-color: rgba(255, 145, 0, 0.1) !important;
  color: rgb(255, 145, 0) !important;
}

.line {
  font-size: 20px;
  font-weight: 800;
  color: rgb(82, 80, 80);
}
/* navigation style */

/* footer */
.footer-background {
  position: relative;
  background-image: url('/images/footer-bg.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 0;
  margin: 0;
}

.footer-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.795);
  z-index: 1;
}

.footer-background div {
  position: relative;
  z-index: 2;
}

/* Override the .v-footer--border styles */
.v-footer--border {
  border-width: 0 !important;
  box-shadow: none !important;
}
/* footer */
</style>
