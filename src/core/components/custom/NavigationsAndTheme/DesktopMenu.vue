<script setup lang="ts">
import { cn } from '@/core/plugins/shadcnPlugins'
import { Icon } from '@iconify/vue'
import { Button } from '@/core/components/ui/button'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <aside
    id="mini-sidebar"
    class="fixed top-0 left-0 z-40 w-16 h-screen transition-transform -translate-x-full lg:translate-x-0"
    aria-label="MiniSidebar"
  >
    <div
      class="flex flex-col h-dvh py-2 overflow-y-auto border-0 lg:border-4 rounded-r-base bg-secondaryWhite dark:bg-secondaryBlack"
    >
      <div class="flex flex-col items-center justify-start flex-1 space-y-4">
        <slot name="desktop-menu-up-items" />
      </div>

      <div class="flex flex-col items-center justify-center flex-1 space-y-4">
        <Button
          variant="noShadow"
          size="icon"
          @click="emit('update:modelValue', !modelValue)"
          :class="cn(modelValue && 'bg-mainAccent')"
        >
          <Icon
            :icon="modelValue ? 'gg:menu-motion' : 'mi:menu'"
            class="h-6 w-6"
          />
          <span class="sr-only">Toggle Menu</span>
        </Button>

        <slot name="desktop-menu-center-items" />
      </div>

      <div class="flex flex-col items-center justify-end flex-1 space-y-4">
        <slot name="desktop-menu-down-items" />
      </div>
    </div>
  </aside>

  <aside
    id="desktop-menu"
    :class="
      cn(
        'fixed top-0 left-0 lg:left-8 z-30 h-screen transition-all ease-in-out duration-300 -translate-x-full lg:translate-x-0',
        modelValue ? 'w-72' : 'w-0',
      )
    "
    aria-label="DesktopMenu"
  >
    <div
      class="flex flex-col h-dvh py-2 space-y-4 overflow-y-auto border-0 lg:border-4 rounded-r-base bg-secondaryWhite dark:bg-secondaryBlack"
    >
      <slot name="sidebar-menu-item" />
    </div>
  </aside>
</template>
