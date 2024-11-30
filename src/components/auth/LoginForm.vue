<script setup>
import AlertNotification from '@/components/common/AlertNotification.vue'
import { formActionDefault, supabase } from '@/utils/supabase'
import { requiredValidator, emailValidator } from '@/utils/validators'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Utilize pre-defined vue functions
const router = useRouter()

// Load Variables
const formDataDefault = {
  email: '',
  password: '',
}

const formData = ref({
  ...formDataDefault,
})

const formAction = ref({
  ...formActionDefault,
})

const isPasswordVisible = ref(false)
const refVForm = ref()

const onSubmit = async () => {
  // Reset Form Action utils
  formAction.value = { ...formActionDefault }
  // Turn on processing
  formAction.value.formProcess = true

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.value.email,
    password: formData.value.password,
  })

  if (error) {
    // Add Error Message and Status Code
    formAction.value.formErrorMessage = error.messsage
    formAction.value.formStatus = error.status
  } else if (data) {
    // Add Success Message
    formAction.value.formSuccessMessage = 'Successfully Logged Account.'
    // Redirect Account to Dashboard
    router.replace('/dashboard')
  }

  // Reset Form
  refVForm.value?.reset()
  // Turn off processing
  formAction.value.formProcess = false
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  ></AlertNotification>

  <v-form class="mt-5" ref="refVForm" @submit.prevent="onFormSubmit">
    <v-text-field
      v-model="formData.email"
      label="Email"
      prepend-inner-icon="mdi-email-outline"
      :rules="[requiredValidator, emailValidator]"
      autocomplete="email"
    >
    </v-text-field>

    <v-text-field
      v-model="formData.password"
      prepend-inner-icon="mdi-lock-outline"
      label="Password"
      :type="isPasswordVisible ? 'text' : 'password'"
      :append-inner-icon="
        isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
      "
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
      :rules="[requiredValidator]"
      autocomplete="current-password"
    ></v-text-field>

    <v-btn
      class="mt-2 bg-orange-darken-2 rounded-xl"
      type="submit"
      block
      prepend-icon="mdi-silverware-fork-knife"
      >Log in</v-btn
    >
  </v-form>
</template>
