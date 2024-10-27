import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import type { TodosForm } from '@/modules/todos-module/interfaces/todosForm'
import type { TodosPriority } from '@/modules/todos-module/interfaces/todosPriority'
import { todosPrioritiesData } from '@/modules/todos-module/data/data'
import type { TodosItem } from '@/modules/todos-module/interfaces/todosItem'

export const useTodosStore = defineStore('todos', () => {
  const dialogTodos: Ref<boolean> = ref<boolean>(false)
  const form: Ref<TodosForm | null> = ref<TodosForm | null>(null)
  const isEdit: Ref<boolean> = ref<boolean>(false)
  const idTodoEdit: Ref<number | null> = ref<number | null>(null)
  const todosPriorities: TodosPriority[] = todosPrioritiesData
  const dataTodos: Ref<TodosItem[]> = ref<TodosItem[]>([])

  // todo dummy
  const idDummy = ref(0)

  function setDialog(valueDialog: boolean, valueEdit?: boolean): void {
    dialogTodos.value = valueDialog
    isEdit.value = valueEdit ?? false
    if (!valueDialog) {
      clearForm()
    }
  }

  async function submitForm(value: TodosForm): Promise<void> {
    try {
      if (isEdit.value) {
        // todo startt -- custom with api
        const todoIndex = dataTodos.value.findIndex(
          v => v.id === idTodoEdit.value,
        )
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (todoIndex !== -1) {
          dataTodos.value[todoIndex] = {
            ...dataTodos.value[todoIndex],
            ...value,
          }
        } else {
          console.error(
            `Todo with ID ${idTodoEdit.value} not found for editing.`,
          )
        }
      } else {
        const newTodo: TodosItem = {
          id: ++idDummy.value,
          ...value,
        }
        await new Promise(resolve => setTimeout(resolve, 1000))
        dataTodos.value.push(newTodo)
        // todo end -- custom with api
      }
    } catch (error) {
      console.error('Failed to submit todo :', error)
    }
  }

  function clearForm(): void {
    form.value = null
    idTodoEdit.value = null
  }

  async function fetchTodoDetailsWithId(todoId: number): Promise<void> {
    try {
      // todo startt -- custom with api
      const todo = dataTodos.value.find(v => v.id === todoId)
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (todo) {
        idTodoEdit.value = todo.id
        form.value = { ...todo }
      } else {
        console.error(`Todo with ID ${todoId} not found.`)
        clearForm()
      }
      // todo end -- custom with api
    } catch (error) {
      console.error('Failed to fetch todo details:', error)
    }
  }

  async function removeTodo(todo: TodosItem): Promise<void> {
    try {
      // todo startt -- custom with api
      const index = dataTodos.value.findIndex(todo => !Number.isNaN(todo.id))
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (index !== -1) {
        dataTodos.value.splice(index, 1)
      } else {
        console.error(`Todo with ID ${todo.id} not found.`)
      }
      // todo end -- custom with api
    } catch (error) {
      console.error('Failed to submit todo :', error)
    }
  }

  return {
    dialogTodos,
    isEdit,
    form,
    todosPriorities,
    dataTodos,
    setDialog,
    submitForm,
    fetchTodoDetailsWithId,
    removeTodo,
  }
})
