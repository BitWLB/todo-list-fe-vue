<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card'
</script>

<template>
  <Card v-for="n in 20" :key="n" class="w-full">
    <CardHeader>
      <CardTitle>Create project {{ n }}</CardTitle>
      <CardDescription> Deploy your new project in one-click. </CardDescription>
    </CardHeader>
    <CardContent> </CardContent>
    <CardFooter> </CardFooter>
  </Card>
</template>
