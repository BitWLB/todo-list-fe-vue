import axios from 'axios'
import type { AxiosInstance } from 'axios'

export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
