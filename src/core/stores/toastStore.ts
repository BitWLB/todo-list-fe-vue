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

  function triggerToastSuccess(
    action: string,
    module: string,
    message: string,
  ) {
    const dataToast: ToastItem = {
      title: `Success to ${action} ${module} item`,
      description: message,
      variant: 'default',
    }

    triggerToast(dataToast)
  }

  function triggerToastFailed(action: string, module: string, message: string) {
    const dataToast: ToastItem = {
      title: `Failed to ${action} ${module} item`,
      description: message,
      variant: 'destructive',
    }

    triggerToast(dataToast)
  }

  return {
    triggerToastSuccess,
    triggerToastFailed,
  }
})
