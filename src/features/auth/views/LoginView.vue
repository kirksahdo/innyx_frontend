<script setup lang="ts">
import { reactive } from 'vue'
import AuthLayout from '../components/AuthLayout.vue'
import InputComponent from '@/shared/components/input/InputComponent.vue'
import ButtonComponent from '@/shared/components/button/ButtonComponent.vue'
import { useMutation } from '@tanstack/vue-query'
import { AuthService } from '@/core/services/AuthService'
import type { LoginRequest } from '@/shared/models/auth'

const login = reactive({
  email: '',
  password: '',
})

const { mutate } = useMutation({
  mutationFn: (credentials: LoginRequest) => AuthService.login(credentials),
  onSuccess: (res) => {
    console.log(res)
  },
  onError: (err: Error) => {
    console.error('Login failed:', err.message)
  },
})

const handleSubmit = (event: Event) => {
  event.preventDefault()
  mutate(login)
}
</script>

<template>
  <AuthLayout>
    <template #title>Faça login em sua conta</template>

    <form class="w-full flex flex-col gap-5" @submit="handleSubmit">
      <InputComponent
        id="email"
        label="Endereço de email"
        v-model="login.email"
        type="email"
        required
      />

      <InputComponent
        id="password"
        label="Senha"
        v-model="login.password"
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
