<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref } from 'vue'

// State for drawer visibility
const isDrawerVisible = ref(true)
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <!-- Side Navigation -->
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible"></SideNavigation>
    </template>

    <!-- Main Content -->
    <template #content>
      <!-- Responsive Carousel Section -->
      <v-carousel class="carousel-container" hide-delimiters show-arrows>
        <v-carousel-item
          v-for="(src, index) in [
            '/images/background.png',
            '/images/background-2.jpg',
            '/images/background-3.jpg',
          ]"
          :key="index"
          class="carousel-item"
        >
          <img :src="src" class="fluid-image" alt="Slide Image" />
        </v-carousel-item>
      </v-carousel>

      <!-- Ordering Section -->
      <div class="ordering-section">
        <v-container>
          <v-row justify="center" align="center">
            <!-- Card 1 -->
            <v-col cols="12" md="4">
              <v-card class="ordering-card" outlined>
                <v-card-title>
                  <h2>Pizza</h2>
                </v-card-title>
                <v-card-text>
                  Enjoy freshly baked pizza with delicious toppings.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" block>Order Now</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <!-- Card 2 -->
            <v-col cols="12" md="4">
              <v-card class="ordering-card" outlined>
                <v-card-title>
                  <h2>Burgers</h2>
                </v-card-title>
                <v-card-text>
                  Juicy and flavorful burgers made just for you.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" block>Order Now</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <!-- Card 3 -->
            <v-col cols="12" md="4">
              <v-card class="ordering-card" outlined>
                <v-card-title>
                  <h2>Drinks</h2>
                </v-card-title>
                <v-card-text>
                  Refresh yourself with a variety of cool drinks.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" block>Order Now</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-container>
          <v-row justify="center" align="center">
            <!-- Card 1 -->
            <v-col cols="12" md="4">
              <v-card class="ordering-card" outlined>
                <v-card-title>
                  <h2>Pizza</h2>
                </v-card-title>
                <v-card-text>
                  Enjoy freshly baked pizza with delicious toppings.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" block>Order Now</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <!-- Card 2 -->
            <v-col cols="12" md="4">
              <v-card class="ordering-card" outlined>
                <v-card-title>
                  <h2>Burgers</h2>
                </v-card-title>
                <v-card-text>
                  Juicy and flavorful burgers made just for you.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" block>Order Now</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <!-- Card 3 -->
            <v-col cols="12" md="4">
              <v-card class="ordering-card" outlined>
                <v-card-title>
                  <h2>Drinks</h2>
                </v-card-title>
                <v-card-text>
                  Refresh yourself with a variety of cool drinks.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" block>Order Now</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </template>
  </AppLayout>
</template>

<style scoped>
/* Carousel Container */
.carousel-container {
  width: 100%;
  height: 50vh; /* Set to 50% of the viewport height */
}

.carousel-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

/* Fluid Images */
.fluid-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image covers the container proportionally */
  object-position: center;
}

/* Ordering Section */
.ordering-section {
  padding: 20px;
  background-color: #f5f5f5;
}

.ordering-card {
  margin-bottom: 20px;
}
</style>
