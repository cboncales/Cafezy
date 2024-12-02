<script setup>
import {
  supabase,
  formActionDefault,
  getUserInformation,
} from '@/utils/supabase'
import { getAvatarText } from '@/utils/helpers'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

// Utilize pre-defined vue functions
const router = useRouter()

// Load Variables
const userData = ref({
  initials: '',
  email: '',
  fullname: '',
})

const formAction = ref({
  ...formActionDefault,
})

// Logout Functionality
const onLogout = async () => {
  formAction.value = { ...formActionDefault }

  formAction.value.formProcess = true

  // Get supabase logout functionality
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error during logout:', error)
    return
  }
  formAction.value.formProcess = false
  // Redirect to homepage
  router.replace('/')
}

// Getting User Information Functionality
const getUser = async () => {
  // Retrieve User Information
  const userMetadata = await getUserInformation()

  // Assign the retrieved informations
  userData.value.email = userMetadata.email
  userData.value.fullname = userMetadata.firstname + ' ' + userMetadata.lastname
  userData.value.initials = getAvatarText(userData.value.fullname)
}

// Load Functions during component rendering
onMounted(() => {
  getUser()
})
</script>

<template>
  <v-menu min-width="200px" rounded>
    <template #activator="{ props }">
      <v-btn class="mx-5" icon v-bind="props">
        <v-avatar color="deep-orange-lighten-1" size="large">
          <span class="text-h5">{{ userData.initials }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card class="mt-1">
      <v-card-text>
        <v-list>
          <v-list-item :subtitle="userData.email" :title="userData.fullname">
            <template #prepend>
              <v-avatar color="deep-orange-lighten-1" size="large">
                <span class="text-h5">{{ userData.initials }}</span>
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>
        <v-divider class="my-3"></v-divider>
        <v-btn prepend-icon="mdi-wrench" variant="plain">
          Account Settings
        </v-btn>
        <v-divider class="my-3"></v-divider>
        <v-btn
          prepend-icon="mdi-logout"
          variant="plain"
          @click="onLogout"
          :loading="formAction.formProcess"
          :disabled="formAction.formProcess"
        >
          Logout
        </v-btn>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
