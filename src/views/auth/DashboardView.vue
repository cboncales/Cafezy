<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref, onMounted } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'

// Use the authUser store
const authUser = useAuthUserStore()

// State for drawer visibility
const isDrawerVisible = ref(false)

// Track admin status
const isAdmin = ref(false)

// Retrieve admin status from user data
const getUserStatus = async () => {
  const loggedIn = await authUser.isAuthenticated()
  if (loggedIn) {
    await authUser.getUserInformation()
    isAdmin.value = authUser.userData?.is_admin || false
  } else {
    isAdmin.value = false
    authUser.$reset()
  }
}

// Food Categories
const foodCategories = [
  'Rice',
  'Filipino Dishes',
  'Street Foods',
  'Pulutan',
  'Salads',
  'Drinks',
  'Desserts',
]

// Carousel slides with image paths
const slides = [
  '/images/food1.png',
  '/images/food2.png',
  '/images/food3.png',
  '/images/food4.png',
  '/images/food5.png',
]

onMounted(() => {
  getUserStatus()
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

    <!-- Main Content -->
    <template #content>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-img
              class="rounded-xl"
              src="/images/dashboard-bg.png"
              height="400"
              width="800"
              cover
            ></v-img>
          </v-col>
          <v-col>
            <v-carousel height="400" :show-arrows="false" cycle hide-delimiters>
              <v-carousel-item v-for="(slide, i) in slides" :key="i">
                <v-img
                  :src="slide"
                  class="rounded-xl"
                  alt="Food Slide"
                  height="400"
                  cover
                ></v-img>
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </v-container>

      <!-- Ordering Section -->
      <v-container>
        <div class="head-container my-16">
          <h1 class="head-text text-center my-5">Popular</h1>
          <v-item-group class="text-center" selected-class="bg-orange" multiple>
            <v-item
              v-for="(category, index) in foodCategories"
              :key="index"
              v-slot="{ selectedClass, toggle }"
            >
              <v-chip class="mx-2" :class="selectedClass" @click="toggle">
                {{ category }}
              </v-chip>
            </v-item>
          </v-item-group>
        </div>

        <v-row justify="center" align="center">
          <!-- Card 1 -->
          <v-col cols="12" md="4">
            <v-card class="ordering-card rounded-xl" outlined>
              <v-img
                class="card-img rounded-xl hover-image"
                src="/images/pork-adobo.jpg"
                alt="chicken adebayor"
                height="300"
                cover
              >
                <div class="overlay">
                  <v-card-actions class="hover-actions">
                    <v-btn
                      class="order-btn rounded-pill"
                      color="white"
                      block
                      prepend-icon="mdi mdi-cart"
                    >
                      Order Now
                    </v-btn>
                  </v-card-actions>
                </div>
              </v-img>
              <v-card-title>
                <h2 class="text-center">Pork Adebayor</h2>
                <h3 class="text-center">₱40/per serving</h3>
              </v-card-title>
              <v-card-text class="text-center">
                A savory and slightly tangy dish made with pork simmered in a
                mixture of soy sauce, vinegar, garlic, bay leaves, and black
                peppercorns. It's often served with rice and is one of the most
                popular Filipino comfort foods.
              </v-card-text>
            </v-card>
          </v-col>
          <!-- Card 2 -->
          <v-col cols="12" md="4">
            <v-card class="ordering-card rounded-xl" outlined>
              <v-img
                class="card-img rounded-xl hover-image"
                src="/images/halo-halo2.jpg"
                alt="chicken adebayor"
                height="300"
                cover
              >
                <div class="overlay">
                  <v-card-actions class="hover-actions">
                    <v-btn
                      class="order-btn rounded-pill"
                      color="white"
                      block
                      prepend-icon="mdi mdi-cart"
                    >
                      Order Now
                    </v-btn>
                  </v-card-actions>
                </div>
              </v-img>
              <v-card-title>
                <h2 class="text-center">Holo Lulo</h2>
                <h3 class="text-center">₱45/per serving</h3>
              </v-card-title>
              <v-card-text class="text-center">
                A popular Filipino dessert made with crushed ice, sweetened
                fruits, beans, jellies, and sometimes ice cream, all topped with
                leche flan and purple yam (ube). It’s a refreshing treat,
                especially during hot weather.
              </v-card-text>
            </v-card>
          </v-col>
          <!-- Card 3 -->
          <v-col cols="12" md="4">
            <v-card class="ordering-card rounded-xl" outlined>
              <v-img
                class="card-img rounded-xl hover-image"
                src="/images/chicken-curry.jpg"
                alt="stephen curry"
                height="300"
                cover
              >
                <div class="overlay">
                  <v-card-actions class="hover-actions">
                    <v-btn
                      class="order-btn rounded-pill"
                      color="white"
                      block
                      prepend-icon="mdi mdi-cart"
                    >
                      Order Now
                    </v-btn>
                  </v-card-actions>
                </div>
              </v-img>
              <v-card-title>
                <h2 class="text-center">Stephen Curry</h2>
                <h3 class="text-center">₱35/per serving</h3>
              </v-card-title>
              <v-card-text class="text-center">
                A Filipino-style chicken curry made with chicken pieces cooked
                in a coconut milk-based sauce, spiced with curry powder, and
                mixed with vegetables like potatoes, carrots, and bell peppers.
                It's a comforting and flavorful dish.
              </v-card-text>
            </v-card>
          </v-col>
          <!-- Card 4 -->
          <v-col cols="12" md="4">
            <v-card class="ordering-card rounded-xl" outlined>
              <v-img
                class="card-img rounded-xl hover-image"
                src="/images/paksiw.jpg"
                alt="pakistan"
                height="300"
                cover
              >
                <div class="overlay">
                  <v-card-actions class="hover-actions">
                    <v-btn
                      class="order-btn rounded-pill"
                      color="white"
                      block
                      prepend-icon="mdi mdi-cart"
                    >
                      Order Now
                    </v-btn>
                  </v-card-actions>
                </div>
              </v-img>
              <v-card-title>
                <h2 class="text-center">Pakistan</h2>
                <h3 class="text-center">₱40/per serving</h3>
              </v-card-title>
              <v-card-text class="text-center">
                A Filipino dish typically made with pork or fish, cooked in
                vinegar, soy sauce, garlic, and spices. It's known for its tangy
                and savory flavor, with a distinct vinegar base that is cooked
                until tender.
              </v-card-text>
            </v-card>
          </v-col>
          <!-- Card 5 -->
          <v-col cols="12" md="4">
            <v-card class="ordering-card rounded-xl" outlined>
              <v-img
                class="card-img rounded-xl hover-image"
                src="/images/mechado.jpg"
                alt="Makarena"
                height="300"
                cover
              >
                <div class="overlay">
                  <v-card-actions class="hover-actions">
                    <v-btn
                      class="order-btn rounded-pill"
                      color="white"
                      block
                      prepend-icon="mdi mdi-cart"
                    >
                      Order Now
                    </v-btn>
                  </v-card-actions>
                </div>
              </v-img>
              <v-card-title>
                <h2 class="text-center">Makarena</h2>
                <h3 class="text-center">₱40/per serving</h3>
              </v-card-title>
              <v-card-text class="text-center">
                A Filipino beef stew made with beef chunks, marinated in soy
                sauce, garlic, and lemon, then slow-cooked with tomatoes,
                onions, and potatoes. It has a savory and slightly sweet sauce,
                often enjoyed with rice.
              </v-card-text>
            </v-card>
          </v-col>
          <!-- Card 6 -->
          <v-col cols="12" md="4">
            <v-card class="ordering-card rounded-xl" outlined>
              <v-img
                class="card-img rounded-xl hover-image"
                src="/images/beef-steak.jpg"
                alt="Biskwit"
                height="300"
                cover
              >
                <div class="overlay">
                  <v-card-actions class="hover-actions">
                    <v-btn
                      class="order-btn rounded-pill"
                      color="white"
                      block
                      prepend-icon="mdi mdi-cart"
                    >
                      Order Now
                    </v-btn>
                  </v-card-actions>
                </div>
              </v-img>
              <v-card-title>
                <h2 class="text-center">Biskwit</h2>
                <h3 class="text-center">₱40/per serving</h3>
              </v-card-title>
              <v-card-text class="text-center">
                A Filipino beef dish made with thin slices of beef marinated in
                soy sauce, calamansi (or lemon), garlic, and onions. It is
                typically cooked with onions and served with a savory, tangy
                sauce.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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

/* Ordering Section */
.head-text {
  font-size: 50px;
  color: rgb(82, 80, 80);
}

.ordering-card {
  position: relative;
  margin-bottom: 20px;
}

.ordering-card h2,
.ordering-card h3 {
  color: rgb(82, 80, 80);
}

.hover-image {
  position: relative;
  transition: filter 0.3s ease;
}

.hover-image:hover {
  filter: brightness(0.7);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.hover-image:hover .overlay {
  opacity: 1;
}

.hover-actions {
  z-index: 2;
}

.order-btn {
  background-color: #000;
}

/* Ordering Section */
</style>
