<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/core/plugins/shadcnPlugins'
import { SelectLabel, type SelectLabelProps } from 'radix-vue'
import { Separator } from '@/core/components/ui/separator'

const props = defineProps<
  SelectLabelProps & { class?: HTMLAttributes['class'] }
>()
</script>

<template>
  <SelectLabel
    :class="
      cn(
        'border-2 border-transparent py-1.5 pl-8 pr-2 text-base font-bold text-black/80',
        props.class,
      )
    "
  >
    <slot />
    <Separator />
  </SelectLabel>
</template>
