import { defineStore } from 'pinia'
import { useToast } from '@/core/components/ui/toast/use-toast'
import type { ToastItem } from '@/core/interfaces/toastItem'

const { toast } = useToast()

export const useToastStore = defineStore('toast', () => {
  function triggerToast(data: ToastItem) {
    toast({
      title: data.title,
      description: data.description,
      variant: data.variant,
      action: data.action,
    })
  }

  return {
    triggerToast,
  }
})
