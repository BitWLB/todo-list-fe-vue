import type { RouteRecordRaw } from 'vue-router'
import TodosView from '@/modules/todos-module/views/TodosView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: TodosView,
  },
]

export default routes
