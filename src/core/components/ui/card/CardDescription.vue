<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/core/plugins/shadcnPlugins'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p :class="cn('text-sm text-black font-base !mt-3', props.class)">
    <slot />
  </p>
</template>
