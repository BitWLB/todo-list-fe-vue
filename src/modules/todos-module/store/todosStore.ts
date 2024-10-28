import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import type { TodosForm } from '@/modules/todos-module/interfaces/todosForm'
import type { TodosPriority } from '@/modules/todos-module/interfaces/todosPriority'
import { todosPrioritiesData } from '@/modules/todos-module/data/data'
import type { TodosItem } from '@/modules/todos-module/interfaces/todosItem'
import { useToastStore } from '@/core/stores/toastStore'
import { useLoadingStore } from '@/core/stores/loadingStore'

export const useTodosStore = defineStore('todos', () => {
  const dialogTodos: Ref<boolean> = ref<boolean>(false)
  const form: Ref<TodosForm | null> = ref<TodosForm | null>(null)
  const isEdit: Ref<boolean> = ref<boolean>(false)
  const idTodoEdit: Ref<number | null> = ref<number | null>(null)
  const todosPriorities: TodosPriority[] = todosPrioritiesData
  const dataTodos: Ref<TodosItem[]> = ref<TodosItem[]>([])

  const toastStore = useToastStore()
  const { triggerToastSuccess, triggerToastFailed } = toastStore

  const loadingStore = useLoadingStore()
  const { setLoading } = loadingStore

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
    if (isEdit.value) {
      await updateTodo(value)
    } else {
      await addTodo(value)
    }
  }

  async function addTodo(value: TodosForm): Promise<void> {
    // todo startt -- custom with api
    try {
      setLoading(true)

      const newTodo: TodosItem = {
        id: ++idDummy.value,
        ...value,
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
      dataTodos.value.push(newTodo)

      setLoading(false)
      triggerToastSuccess('Add', 'Todo', value.title)
    } catch (error) {
      const errorMessage =
        (error as { description?: string })?.description ||
        'An unexpected error occurred'

      setLoading(false)
      triggerToastFailed('Add', 'Todo', errorMessage)
    }
    // todo end -- custom with api
  }

  async function updateTodo(value: TodosForm): Promise<void> {
    // todo startt -- custom with api
    try {
      setLoading(true)

      const todoIndex = dataTodos.value.findIndex(
        v => v.id === idTodoEdit.value,
      )
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (todoIndex !== -1) {
        dataTodos.value[todoIndex] = {
          ...dataTodos.value[todoIndex],
          ...value,
        }

        setLoading(false)
        triggerToastSuccess('Update', 'Todo', value.title)
      }
    } catch (error) {
      const errorMessage =
        (error as { description?: string })?.description ||
        'An unexpected error occurred'

      setLoading(false)
      triggerToastFailed('Update', 'Todo', errorMessage)
    }
    // todo end -- custom with api
  }

  function clearForm(): void {
    form.value = null
    idTodoEdit.value = null
  }

  async function fetchTodoDetailsWithId(todoId: number): Promise<void> {
    // todo startt -- custom with api
    try {
      setLoading(true)

      const todo = dataTodos.value.find(v => v.id === todoId)
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (todo) {
        idTodoEdit.value = todo.id
        form.value = { ...todo }
      }

      setLoading(false)
    } catch (error) {
      const errorMessage =
        (error as { description?: string })?.description ||
        'An unexpected error occurred'

      setLoading(false)
      triggerToastFailed('Get', 'Todo', errorMessage)
      // todo end -- custom with api
    }
  }

  async function removeTodo(todoParam: TodosItem): Promise<void> {
    // todo startt -- custom with api
    try {
      setLoading(true)
      const index = dataTodos.value.findIndex(todo => todo.id === todoParam.id)
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (index !== -1) {
        dataTodos.value.splice(index, 1)
      }

      setLoading(false)
      triggerToastSuccess('Remove', 'Todo', todoParam.title)
    } catch (error) {
      const errorMessage =
        (error as { description?: string })?.description ||
        'An unexpected error occurred'

      setLoading(false)
      triggerToastFailed('Remove', 'Todo', errorMessage)
    }
    // todo end -- custom with api
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
