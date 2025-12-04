import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Google login
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
  components,
  directives,
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

// register Google login plugin here
app.use(vue3GoogleLogin, {
  clientId:
    '992099789068-cvbd4agisi7b88e4bsvs4m512ek4hnup.apps.googleusercontent.com',
})

app.mount('#app')
app.use(vue3GoogleLogin, {
  clientId:
    '992099789068-s45be3ajrsi0702aa2tsmr1gl6v9nq1t.apps.googleusercontent.com',
})
