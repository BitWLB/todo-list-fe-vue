<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationApp from '@/core/components/custom/NavigationsAndTheme/NavigationApp.vue'
import Toaster from '@/core/components/ui/toast/Toaster.vue'
</script>

<template>
  <NavigationApp>
    <template #content>
      <div class="p-4">
        <RouterView />
      </div>
    </template>
  </NavigationApp>

  <Toaster />
</template>
