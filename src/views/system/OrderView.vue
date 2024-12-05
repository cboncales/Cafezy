<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { ref } from 'vue'

const tab = ref('one')
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #content>
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" md="8">
            <v-card-title class="headline text-center text-h3 font-fam"
              >Your Orders</v-card-title
            >

            <div class="d-flex justify-center">
              <v-tabs v-model="tab" color="orange">
                <v-tab class="mx-10" value="one">Cart</v-tab>
                <v-tab class="mx-10" value="two">Pending</v-tab>
                <v-tab class="mx-10" value="three">Finished</v-tab>
              </v-tabs>
            </div>

            <div class="tab-content mt-10">
              <div v-show="tab === 'one'">
                <!-- Mock Order List -->
                <v-card class="mb-4" v-for="order in 1" :key="order">
                  <v-card-title>Order #{{ order }}</v-card-title>
                  <v-card-subtitle
                    >Ordered on:
                    {{ new Date().toLocaleDateString() }}</v-card-subtitle
                  >
                  <v-list>
                    <v-list-item v-for="item in 3" :key="item">
                      <v-list-item-title
                        >Food Item {{ item }}</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        Quantity: {{ item }} | Price: ₱{{ item * 100 }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                  <v-card-actions>
                    <v-btn icon color="primary">
                      <v-icon>mdi-receipt</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </div>
              <div v-show="tab === 'two'">
                <!-- Mock Order List -->
                <v-card class="mb-4" v-for="order in 3" :key="order">
                  <v-card-title>Order #{{ order }}</v-card-title>
                  <v-card-subtitle
                    >Ordered on:
                    {{ new Date().toLocaleDateString() }}</v-card-subtitle
                  >
                  <v-list>
                    <v-list-item v-for="item in 3" :key="item">
                      <v-list-item-title
                        >Food Item {{ item }}</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        Quantity: {{ item }} | Price: ₱{{ item * 100 }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                  <v-card-actions>
                    <v-btn icon color="primary">
                      <v-icon>mdi-receipt</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </div>
              <div v-show="tab === 'three'">
                <!-- Mock Order List -->
                <v-card class="mb-4" v-for="order in 2" :key="order">
                  <v-card-title>Order #{{ order }}</v-card-title>
                  <v-card-subtitle
                    >Ordered on:
                    {{ new Date().toLocaleDateString() }}</v-card-subtitle
                  >
                  <v-list>
                    <v-list-item v-for="item in 3" :key="item">
                      <v-list-item-title
                        >Food Item {{ item }}</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        Quantity: {{ item }} | Price: ₱{{ item * 100 }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                  <v-card-actions>
                    <v-btn icon color="primary">
                      <v-icon>mdi-receipt</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </div>

            <!-- <v-divider class="my-5"></v-divider> -->

            <!-- No Orders Message (Placeholder) -->
            <!-- <v-alert type="info" class="mx-4" dismissible>
              You haven't placed any orders yet.
            </v-alert> -->
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.font-fam {
  font-family: 'Quicksand', sans-serif;
  font-weight: 700;
  color: rgb(82, 80, 80);
}

.custom-tabs .v-tabs-slider {
  display: none;
}

.tab-content {
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
}
</style>
