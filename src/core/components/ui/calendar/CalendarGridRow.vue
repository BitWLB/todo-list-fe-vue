<script lang="ts" setup>
import { cn } from '@/core/plugins/shadcnPlugins'
import {
  CalendarGridRow,
  type CalendarGridRowProps,
  useForwardProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
  CalendarGridRowProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarGridRow
    :class="cn('flex justify-between', props.class)"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarGridRow>
</template>
