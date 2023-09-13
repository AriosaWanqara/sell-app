import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import { VueQueryPlugin } from '@tanstack/vue-query'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia'
const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(PerfectScrollbar)
app.use(vuetify)
app.use(VueQueryPlugin)
app.mount('#app')
