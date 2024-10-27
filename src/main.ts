import '@/core/assets/css/main.css'
import '@/core/assets/css/themes.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { vAutoAnimate } from '@formkit/auto-animate/vue'

import App from '@/App.vue'
import routes from '@/core/router'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PATH),
  scrollBehavior: () => ({ top: 0 }),
  routes,
})

app.directive('auto-animate', vAutoAnimate)

app.use(createPinia())
app.use(router)
app.mount('#app')
