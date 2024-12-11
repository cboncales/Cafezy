<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref, onMounted } from 'vue'
import { getUserInformation } from '@/utils/supabase'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

// State for drawer visibility
const isDrawerVisible = ref(false)

const isAdmin = ref(false)

const getUser = async () => {
  try {
    const userMetadata = await getUserInformation()

    // Check if userMetadata exists before accessing properties
    if (userMetadata) {
      isAdmin.value = userMetadata.is_admin || false
    } else {
      console.warn('User metadata is null or undefined.')
      isAdmin.value = false
    }
  } catch (error) {
    console.error('Failed to fetch user information:', error)
    isAdmin.value = false
  }
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <!-- Side Navigation -->
    <template #navigation>
      <SideNavigation
        v-if="isAdmin"
        :is-drawer-visible="isDrawerVisible"
      ></SideNavigation>
    </template>

    <template #content>
      <v-container fluid class="contact-container">
        <v-row align="center" justify="center" class="contact-content">
          <v-col cols="12" md="8" lg="6" class="z-index-2">
            <v-card class="contact-card text-center">
              <v-card-title class="text-h3 font-weight-bold font-fam">
                Get in Touch
              </v-card-title>
              <v-card-text>
                <p class="my-3">
                  Connect with us on our social media platforms:
                </p>
                <v-btn
                  icon
                  href="https://www.facebook.com"
                  target="_blank"
                  class="social-btn"
                  color="blue darken-4"
                >
                  <v-icon size="36">mdi-facebook</v-icon>
                </v-btn>
                <v-btn
                  icon
                  href="mailto:your-email@gmail.com"
                  target="_blank"
                  class="social-btn"
                  color="red darken-1"
                >
                  <v-icon size="36">mdi-gmail</v-icon>
                </v-btn>
                <v-btn
                  icon
                  href="https://www.twitter.com"
                  target="_blank"
                  class="social-btn"
                  color="blue darken-1"
                >
                  <v-icon size="36">mdi-twitter</v-icon>
                </v-btn>
                <v-btn
                  icon
                  href="https://www.instagram.com"
                  target="_blank"
                  class="social-btn"
                  color="pink darken-3"
                >
                  <v-icon size="36">mdi-instagram</v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.font-fam {
  font-family: 'Quicksand', sans-serif;
  color: rgb(82, 80, 80);
}

.contact-container {
  position: relative;
  background-image: url('/images/contact-bg4.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
}

.contact-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1;
}

.contact-content {
  position: relative;
  z-index: 2;
  padding: 2rem;
}

.contact-card {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
}

.contact-card p {
  font-size: 17px;
}

.social-btn {
  margin: 0 10px;
  transition: transform 0.2s;
}

.social-btn:hover {
  transform: scale(1.2);
}
</style>
