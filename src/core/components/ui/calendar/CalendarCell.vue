<script lang="ts" setup>
import { cn } from '@/core/plugins/shadcnPlugins'
import {
  CalendarCell,
  type CalendarCellProps,
  useForwardProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
  CalendarCellProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarCell
    :class="
      cn(
        'h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20 [&:has([data-selected])]:bg-white [&:has([data-selected])]:rounded-base [&:has([data-selected][data-outside-view])]:bg-white',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCell>
</template>
