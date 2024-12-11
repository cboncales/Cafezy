<script setup>
import { isAuthenticated, getUserInformation } from '@/utils/supabase'
import ProfileHeader from './ProfileHeader.vue'
import AuthModal from '../auth/AuthModal.vue'

import { onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps(['isWithAppBarNavIcon'])

const emit = defineEmits(['isDrawerVisible'])
const isDrawerOpen = ref(false)

const isLoginModalVisible = ref(false)
const isRegisterMode = ref(false)
const isAdmin = ref(false)
// Load Variables
const isLoggedIn = ref(false)

// Get user info and check if admin
const getUser = async () => {
  const userMetadata = await getUserInformation()
  isAdmin.value = userMetadata?.is_admin || false
}

// Utilize predefined Vue functions
const { mobile } = useDisplay()

// Get Authentication status from supabase
const getLoggedStatus = async () => {
  isLoggedIn.value = await isAuthenticated()
  if (isLoggedIn.value) {
    await getUser() // Fetch user data only if logged in
  } else {
    isAdmin.value = false // Reset admin status on logout
  }
}

// Load Functions during component rendering
onMounted(() => {
  getLoggedStatus()
})

// Toggle login to register modal
const toggleFormMode = () => {
  isRegisterMode.value = !isRegisterMode.value
}
</script>

<template>
  <v-responsive>
    <v-app>
      <!-- Navigation Header -->
      <v-app-bar class="pa-1" border>
        <v-container>
          <v-row
            align="center"
            :justify="mobile ? 'space-between' : 'space-between'"
          >
            <!-- Navigation Icon -->
            <v-col cols="auto" v-if="isAdmin || !mobile">
              <v-app-bar-nav-icon
                v-if="props.isWithAppBarNavIcon && isAdmin"
                icon="mdi-menu"
                @click="emit('isDrawerVisible')"
              ></v-app-bar-nav-icon>
            </v-col>

            <!-- Logo -->
            <v-col
              cols="auto"
              class="d-flex justify-center align-center"
              style="flex-shrink: 0"
            >
              <v-img
                class="ms-2"
                src="/images/cafezy-logo3.png"
                alt="Cafezy Logo"
                width="45"
                height="45"
                contain
              ></v-img>
              <span class="text-logo ms-2"
                >Café<span class="text-logos">zy</span></span
              >
            </v-col>

            <!-- Navigation Links (Hidden on Mobile) -->
            <v-col cols="auto" class="d-flex align-center" v-if="!mobile">
              <v-btn class="nav-btn ml-2" to="/login">Home</v-btn>
              <v-btn class="nav-btn mx-2" to="/food">Food</v-btn>
              <v-btn class="nav-btn mx-2" to="/contact">Contact Us</v-btn>
              <v-btn
                v-if="isLoggedIn && !isAdmin"
                class="nav-btn mx-2"
                to="/order"
              >
                Orders
              </v-btn>
            </v-col>

            <!-- Profile and Social Links -->
            <v-col cols="auto" class="d-flex align-center" v-if="!mobile">
              <ProfileHeader v-if="isLoggedIn && !mobile"></ProfileHeader>

              <!-- Login Button -->
              <v-btn
                v-if="!isLoggedIn && !mobile"
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

              <!-- Social Links -->
              <v-btn
                v-if="!mobile"
                icon
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener"
                class="social-links ms-2"
              >
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
              <v-btn
                v-if="!mobile"
                icon
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener"
                class="social-links mx-2"
              >
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
              <v-btn
                v-if="!mobile"
                icon
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener"
                class="social-links mx-2"
              >
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
            </v-col>

            <!-- Mobile Menu Icon -->
            <v-col cols="auto" v-if="mobile">
              <v-btn
                icon
                color="orange-darken-2"
                @click="isDrawerOpen = !isDrawerOpen"
              >
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-app-bar>

      <!-- Mobile Navigation Drawer -->
      <v-navigation-drawer
        v-model="isDrawerOpen"
        location="right"
        app
        temporary
        class="mobile-drawer"
      >
        <!-- Mobile Navigation Links -->
        <v-list>
          <v-list-item class="my-3 text-center" v-if="isLoggedIn">
            <ProfileHeader v-if="isLoggedIn && mobile"></ProfileHeader>
          </v-list-item>
          <v-list-item class="mt-2">
            <v-btn block class="nav-btn" to="/login">Home</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn block class="nav-btn" to="/food">Food</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn block class="nav-btn" to="/contact">Contact Us</v-btn>
          </v-list-item>
          <v-list-item v-if="isLoggedIn && !isAdmin">
            <v-btn block class="nav-btn" to="/order">Orders</v-btn>
          </v-list-item>
          <v-list-item v-if="!isLoggedIn">
            <v-btn
              block
              class="login-btn"
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
          </v-list-item>
        </v-list>

        <!-- Mobile Social Links -->
        <v-container class="mt-auto">
          <v-row justify="center" align="center">
            <v-btn
              icon
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener"
              class="social-links mx-2"
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
          </v-row>
        </v-container>
      </v-navigation-drawer>

      <slot name="navigation"></slot>

      <!-- Main Content -->
      <v-main>
        <slot name="content"></slot>
      </v-main>

      <!-- Footer -->
      <v-footer
        class="font-weight-bold footer-background"
        :class="mobile ? 'text-caption' : ''"
        border
        app
      >
        <div
          class="py-10"
          :class="mobile ? 'w-100 text-center' : 'w-100 text-center'"
        >
          Copyright © 2024 - Cafézy | All Rights Reserved
        </div>
      </v-footer>

      <!-- Modals -->
      <AuthModal
        v-model:isVisible="isLoginModalVisible"
        :is-register-mode="isRegisterMode"
        @toggleFormMode="toggleFormMode"
      />
    </v-app>
  </v-responsive>
</template>

<style scoped>
/* General Styles */
* {
  font-family: 'Quicksand', sans-serif;
}

/* Navigation Header Styles */
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

.line {
  font-size: 20px;
  font-weight: 800;
  color: rgb(82, 80, 80);
}

/* Footer Styles */
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

.v-footer {
  position: relative !important;
  max-height: max-content;
}

/* Responsive Styles */
@media (max-width: 600px) {
  .text-logo {
    font-size: 24px;
  }
  .nav-btn {
    font-size: 12px;
  }
}
@media (max-width: 960px) {
  .nav-btn {
    font-size: 14px;
  }
}
</style>
