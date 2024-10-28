<script setup lang="ts">
import { onMounted, toRefs } from 'vue'
import { useTodosStore } from '@/modules/todos-module/store/todosStore'
import TodosDialog from '@/modules/todos-module/components/TodosDialog.vue'
import TodosCard from '@/modules/todos-module/components/TodosCard.vue'

const todosStore = useTodosStore()
const { dataTodos } = toRefs(todosStore)
const { fetchAllTodos } = todosStore

onMounted(async () => {
  await Promise.all([fetchAllTodos()])
})
</script>

<template>
  <div
    class="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 justify-between"
  >
    <div>
      <p
        class="text-2xl md:text-3xl font-bold text-main drop-shadow-[1.5px_1.5px_var(--tw-shadow-color)] shadow-darkBg"
      >
        Hello, team!
      </p>
      <p class="text-2xl md:text-3xl font-bold text-text dark:text-darkText">
        You've got {{ dataTodos.length }} tasks today
      </p>
    </div>

    <div
      class="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 justify-between md:items-end"
    >
      <TodosDialog />
    </div>
  </div>

  <div class="mt-8">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      v-if="dataTodos.length"
    >
      <TodosCard
        v-for="(todo, index) in dataTodos"
        :key="index"
        :todos-item="todo"
      />
    </div>
  </div>
</template>
