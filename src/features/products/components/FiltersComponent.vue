<template>
  <div class="flex flex-col w-full md:flex-row justify-between items-center gap-4">
    <h1 class="text-2xl font-bold text-gray-800">Lista de Produtos</h1>
    <div class="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
      <input
        v-model="nameFilter"
        type="text"
        placeholder="Filtrar por nome..."
        class="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
      />
      <input
        v-model="descriptionFilter"
        type="text"
        placeholder="Filtrar por descrição..."
        class="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
      />
      <ButtonComponent type="button" @click="props.onSearch"> Pesquisar </ButtonComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/shared/components/button/ButtonComponent.vue'

interface Props {
  onSearch?: () => void
}

const props = defineProps<Props>()

const nameFilter = defineModel<string>('nameFilter')
const descriptionFilter = defineModel<string>('descriptionFilter')
</script>
