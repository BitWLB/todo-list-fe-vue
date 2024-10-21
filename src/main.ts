import '@/core/assets/css/main.css'
import '@/core/assets/css/themes.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import App from '@/App.vue'
import routes from '@/core/router'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PATH),
  scrollBehavior: () => ({ top: 0 }),
  routes,
})

app.use(createPinia())
app.use(router)
app.mount('#app')
