import type { VNode } from 'vue'

interface ToastItem {
  title: string
  description: string | VNode
  variant: 'default' | 'destructive' | null
  action?: () => void | Promise<void> | VNode
}

export type { ToastItem }
