import { defineStore } from 'pinia'
import { useToast } from '@/core/components/ui/toast/use-toast'
import type { ToastItem } from '@/core/interfaces/toastItem'
import { h } from 'vue'

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
      description: h(
        'pre',
        { class: 'mt-2 w-[340px] rounded-md bg-darkBg p-4' },
        h(
          'code',
          { class: 'text-white text-wrap' },
          JSON.stringify(
            {
              data: message,
            },
            null,
            2,
          ),
        ),
      ),
      variant: 'default',
    }

    triggerToast(dataToast)
  }

  function triggerToastFailed(action: string, module: string, message: string) {
    const dataToast: ToastItem = {
      title: `Failed to ${action} ${module} item`,
      description: h(
        'pre',
        { class: 'mt-2 w-[340px] rounded-md bg-secondaryWhite p-4' },
        h(
          'code',
          { class: 'text-white text-wrap' },
          JSON.stringify(
            {
              error: message,
            },
            null,
            2,
          ),
        ),
      ),
      variant: 'destructive',
    }

    triggerToast(dataToast)
  }

  return {
    triggerToastSuccess,
    triggerToastFailed,
  }
})
