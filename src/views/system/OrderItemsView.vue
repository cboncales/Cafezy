<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #content>
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" md="6" lg="4">
            <v-card>
              <v-img
                src="/images/food-image.jpg"
                height="200px"
                contain
              ></v-img>
              <v-card-title>
                <span class="headline">Order Food</span>
              </v-card-title>
              <v-card-subtitle>
                Delicious food delivered to your door.
              </v-card-subtitle>
              <v-card-actions>
                <v-btn color="primary">Order Now</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
/* Add any styling you'd like here */
</style>
