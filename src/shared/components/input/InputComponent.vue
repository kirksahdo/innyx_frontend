<template>
  <div class="w-full">
    <label :for="props.id" class="block text-sm font-medium leading-6 text-text">{{
      props.label
    }}</label>
    <div class="mt-2">
      <input
        :id="props.id"
        v-model="model"
        :type="props.type"
        :required="props.required"
        class="block w-full rounded-md border-0 py-1.5 text-textshadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  label: string
  id: string
  required?: boolean
  type?: HTMLInputElement['type']
}

const props = defineProps<Props>()
const model = defineModel<string>()
</script>
