<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/core/plugins/shadcnPlugins'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <h3
    :class="cn('text-xl leading-none font-heading tracking-tight', props.class)"
  >
    <slot />
  </h3>
</template>
