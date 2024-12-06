<script setup>
import { ref, onMounted } from 'vue'
import SettingsModal from './SettingsModal.vue'
import {
  supabase,
  formActionDefault,
  getUserInformation,
} from '@/utils/supabase'
import { getAvatarText } from '@/utils/helpers'
import { useRouter } from 'vue-router'

// Define state for modal visibility
const isSettingsModalVisible = ref(false)

// Define user data state
const userData = ref({
  initials: '',
  email: '',
  fullname: '',
})

const formAction = ref({ ...formActionDefault })

const router = useRouter()

// Logout functionality
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
  router.replace('/')
}

// Getting user information functionality
const getUser = async () => {
  const userMetadata = await getUserInformation()
  userData.value.email = userMetadata.email
  userData.value.fullname = userMetadata.firstname + ' ' + userMetadata.lastname
  userData.value.initials = getAvatarText(userData.value.fullname)
}

// Load functions during component rendering
onMounted(() => {
  getUser()
})

// Open modal for account settings
const openSettingsModal = () => {
  isSettingsModalVisible.value = true
}
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
        <v-btn
          prepend-icon="mdi-wrench"
          variant="plain"
          @click="openSettingsModal"
        >
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

  <!-- Import and control modal visibility -->
  <SettingsModal
    v-model:isVisible="isSettingsModalVisible"
    :userData="userData"
  />
</template>
