<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/core/plugins/shadcnPlugins'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'rounded-base shadow-light dark:shadow-dark border-2 border-border dark:border-darkBorder bg-main text-black',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
