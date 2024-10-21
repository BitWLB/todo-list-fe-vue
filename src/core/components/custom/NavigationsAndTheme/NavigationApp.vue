<script setup lang="ts">
import { cn } from '@/core/plugins/shadcnPlugins'
import { ScrollArea } from '@/core/components/ui/scroll-area'
import MobileMenu from '@/core/components/custom/NavigationsAndTheme/MobileMenu.vue'
import ThemeCustomizer from '@/core/components/custom/NavigationsAndTheme/ThemeCustomizer.vue'
</script>

<template>
  <MobileMenu>
    <template #mobile-menu-right-items>
      <ThemeCustomizer />
    </template>
  </MobileMenu>

  <main :class="cn('transition-all duration-300')">
    <ScrollArea class="h-dvh pt-16">
      <slot name="content" />
    </ScrollArea>
  </main>
</template>
