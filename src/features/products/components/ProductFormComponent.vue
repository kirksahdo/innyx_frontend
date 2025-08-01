<template>
  <form @submit.prevent="">
    <div class="flex flex-col gap-4">
      <div>
        <label for="product-name" class="block text-sm font-medium text-gray-700">Nome</label>
        <input
          v-model="product.name"
          id="product-name"
          type="text"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <div>
        <label for="product-description" class="block text-sm font-medium text-gray-700"
          >Descrição</label
        >
        <textarea
          v-model="product.description"
          id="product-description"
          required
          rows="3"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        ></textarea>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="product-price" class="block text-sm font-medium text-gray-700">Preço</label>
          <input
            v-model.number="product.price"
            id="product-price"
            type="number"
            step="0.01"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label for="product-expires" class="block text-sm font-medium text-gray-700"
            >Data de Validade</label
          >
          <input
            v-model="product.expires_at"
            id="product-expires"
            type="date"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
      <div>
        <label for="product-category" class="block text-sm font-medium text-gray-700"
          >Categoria</label
        >
        <input
          v-model="product.category_name"
          id="product-category"
          type="text"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <div>
        <label for="product-image" class="block text-sm font-medium text-gray-700"
          >Imagem do Produto</label
        >
        <input
          id="product-image"
          type="file"
          accept="image/*"
          @change="handleImageUpload"
          required
          class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
        />
        <div v-if="product.image" class="mt-4">
          <p class="text-sm text-gray-600">Pré-visualização:</p>
          <img
            :src="product.image"
            alt="Pré-visualização da imagem"
            class="w-32 h-32 object-cover rounded-md mt-2"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ProductCreate } from '@/shared/models/product'

const product = ref<ProductCreate>({
  name: '',
  description: '',
  price: 0,
  expires_at: '',
  category_name: '',
  image: '',
})

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        product.value.image = e.target.result
      }
    }
    reader.readAsDataURL(file)
  }
}

defineExpose({
  product,
})
</script>
