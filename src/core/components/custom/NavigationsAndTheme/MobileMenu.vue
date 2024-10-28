<script setup lang="ts">
import LogoSVG from '@/core/components/custom/icon/LogoSVG.vue'
</script>

<template>
  <nav
    id="mobile-menu"
    class="fixed inset-x-0 top-0 z-40 transition-transform translate-y-0"
    aria-label="MobileMenu"
  >
    <div
      class="flex flex-row items-center h-16 justify-between w-full px-4 border-4 rounded-b-base bg-secondaryWhite dark:bg-secondaryBlack"
    >
      <div class="space-x-2">
        <LogoSVG />
      </div>

      <slot name="mobile-menu-center-items" />

      <slot name="mobile-menu-right-items" />
    </div>
  </nav>
</template>
