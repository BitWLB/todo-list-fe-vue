<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Sheet, SheetContent, SheetTrigger } from '@/core/components/ui/sheet'
import { Button } from '@/core/components/ui/button'
</script>

<template>
  <nav
    id="mobile-menu"
    class="fixed inset-x-0 top-0 z-40 transition-transform translate-y-0 lg:-translate-y-full"
    aria-label="MobileMenu"
  >
    <div
      class="flex flex-row items-center h-16 justify-between w-full px-4 border-4 rounded-b-base bg-secondaryWhite dark:bg-secondaryBlack"
    >
      <div class="space-x-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="noShadow" size="icon">
              <Icon icon="mi:menu" class="h-6 w-6" />

              <span class="sr-only">Toggle Theme</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left">
            <slot name="sidebar-menu-item" />
          </SheetContent>
        </Sheet>
      </div>

      <slot name="mobile-menu-center-items" />

      <slot name="mobile-menu-right-items" />
    </div>
  </nav>
</template>
