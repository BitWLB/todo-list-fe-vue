<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog'
import { Button } from '@/core/components/ui/button'
import { Icon } from '@iconify/vue'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="default" class="space-x-2 justify-center">
        <Icon icon="ci:list-add" class="h-5 w-5" />

        <span class="text-text"> Add Todo </span>
      </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle> Add Todo </DialogTitle>

        <DialogDescription>
          Add your todo list here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button type="submit"> Save </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
