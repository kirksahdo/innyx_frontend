<template>
  <div class="overflow-x-auto shadow-md rounded-lg h-full">
    <table class="max-md:hidden min-w-full h-full divide-y divide-gray-200">
      <thead class="bg-primary-600">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
          >
            Imagem
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
          >
            ID
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
          >
            Nome
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
          >
            Descrição
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
          >
            Preço
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
          >
            Validade
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
          >
            Categoria
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-if="props.products.length === 0">
          <td colspan="7" class="px-6 py-4 text-center text-gray-500">
            Nenhum produto encontrado.
          </td>
        </tr>
        <tr
          v-for="product in props.products"
          :key="product.id"
          class="hover:bg-primary-50 transition-colors duration-200"
          @click="handleRowClick(product)"
        >
          <td class="px-6 py-4 whitespace-nowrap">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-10 h-10 rounded-full object-cover"
            />
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {{ product.id }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ product.name }}</td>
          <td class="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
            {{ product.description }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {{ formatCurrency(product.price) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
            {{ formatDate(product.expires_at) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span
              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800"
            >
              {{ product.category_name }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="block md:hidden">
      <div
        v-for="product in props.products"
        :key="product.id"
        class="bg-white shadow rounded-lg p-4 mb-4 cursor-pointer hover:bg-primary-50 transition-colors duration-200"
        @click="handleRowClick(product)"
      >
        <div class="flex items-center gap-4">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-16 h-16 rounded-full object-cover"
          />
          <div class="flex flex-col">
            <h3 class="text-lg font-semibold text-gray-800">{{ product.name }}</h3>
            <p class="text-sm text-gray-600">{{ product.description }}</p>
            <p class="text-sm text-gray-800">{{ formatCurrency(product.price) }}</p>
            <p class="text-xs text-gray-500">Validade: {{ formatDate(product.expires_at) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/shared/models/product'
import { formatCurrency, formatDate } from '@/shared/pipes/date'

interface Props {
  products: Product[]
}

const props = defineProps<Props>()

const emit = defineEmits(['edit-product'])

const handleRowClick = (product: Product) => {
  emit('edit-product', product)
}
</script>
