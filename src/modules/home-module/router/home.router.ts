import type { RouteRecordRaw } from 'vue-router'
import Home from '@/modules/home-module/views/HomeView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
  },
]

export default routes
