<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/core/plugins/shadcnPlugins'
import { useFormField } from './useFormField'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { formDescriptionId } = useFormField()
</script>

<template>
  <p
    :id="formDescriptionId"
    :class="cn('text-sm font-base text-text dark:text-darkText', props.class)"
  >
    <slot />
  </p>
</template>
