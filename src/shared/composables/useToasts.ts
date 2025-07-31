import { ref } from 'vue'

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'warning'
}

const toasts = ref<Toast[]>([])

export const useToasts = () => {
  const addToast = (toast: Omit<Toast, 'id'>) => {
    const toastWithId = { ...toast, id: new Date().getTime() }
    toasts.value.push(toastWithId)
    setTimeout(() => removeToast(toastWithId.id), 5000)
  }

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  return {
    toasts,
    addToast,
    removeToast,
  }
}
