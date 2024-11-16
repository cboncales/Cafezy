<script setup>
const props = defineProps(['formSuccessMessage', 'formErrorMessage'])
</script>

<template>
  <v-alert
    v-if="props.formSuccessMessage"
    :alert="props.formSuccessMessage"
    title="Success!"
    type="success"
    variant="tonal"
    density="compact"
    border="start"
    closable
  ></v-alert>
  <v-alert
    v-if="props.formErrorMessage"
    :alert="props.formErrorMessage"
    title="Ooops!"
    type="error"
    variant="tonal"
    density="compact"
    border="start"
    closable
  ></v-alert>
</template>
