import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const isLoading: Ref<boolean> = ref<boolean>(false)

  function setLoading(value: boolean) {
    isLoading.value = value
  }

  return {
    isLoading,
    setLoading,
  }
})
