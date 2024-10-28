<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationApp from '@/core/components/custom/NavigationsAndTheme/NavigationApp.vue'
import Toaster from '@/core/components/ui/toast/Toaster.vue'
import LoadingPopup from '@/core/components/custom/LoadingPopup.vue'
</script>

<template>
  <LoadingPopup />

  <NavigationApp>
    <template #content>
      <div class="p-4">
        <RouterView />
      </div>
    </template>
  </NavigationApp>

  <Toaster />
</template>
