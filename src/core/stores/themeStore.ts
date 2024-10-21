import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { useStorage } from '@vueuse/core'

export const useThemeStore = defineStore('theme', () => {
  const storageConfig = useStorage('config', {
    theme: 'blue',
    radius: 0.6,
    isDark: false,
  })

  const state = reactive({
    theme: storageConfig.value.theme,
    radius: storageConfig.value.radius,
    isDark: storageConfig.value.isDark,
  })

  watch(
    () => state,
    newState => {
      storageConfig.value.theme = newState.theme
      storageConfig.value.radius = newState.radius
      storageConfig.value.isDark = newState.isDark
    },
    { deep: true },
  )

  const setTheme = (themeName: string) => {
    state.theme = themeName
  }

  const setRadius = (newRadius: number) => {
    state.radius = newRadius
  }

  const setIsDark = (darkMode: boolean) => {
    state.isDark = darkMode
  }

  return { state, setTheme, setRadius, setIsDark }
})
