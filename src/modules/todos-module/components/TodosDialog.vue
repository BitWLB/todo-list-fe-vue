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
import { Label } from '@/core/components/ui/label'
import { Input } from '@/core/components/ui/input'
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

      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> Name </Label>
          <Input id="name" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right"> Username </Label>
          <Input id="username" class="col-span-3" />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit"> Save </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
