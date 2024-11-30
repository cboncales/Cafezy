<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout :is-with-app-bar-nav-icon="false">
    <template #content>
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            class="bg-surface-light h-screen"
            v-if="!mobile"
          ></v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
h3 {
  font-family: 'Quicksand', sans-serif;
  /* font-weight: 500; */
}
</style>
