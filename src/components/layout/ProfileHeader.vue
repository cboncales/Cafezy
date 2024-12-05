<script setup>
// Imports
import {
  supabase,
  formActionDefault,
  getUserInformation,
} from '@/utils/supabase'
import { getAvatarText } from '@/utils/helpers'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

// Router
const router = useRouter()

// Reactive Variables
const userData = ref({
  initials: '',
  email: '',
  fullname: '',
})
const formAction = ref({ ...formActionDefault })

// Functions
const getUser = async () => {
  const userMetadata = await getUserInformation()
  userData.value.email = userMetadata.email
  userData.value.fullname = `${userMetadata.firstname} ${userMetadata.lastname}`
  userData.value.initials = getAvatarText(userData.value.fullname)
}

const onLogout = async () => {
  formAction.value.formProcess = true
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error during logout:', error)
    return
  }
  formAction.value.formProcess = false
  router.replace('/')
}

// Lifecycle Hook
onMounted(() => {
  getUser()
})
</script>

<template>
  <v-menu min-width="350px" rounded>
    <template #activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar color="deep-orange-lighten-1" size="large">
          <span class="text-h5">{{ userData.initials }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card class="mt-2" elevation="3">
      <v-card-text>
        <v-row align="center">
          <!-- Profile Picture -->
          <v-col cols="4" class="text-center">
            <v-avatar color="deep-orange-lighten-1" size="x-large">
              <span class="text-h5">{{ userData.initials }}</span>
            </v-avatar>
          </v-col>
          <!-- Profile Info -->
          <v-col cols="8">
            <v-btn
              prepend-icon="mdi-pencil"
              variant="outlined"
              color="primary"
              class="mb-3"
              block
            >
              Edit Profile
            </v-btn>
            <div class="profile-details">
              <h3 class="mb-1">{{ userData.fullname }}</h3>
              <p class="text-secondary">{{ userData.email }}</p>
            </div>
          </v-col>
        </v-row>
        <v-divider class="my-3"></v-divider>
        <!-- Change Password Button -->
        <v-btn prepend-icon="mdi-lock" variant="outlined" class="mb-3" block>
          Change Password
        </v-btn>
        <v-divider class="my-3"></v-divider>
        <!-- Logout Button -->
        <v-btn
          prepend-icon="mdi-logout"
          color="error"
          variant="outlined"
          @click="onLogout"
          :loading="formAction.formProcess"
          :disabled="formAction.formProcess"
          block
        >
          Logout
        </v-btn>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<style scoped>
.profile-details h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
}

.profile-details p {
  margin: 0;
  font-size: 0.9rem;
  color: gray;
}

.v-btn {
  text-transform: none;
}
</style>
