<script setup lang="ts">
import { ref, toRefs, watchEffect } from 'vue'
import { cn } from '@/core/plugins/shadcnPlugins'
import { Icon } from '@iconify/vue'
import { colors } from '@/core/assets/data/colors'
import { Button } from '@/core/components/ui/button'
import { Label } from '@/core/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from '@/core/components/ui/sheet'
import { Separator } from '@/core/components/ui/separator'
import { useThemeStore } from '@/core/stores/themeStore'

const RADII = ref([0, 0.4, 0.6, 0.8, 1.2])

const themeStore = useThemeStore()

const { state, setTheme, setRadius, setIsDark } = themeStore
const { theme, radius, isDark } = toRefs(state)

watchEffect(() => {
  document.documentElement.style.setProperty('--radius', `${radius.value}rem`)
  document.documentElement.classList.remove(
    ...colors.map(color => `theme-${color.name}`),
  )
  document.documentElement.classList.add(`theme-${theme.value}`)
  document.documentElement.classList.toggle('dark', isDark.value)
})
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="noShadow" size="icon">
        <Icon icon="jam:settings-alt" class="h-6 w-6" />

        <span class="sr-only">Toggle Theme</span>
      </Button>
    </SheetTrigger>

    <SheetContent>
      <SheetHeader>
        <SheetTitle
          class="text-center font-base flex items-center justify-center"
        >
          <p class="text-3xl">Theme</p>
        </SheetTitle>

        <SheetDescription class="text-center">
          Pick a style and color for your app.
        </SheetDescription>

        <Separator />
      </SheetHeader>

      <div class="mt-4">
        <Label for="color" class="text-base"> Color </Label>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
          <Button
            v-for="(color, index) in colors"
            :key="index"
            variant="noShadow"
            :class="
              cn(
                'h-8 justify-start px-3',
                !(theme === color.name) ? 'bg-white' : 'bg-main',
              )
            "
            @click="setTheme(color.name)"
          >
            <span
              class="h-5 w-5 rounded-full flex items-center justify-center"
              :style="{
                backgroundColor: theme === color.name ? color.bgHex : color.hex,
              }"
            >
              <Icon
                v-if="color.name === theme"
                icon="jam:check"
                class="h-4 w-4 text-mainAccent"
              />
            </span>

            <span class="ml-2 text-text capitalize">
              {{ color.name }}
            </span>
          </Button>
        </div>
      </div>

      <div class="mt-4">
        <Label for="radius" class="text-base"> Radius </Label>

        <div class="grid grid-cols-5 gap-2">
          <Button
            v-for="(r, index) in RADII"
            :key="index"
            variant="noShadow"
            :class="cn('h-8 justify-center px-3', r != radius && 'bg-white')"
            @click="setRadius(r)"
          >
            <span class="text-text">
              {{ r }}
            </span>
          </Button>
        </div>
      </div>

      <div class="mt-4">
        <Label for="theme" class="text-base"> Theme </Label>

        <div class="flex space-x-2">
          <Button
            variant="noShadow"
            :class="cn('h-8 justify-center px-4', isDark && 'bg-white')"
            @click="setIsDark(false)"
          >
            <Icon icon="humbleicons:sun" class="h-5 w-5" />
            <span class="text-text">Light</span>
          </Button>

          <Button
            variant="noShadow"
            :class="cn('h-8 justify-center px-4', !isDark && 'bg-white')"
            @click="setIsDark(true)"
          >
            <Icon icon="lets-icons:moon" class="h-5 w-5" />
            <span class="text-text">Dark</span>
          </Button>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>
