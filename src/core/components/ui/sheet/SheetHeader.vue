<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/core/plugins/shadcnPlugins'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    :class="
      cn(
        'flex flex-col space-y-2 text-center font-bold sm:text-left',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
