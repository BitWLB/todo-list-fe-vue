<script lang="ts" setup>
import { cn } from '@/core/plugins/shadcnPlugins'
import {
  CalendarHeader,
  type CalendarHeaderProps,
  useForwardProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
  CalendarHeaderProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarHeader
    :class="
      cn(
        'flex justify-between text-text pt-1 relative items-center',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarHeader>
</template>
