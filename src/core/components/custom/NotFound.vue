<script setup lang="ts">
import { Button } from '@/core/components/ui/button'
</script>

<template>
  <div class="flex flex-col h-screen items-center justify-center space-y-4">
    <div class="space-y-2">
      <p class="text-8xl text-main text-center font-bold animate-bounce">
        Oops!
      </p>
      <p class="text-text font-bold dark:text-darkText text-2xl text-center">
        404 - Page Not Found
      </p>
      <p class="text-text font-light dark:text-darkText text-lg text-center">
        The page you are looking for does not exist. How you got here is a
        mystery.
        <br />
        But you can click the button below to go back to the homepage.
      </p>
    </div>

    <!-- TODO : Back to Home -->

    <Button>Home</Button>
  </div>
</template>
