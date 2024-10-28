<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogContent,
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
      <div class="flex flex-row items-center justify-center">
        <LoadingSVG />

        <p
          class="text-2xl md:text-5xl font-semibold text-text dark:text-darkText"
        >
          Loading...
        </p>
      </div>
    </AlertDialogContent>
  </AlertDialog>
</template>
