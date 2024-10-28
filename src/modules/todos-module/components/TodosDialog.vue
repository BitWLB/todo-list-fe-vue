<script setup lang="ts">
import { toRefs, watch } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog'
import { Button } from '@/core/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select'
import { Textarea } from '@/core/components/ui/textarea'
import { Input } from '@/core/components/ui/input'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { Icon } from '@iconify/vue'
import { useTodosStore } from '@/modules/todos-module/store/todosStore'
import { todoFormSchema } from '@/modules/todos-module/schema/todosSchema'

const todosStore = useTodosStore()
const { dialogTodos, isEdit, form } = toRefs(todosStore)
const { setDialog, submitForm, todosPriorities } = todosStore

const { isFieldDirty, handleSubmit, setValues, resetForm } = useForm({
  validationSchema: toTypedSchema(todoFormSchema),
  initialValues: form.value,
})

watch(
  () => form.value,
  newValue => {
    if (newValue) {
      setValues(newValue)
    } else {
      resetForm()
    }
  },
  { deep: true },
)

const onSubmit = handleSubmit(async values => {
  await submitForm(values)
  setDialog(false)
})

function handleDialog(value: boolean) {
  setDialog(value)
}
</script>

<template>
  <Dialog :open="dialogTodos" @update:open="handleDialog">
    <DialogTrigger as-child>
      <Button variant="default" class="space-x-2 justify-center">
        <Icon icon="ci:list-add" class="h-5 w-5" />

        <span class="text-text"> Add Todo </span>
      </Button>
    </DialogTrigger>

    <DialogScrollContent class="w-11/12 sm:max-w-[450px] space-y-4">
      <DialogHeader>
        <DialogTitle> {{ isEdit ? `Edit` : `Add` }} Todo </DialogTitle>

        <DialogDescription>
          {{ isEdit ? `Edit` : `Add` }} your todo here. Click save when you're
          done.
        </DialogDescription>
      </DialogHeader>

      <form class="w-full space-y-6" @submit="onSubmit">
        <FormField
          v-slot="{ componentField }"
          name="title"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem v-auto-animate>
            <FormLabel> Title </FormLabel>

            <FormControl>
              <Input
                type="text"
                placeholder="Do homework"
                v-bind="componentField"
              />
            </FormControl>

            <FormDescription> Type in the title of the todo. </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="priority"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem v-auto-animate>
            <FormLabel>Priority</FormLabel>

            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger>
                  <SelectValue placeholder="Select a Priority" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>List Priority</SelectLabel>
                    <SelectItem
                      v-for="data in todosPriorities"
                      :key="data.id"
                      :value="String(data.id)"
                    >
                      {{ data.description }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>

            <FormDescription>
              Select one from the list of available priorities.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="description"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem>
            <FormLabel>Description</FormLabel>

            <FormControl>
              <Textarea
                placeholder="Do mathematics homework"
                class="resize-y max-h-60"
                v-bind="componentField"
              />
            </FormControl>

            <FormDescription>
              Type in the description of the todo
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter>
          <Button type="submit"> Save </Button>
        </DialogFooter>
      </form>
    </DialogScrollContent>
  </Dialog>
</template>
