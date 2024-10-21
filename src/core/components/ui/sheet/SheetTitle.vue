<script setup lang="ts">
import { cn } from '@/core/plugins/shadcnPlugins'
import { DialogTitle, type DialogTitleProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
  DialogTitleProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <DialogTitle
    :class="cn('text-lg font-bold text-text dark:text-darkText', props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </DialogTitle>
</template>
