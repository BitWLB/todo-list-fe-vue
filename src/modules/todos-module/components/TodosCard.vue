<script setup lang="ts">
import { toRefs } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card'
import { Button } from '@/core/components/ui/button'
import { Separator } from '@/core/components/ui/separator'
import { useTodosStore } from '@/modules/todos-module/store/todosStore'
import type { TodosItem } from '@/modules/todos-module/interfaces/todosItem'

defineProps<{
  todosItem: TodosItem
}>()

const todosStore = useTodosStore()
const { todosPriorities } = toRefs(todosStore)
const { setDialog, fetchTodoDetailsWithId, deleteTodo } = todosStore

async function handleDialog(isOpen: boolean, id: number) {
  await fetchTodoDetailsWithId(id, true)
  setDialog(isOpen, true)
}

async function handleDelete(todo: TodosItem) {
  await deleteTodo(todo)
}
</script>

<template>
  <Card class="flex flex-col h-full w-full">
    <CardHeader>
      <CardTitle class="text-xl lg:text-2xl capitalize text-wrap">
        {{ todosItem.title }}
      </CardTitle>

      <CardDescription class="capitalize">
        {{
          todosPriorities.find(v => v.id === Number(todosItem.priority))
            ?.description || `- Can't find priority -`
        }}
      </CardDescription>

      <Separator />
    </CardHeader>

    <CardContent class="flex-grow text-wrap">
      <p class="capitalize">
        {{ todosItem.description }}
      </p>
    </CardContent>

    <CardFooter class="flex items-end justify-end space-x-4 px-6 pb-6">
      <Button variant="neutral" @click="handleDelete(todosItem)">
        Delete
      </Button>
      <Button @click="handleDialog(true, todosItem.id)"> Update </Button>
    </CardFooter>
  </Card>
</template>
