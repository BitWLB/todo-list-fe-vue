import { http } from '@/core/plugins/axiosPlugin'
import type { TodosItem } from '@/modules/todos-module/interfaces/todosItem'
import type { TodosForm } from '@/modules/todos-module/interfaces/todosForm'

async function getTodos() {
  return await http.get<TodosItem[]>('/todos')
}

async function getTodosById(id: number) {
  return await http.get<TodosItem>(`/todos/${id}`)
}

async function addTodo(data: TodosForm) {
  return await http.post<TodosItem>('/todo', data)
}

async function updateTodo(id: number, data: TodosForm) {
  return await http.put<TodosItem>(`/todo/${id}`, data)
}

async function deleteTodo(id: number) {
  return await http.delete<TodosItem>(`/todo/${id}`)
}

export default {
  getTodos,
  getTodosById,
  addTodo,
  updateTodo,
  deleteTodo,
}
