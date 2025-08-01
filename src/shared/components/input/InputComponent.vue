<template>
  <div class="w-full">
    <label :for="props.id" class="block text-sm font-medium leading-6 text-text">{{
      props.label
    }}</label>
    <div class="mt-2">
      <input
        v-if="props.as === 'input'"
        :id="props.id"
        v-model="model"
        :type="props.type"
        :required="props.required"
        :step="props.step"
        class="block w-full rounded-md border-0 py-1.5 text-textshadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <textarea
        v-else-if="props.as === 'textarea'"
        :id="props.id"
        v-model="model"
        :required="props.required"
        rows="3"
        class="block w-full rounded-md border-0 py-1.5 text-textshadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      ></textarea>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
interface Props {
  label: string
  id: string
  required?: boolean
  type?: HTMLInputElement['type']
  as?: 'input' | 'textarea'
  step?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  as: 'input',
  type: 'text',
  required: false,
})
const model = defineModel<string | number>()
</script>
