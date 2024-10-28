<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/core/components/ui/alert-dialog'
import { useLoadingStore } from '@/core/stores/loadingStore'
import { toRefs } from 'vue'
import LoadingSVG from '@/core/components/custom/icon/LoadingSVG.vue'

const loadingStore = useLoadingStore()
const { isLoading } = toRefs(loadingStore)
</script>

<template>
  <AlertDialog :open="isLoading">
    <AlertDialogContent class="w-11/12 sm:max-w-[450px]">
      <AlertDialogHeader class="flex flex-row items-center justify-center">
        <AlertDialogTitle>
          <LoadingSVG />
        </AlertDialogTitle>

        <AlertDialogDescription
          class="text-2xl md:text-5xl font-semibold text-text dark:text-darkText"
        >
          Loading...
        </AlertDialogDescription>
      </AlertDialogHeader>
    </AlertDialogContent>
  </AlertDialog>
</template>
