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
const { setDialog, fetchTodoDetailsWithId, removeTodo } = todosStore

async function handleDialog(value: boolean, id: number) {
  await fetchTodoDetailsWithId(id)
  setDialog(value, true)
}

async function handleRemove(todo: TodosItem) {
  await removeTodo(todo)
}
</script>

<template>
  <Card class="flex flex-col h-full w-full">
    <CardHeader>
      <CardTitle class="text-3xl capitalize">
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
      <Button variant="neutral" @click="handleRemove(todosItem)">
        Remove
      </Button>
      <Button @click="handleDialog(true, todosItem.id)"> Edit </Button>
    </CardFooter>
  </Card>
</template>
