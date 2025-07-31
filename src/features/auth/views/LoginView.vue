<script setup lang="ts">
import { reactive } from 'vue'
import AuthLayout from '../components/AuthLayout.vue'
import InputComponent from '@/shared/components/input/InputComponent.vue'
import ButtonComponent from '@/shared/components/button/ButtonComponent.vue'
import { useMutation } from '@tanstack/vue-query'
import type { LoginRequest } from '@/shared/models/auth'
import { useToasts } from '@/shared/composables/useToasts'
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage'
import { useRouter } from 'vue-router'
import { useAuth } from '@/shared/composables/useAuth'

const credentials = reactive({
  email: '',
  password: '',
})

const { addToast } = useToasts()
const router = useRouter()
const { login } = useAuth()

const { mutate } = useMutation({
  mutationFn: (credentials: LoginRequest) => login(credentials),
  onSuccess: (res) => {
    addToast({ message: 'Login bem-sucedido!', type: 'success' })
    router.push({ name: 'home' })
    console.log(res)
  },
  onError: (err) => {
    console.log(err)
    addToast({ message: getApiErrorMessage(err), type: 'error' })
  },
})

const handleSubmit = (event: Event) => {
  event.preventDefault()
  mutate(credentials)
}
</script>

<template>
  <AuthLayout>
    <template #title>Faça login em sua conta</template>

    <form class="w-full flex flex-col gap-5" @submit="handleSubmit">
      <InputComponent
        id="email"
        label="Endereço de email"
        v-model="credentials.email"
        type="email"
        required
      />

      <InputComponent
        id="password"
        label="Senha"
        v-model="credentials.password"
        type="password"
        required
      />

      <ButtonComponent class="mt-6" type="submit"> Entrar </ButtonComponent>

      <p class="mt-4 text-center text-sm text-text">
        Não tem uma conta?
        <a href="/register" class="text-primary-500 hover:underline">Registrar</a>
      </p>
    </form>
  </AuthLayout>
</template>
