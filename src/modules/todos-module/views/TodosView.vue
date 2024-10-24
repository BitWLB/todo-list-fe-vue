<script setup lang="ts">
import TodosDialog from '@/modules/todos-module/components/TodosDialog.vue'
import TodosCard from '@/modules/todos-module/components/TodosCard.vue'
</script>

<template>
  <div
    class="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 justify-between"
  >
    <div>
      <p class="text-xl md:text-2xl font-bold text-main">Hello, team!</p>
      <p class="text-2xl md:text-3xl font-bold text-text dark:text-darkText">
        You've got 8 tasks today
      </p>
    </div>

    <div
      class="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 justify-between md:items-end"
    >
      <TodosDialog />
      <TodosDialog />
    </div>
  </div>

  <div class="mt-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <TodosCard />
    </div>
  </div>
</template>
