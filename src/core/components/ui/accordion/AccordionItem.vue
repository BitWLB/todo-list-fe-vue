<script setup lang="ts">
import { cn } from '@/core/plugins/shadcnPlugins'
import {
  AccordionItem,
  type AccordionItemProps,
  useForwardProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
  AccordionItemProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <AccordionItem
    v-bind="forwardedProps"
    :class="
      cn(
        'rounded-base overflow-x-hidden border-2 border-b border-border dark:border-darkBorder shadow-light dark:shadow-dark',
        props.class,
      )
    "
  >
    <slot />
  </AccordionItem>
</template>
