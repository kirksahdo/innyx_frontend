<template>
  <button
    :type="props.type"
    class="flex w-full cursor-pointer justify-center rounded-md bg-primary-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
    :class="{ 'opacity-50 cursor-not-allowed': props.disabled }"
    :disabled="props.disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  type: HTMLButtonElement['type']
  disabled?: boolean
}

const props = defineProps<Props>()
</script>
