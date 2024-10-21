<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/core/plugins/shadcnPlugins'
import { ScrollArea } from '@/core/components/ui/scroll-area'
import DesktopMenu from '@/core/components/custom/NavigationsAndTheme/DesktopMenu.vue'
import MobileMenu from '@/core/components/custom/NavigationsAndTheme/MobileMenu.vue'
import ThemeCustomizer from '@/core/components/custom/NavigationsAndTheme/ThemeCustomizer.vue'

const isExpand = ref(false)
</script>

<template>
  <DesktopMenu v-model="isExpand">
    <template #desktop-menu-center-items>
      <ThemeCustomizer />
    </template>
  </DesktopMenu>

  <MobileMenu>
    <template #mobile-menu-right-items>
      <ThemeCustomizer />
    </template>
  </MobileMenu>

  <main
    :class="
      cn('transition-all duration-300', isExpand ? 'lg:ml-80' : 'lg:ml-16')
    "
  >
    <ScrollArea class="h-dvh pt-16 lg:pt-0">
      <slot name="content" />
    </ScrollArea>
  </main>
</template>
