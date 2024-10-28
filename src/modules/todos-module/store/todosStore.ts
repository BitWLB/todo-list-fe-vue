import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import { AxiosError } from 'axios'
import { API } from '@/api'
import { todosPrioritiesData } from '@/modules/todos-module/data/data'
import type { TodosForm } from '@/modules/todos-module/interfaces/todosForm'
import type { TodosPriority } from '@/modules/todos-module/interfaces/todosPriority'
import type { TodosItem } from '@/modules/todos-module/interfaces/todosItem'
import { useToastStore } from '@/core/stores/toastStore'
import { useLoadingStore } from '@/core/stores/loadingStore'

type TodoOperation = () => Promise<unknown>

export const useTodosStore = defineStore('todos', () => {
  const dialogTodos: Ref<boolean> = ref<boolean>(false)
  const form: Ref<TodosForm | null> = ref<TodosForm | null>(null)
  const isUpdate: Ref<boolean> = ref<boolean>(false)
  const idTodoUpdate: Ref<number | null> = ref<number | null>(null)
  const todosPriorities: TodosPriority[] = todosPrioritiesData
  const dataTodos: Ref<TodosItem[]> = ref<TodosItem[]>([])

  const { triggerToastSuccess, triggerToastFailed } = useToastStore()
  const { setLoading } = useLoadingStore()

  const setDialog = (isOpen: boolean, update: boolean = false) => {
    dialogTodos.value = isOpen
    isUpdate.value = update
    if (!isOpen) clearForm()
  }

  const submitForm = async (todo: TodosForm) =>
    isUpdate.value ? updateTodo(todo) : addTodo(todo)

  const addTodo = async (todo: TodosForm) => {
    await handleTodoOperation(
      () => API.todo.addTodo({ ...form.value, ...todo }),
      'Add',
      todo.title,
    )
  }

  const updateTodo = async (todo: TodosForm) => {
    if (idTodoUpdate.value !== null) {
      await handleTodoOperation(
        () =>
          API.todo.updateTodo(idTodoUpdate.value!, { ...form.value, ...todo }),
        'Update',
        todo.title,
      )
    }
  }

  const deleteTodo = async (todo: TodosItem) => {
    await handleTodoOperation(
      () => API.todo.deleteTodo(todo.id),
      'Delete',
      todo.title,
    )
  }

  const fetchAllTodos = async () => {
    await handleTodoOperation(
      async () => {
        const { data, status } = await API.todo.getTodos()
        if (status == 200) {
          dataTodos.value = data
        }
      },
      'Get All',
      'Success',
    )
  }

  const fetchTodoDetailsWithId = async (
    id: number,
    update: boolean = false,
  ) => {
    await handleTodoOperation(
      async () => {
        const { data, status } = await API.todo.getTodosById(id)
        if (status === 200) {
          if (update) idTodoUpdate.value = data.id
          form.value = {
            title: data.title,
            priority: data.priority ? String(data.priority) : '1', // todo - fix with number
            description: data.description,
          }
        }
      },
      'Get by ID',
      'Success',
    )
  }

  const clearForm = () => {
    form.value = null
    idTodoUpdate.value = null
  }

  const handleTodoOperation = async (
    operation: TodoOperation,
    action: string,
    message: string = '',
  ): Promise<void> => {
    try {
      setLoading(true)
      await operation()
      triggerToastSuccess(action, 'Todo', message)
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.message
          : 'An unexpected error occurred'
      triggerToastFailed(action, 'Todo', errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    dialogTodos,
    isUpdate,
    form,
    todosPriorities,
    dataTodos,
    setDialog,
    submitForm,
    fetchAllTodos,
    fetchTodoDetailsWithId,
    deleteTodo,
  }
})
