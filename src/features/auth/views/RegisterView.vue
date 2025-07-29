<script setup lang="ts">
import AuthLayout from '../components/AuthLayout.vue'
import InputComponent from '@/shared/components/input/InputComponent.vue'
import ButtonComponent from '@/shared/components/button/ButtonComponent.vue'
import { reactive } from 'vue'

const register = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const handleSubmit = (event: Event) => {
  event.preventDefault()
  console.log('Registering with:', register)
}
</script>

<template>
  <AuthLayout>
    <template #title>Crie a sua conta</template>

    <form class="w-full flex flex-col gap-5" @submit="handleSubmit">
      <InputComponent id="name" label="Nome" v-model="register.name" type="text" required />

      <InputComponent
        id="email"
        label="Endereço de email"
        v-model="register.email"
        type="email"
        required
      />

      <InputComponent
        id="password"
        label="Senha"
        v-model="register.password"
        type="password"
        required
      />

      <InputComponent
        id="confirm-password"
        label="Confirme a senha"
        v-model="register.confirmPassword"
        type="password"
        required
      />

      <ButtonComponent class="mt-6" type="submit"> Registrar </ButtonComponent>

      <p class="mt-4 text-center text-sm text-text">
        Já tem uma conta?
        <a href="/login" class="text-primary-500 hover:underline">Entrar</a>
      </p>
    </form>
  </AuthLayout>
</template>
