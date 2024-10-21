<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationApp from '@/core/components/custom/NavigationsAndTheme/NavigationApp.vue'
</script>

<template>
  <NavigationApp>
    <template #content>
      <div class="p-4">
        <RouterView />
      </div>
    </template>
  </NavigationApp>
</template>
