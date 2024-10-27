<script setup lang="ts">
import { cn } from '@/core/plugins/shadcnPlugins'
import { AlertDialogTitle, type AlertDialogTitleProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
  AlertDialogTitleProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <AlertDialogTitle
    v-bind="delegatedProps"
    :class="cn('text-lg font-bold', props.class)"
  >
    <slot />
  </AlertDialogTitle>
</template>
