<template>
  <div class="fixed top-0 right-0 z-50 flex flex-col gap-2 p-4">
    <ToastComponent
      v-for="toast in toasts"
      :key="toast.id"
      :type="toast.type"
      :onClose="() => removeToast(toast.id)"
    >
      {{ toast.message }}
    </ToastComponent>
  </div>
  <slot></slot>
</template>

<script setup lang="ts">
import { useToasts } from '@/shared/composables/useToasts'
import ToastComponent from './ToastComponent.vue'

const { toasts, removeToast } = useToasts()
</script>
