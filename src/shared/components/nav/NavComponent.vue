<template>
  <nav class="bg-primary-600 w-full z-20 top-0 start-0 border-b border-gray-200">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Innyx</span
        >
      </a>
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <ButtonComponent class="gap-2" type="button" :onClick="handleSignout">
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
            />
          </svg>

          <span class="max-sm:hidden">Deslogar</span>
        </ButtonComponent>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-sticky"
      >
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0"
        >
          <li>
            <a
              href="/"
              class="block py-2 px-3 text-white rounded-sm md:bg-transparent"
              aria-current="page"
              >Products</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import ButtonComponent from '../button/ButtonComponent.vue'
import { useAuth } from '@/shared/composables/useAuth'
import { useRouter } from 'vue-router'
import { useToasts } from '@/shared/composables/useToasts'

const { logout } = useAuth()
const { addToast } = useToasts()
const router = useRouter()

const { mutate } = useMutation({
  mutationFn: logout,
  onSuccess: () => {
    addToast({
      message: 'Você deslogou com sucesso!',
      type: 'success',
    })
    router.push('/login')
  },
  onError: (error) => {
    addToast({
      message: 'Erro ao deslogar! ' + error.message,
      type: 'error',
    })
  },
})

const handleSignout = () => {
  mutate()
}
</script>
