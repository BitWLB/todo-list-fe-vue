<script lang="ts" setup>
import { cn } from '@/core/plugins/shadcnPlugins'
import {
  CalendarHeadCell,
  type CalendarHeadCellProps,
  useForwardProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
  CalendarHeadCellProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarHeadCell
    :class="
      cn('text-text rounded-base w-9 font-base text-[0.8rem]', props.class)
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarHeadCell>
</template>
