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
import type { ToastItem } from '@/core/interfaces/toastItem'
import { useToastStore } from '@/core/stores/toastStore'

defineProps<{
  todosItem: TodosItem
}>()

const todosStore = useTodosStore()
const { todosPriorities } = toRefs(todosStore)
const { setDialog, fetchTodoDetailsWithId, removeTodo } = todosStore

const toastStore = useToastStore()
const { triggerToast } = toastStore

async function handleDialog(value: boolean, id: number) {
  try {
    await fetchTodoDetailsWithId(id)
    setDialog(value, true)
  } catch (error) {
    const errorMessage =
      (error as { description?: string })?.description ||
      'An unexpected error occurred'

    const dataToast: ToastItem = {
      title: 'Failed to find data',
      description: errorMessage,
      variant: 'destructive',
    }

    triggerToast(dataToast)

    console.error('Failed to find data:', error)
  }
}

async function handleRemove(todo: TodosItem) {
  try {
    await removeTodo(todo)

    const dataToast: ToastItem = {
      title: 'Success removes the following values:',
      description: todo.title,
      variant: 'default',
    }

    triggerToast(dataToast)
  } catch (error) {
    const errorMessage =
      (error as { description?: string })?.description ||
      'An unexpected error occurred'

    const dataToast: ToastItem = {
      title: 'Failed to removes',
      description: errorMessage,
      variant: 'destructive',
    }

    triggerToast(dataToast)

    console.error('Failed to removes:', error)
  }
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
