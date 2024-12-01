<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'
import { ref } from 'vue'

const { mobile } = useDisplay()

// State to track if the user is logged in
const isLoggedIn = ref(false) // Replace this with actual authentication logic
const showLoginModal = ref(false)

// Method to handle the Order Now button click
const handleOrderNow = () => {
  if (!isLoggedIn.value) {
    showLoginModal.value = true
  } else {
    // Proceed with the order
    console.log('Order placed!')
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
</script>

<template>
  <AppLayout :is-with-app-bar-nav-icon="false">
    <template #content>
      <v-container fluid>
        <v-row>
          <v-col cols="12" lg="6" class="h-screen" v-if="!mobile">
            <v-container class="text-container">
              <p class="content-text mt-16">
                Best Foods From
                <br />
                The Comfort Of
                <br />
                <span>Your Home.</span>
              </p>
              <p class="bot-text mt-16 text-h6">
                Hungry? You're in the right place...
              </p>
            </v-container>
          </v-col>
          <v-col cols="12" lg="6" class="circle-bg h-screen">
            <v-img
              class="custom-img"
              src="/images/hero-dish.jpg"
              alt="filipino food"
            >
            </v-img>
          </v-col>
        </v-row>
        <v-row>
          <!-- Ordering Section -->
          <v-container>
            <div class="head-container my-16">
              <h1 class="head-text text-center my-5">Best Seller Foods</h1>
              <v-item-group
                class="text-center"
                selected-class="bg-orange"
                multiple
              >
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
                          @click="handleOrderNow"
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
                    A savory and slightly tangy dish made with pork simmered in
                    a mixture of soy sauce, vinegar, garlic, bay leaves, and
                    black peppercorns. It's often served with rice and is one of
                    the most popular Filipino comfort foods.
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
                    fruits, beans, jellies, and sometimes ice cream, all topped
                    with leche flan and purple yam (ube). It’s a refreshing
                    treat, especially during hot weather.
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
                    A Filipino-style chicken curry made with chicken pieces
                    cooked in a coconut milk-based sauce, spiced with curry
                    powder, and mixed with vegetables like potatoes, carrots,
                    and bell peppers. It's a comforting and flavorful dish.
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
                    vinegar, soy sauce, garlic, and spices. It's known for its
                    tangy and savory flavor, with a distinct vinegar base that
                    is cooked until tender.
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
                    onions, and potatoes. It has a savory and slightly sweet
                    sauce, often enjoyed with rice.
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
                    A Filipino beef dish made with thin slices of beef marinated
                    in soy sauce, calamansi (or lemon), garlic, and onions. It
                    is typically cooked with onions and served with a savory,
                    tangy sauce.
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
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

/* col1 content styles */
.text-container {
  position: relative;
  top: 100px;
  left: 150px;
}

.content-text {
  font-size: 55px;
  font-weight: 500;
  color: rgb(82, 80, 80);
}

.content-text span {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
  font-weight: 700;
  color: #000000ce;
}

.bot-text {
  color: rgb(82, 80, 80);
}
/* col1 content styles */

/*col2 content styles */

.circle-bg {
  position: relative;
  height: 100%;
  background: none;
  overflow: hidden;
}

.circle-bg::before,
.circle-bg::after {
  content: '';
  position: absolute;
  border-radius: 50%;
}

/* First circle styles */
.circle-bg::before {
  top: 10%;
  left: 90%;
  width: 500px;
  height: 500px;
  background-color: rgba(255, 136, 0, 0.459);
  transform: translate(-50%, -50%);
}

/* Second circle styles */
.circle-bg::after {
  bottom: 10%;
  right: 70%;
  width: 300px;
  height: 300px;
  background-color: rgba(255, 136, 0, 0.384);
  transform: translate(50%, 50%);
}

.custom-img {
  position: relative;
  top: 60px;
  left: 80px;
  height: 500px;
  width: 500px;
  border-radius: 50px;
  z-index: 1;
}
/*col2 content styles */

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
