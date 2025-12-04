<script setup>
const props = defineProps({
  formSuccessMessage: {
    type: String,
    default: '',
  },
  formErrorMessage: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <v-alert
    v-if="props.formSuccessMessage"
    :text="props.formSuccessMessage"
    title="Success!"
    type="success"
    variant="tonal"
    density="compact"
    border="start"
    closable
  />

  <v-alert
    v-if="props.formErrorMessage"
    :text="props.formErrorMessage"
    title="Ooops!"
    type="error"
    variant="tonal"
    density="compact"
    border="start"
    closable
  />
</template>
