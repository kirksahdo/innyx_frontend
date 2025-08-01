<template>
  <button
    :type="props.type"
    class="flex cursor-pointer justify-center items-center rounded-md bg-primary-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 gap-2"
    :class="{
      'opacity-50 cursor-not-allowed': props.disabled,
      'w-full': !props.notFull,
      'bg-red-500 hover:bg-red-600': props.danger,
    }"
    :disabled="props.disabled"
    @click="() => props.onClick?.()"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  type: HTMLButtonElement['type']
  disabled?: boolean
  onClick?: () => void
  notFull?: boolean
  danger?: boolean
}

const props = defineProps<Props>()
</script>
