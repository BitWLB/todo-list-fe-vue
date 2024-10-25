<script lang="ts" setup>
import { buttonVariants } from '@/core/components/ui/button'
import { cn } from '@/core/plugins/shadcnPlugins'
import {
  CalendarCellTrigger,
  type CalendarCellTriggerProps,
  useForwardProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
  CalendarCellTriggerProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarCellTrigger
    :class="
      cn(
        buttonVariants({ variant: 'noShadow' }),
        'h-9 w-9 p-0 font-base',
        '[&[data-today]:not([data-selected])]:bg-white [&[data-today]:not([data-selected])]:text-text',
        // Selected
        'data-[selected]:!bg-black data-[selected]:text-white data-[selected]:rounded-base',
        // Disabled
        'data-[disabled]:text-black data-[disabled]:opacity-50 data-[disabled]:rounded-base',
        // Unavailable
        'data-[unavailable]:invisible',
        // Outside months
        'data-[outside-view]:day-outside data-[outside-view]:text-black data-[outside-view]:opacity-50 [&[data-outside-view][data-selected]]:bg-none',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCellTrigger>
</template>
