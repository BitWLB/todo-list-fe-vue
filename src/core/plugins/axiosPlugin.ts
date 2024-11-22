import axios from 'axios'
import type { AxiosInstance } from 'axios'

export const http: AxiosInstance = axios.create({
  baseURL: window.APP_CONFIG.apiUrl,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
