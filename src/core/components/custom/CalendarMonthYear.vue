<script setup lang="ts">
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
} from '@/core/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select'
import { cn } from '@/core/plugins/shadcnPlugins'
import {
  type DateValue,
  getLocalTimeZone,
  today,
} from '@internationalized/date'
import { useVModel } from '@vueuse/core'
import {
  CalendarRoot,
  type CalendarRootEmits,
  type CalendarRootProps,
  useDateFormatter,
  useForwardPropsEmits,
} from 'radix-vue'
import { createDecade, createYear, toDate } from 'radix-vue/date'
import { computed, ref, type HTMLAttributes, type Ref, watch } from 'vue'

const props = withDefaults(
  defineProps<CalendarRootProps & { class?: HTMLAttributes['class'] }>(),
  {
    modelValue: undefined,
    placeholder() {
      return today(getLocalTimeZone())
    },
    weekdayFormat: 'short',
  },
)
const emits = defineEmits<CalendarRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, placeholder: __, ...delegated } = props
  return delegated
})

const placeholder = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: today(getLocalTimeZone()),
}) as Ref<DateValue>

const selectedMonth = ref(placeholder.value.month?.toString() || '1')
const selectedYear = ref(
  placeholder.value.year?.toString() || new Date().getFullYear().toString(),
)

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const formatter = useDateFormatter('en')

const handleDateClick = (weekDate: DateValue) => {
  const isAfterMin = !props.minValue || weekDate.compare(props.minValue) >= 0
  const isBeforeMax = !props.maxValue || weekDate.compare(props.maxValue) <= 0

  if (placeholder && isAfterMin && isBeforeMax) {
    placeholder.value = weekDate
  }
}

watch(placeholder, newValue => {
  if (newValue) {
    selectedMonth.value = newValue.month?.toString() || '1'
    selectedYear.value =
      newValue.year?.toString() || new Date().getFullYear().toString()
  }
})

watch([selectedMonth, selectedYear], ([newMonth, newYear]) => {
  if (placeholder.value) {
    placeholder.value = placeholder.value.set({
      month: Number(newMonth),
      year: Number(newYear),
    })
  }
})
</script>

<template>
  <CalendarRoot
    v-slot="{ date, grid, weekDays }"
    v-model:placeholder="placeholder"
    v-bind="forwarded"
    :class="
      cn(
        '!rounded-base border-2 border-border dark:border-darkBorder bg-main p-3 font-bold shadow-light dark:shadow-dark w-[300px]',
        props.class,
      )
    "
  >
    <CalendarHeader>
      <CalendarHeading class="flex w-full items-center justify-between gap-2">
        <Select
          v-model="selectedMonth"
          @update:model-value="
            (v: string) => {
              if (placeholder) {
                placeholder.value = placeholder.value.set({ month: Number(v) })
              }
            }
          "
        >
          <SelectTrigger aria-label="Select month" class="w-[70%]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent class="max-h-[200px]">
            <SelectItem
              v-for="month in createYear({ dateObj: date })"
              :key="month.toString()"
              :value="month.month.toString()"
            >
              {{ formatter.custom(toDate(month), { month: 'long' }) }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          v-model="selectedYear"
          @update:model-value="
            (v: string) => {
              if (placeholder) {
                placeholder.value = placeholder.value.set({ year: Number(v) })
              }
            }
          "
        >
          <SelectTrigger aria-label="Select year" class="w-[30%]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent class="max-h-[200px]">
            <SelectItem
              v-for="yearValue in createDecade({
                dateObj: date,
                startIndex: -10,
                endIndex: 10,
              })"
              :key="yearValue.toString()"
              :value="yearValue.year.toString()"
            >
              {{ yearValue.year }}
            </SelectItem>
          </SelectContent>
        </Select>
      </CalendarHeading>
    </CalendarHeader>

    <div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
      <CalendarGrid v-for="month in grid" :key="month.value.toString()">
        <CalendarGridHead>
          <CalendarGridRow>
            <CalendarHeadCell v-for="day in weekDays" :key="day">
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody class="grid">
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="mt-2 w-full"
          >
            <CalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
            >
              <CalendarCellTrigger
                :day="weekDate"
                :month="month.value"
                @click="() => handleDateClick(weekDate)"
              />
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>
