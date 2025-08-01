<template>
  <form @submit.prevent="">
    <div class="flex flex-col gap-4">
      <InputComponent id="product-name" v-model="product.name" label="Nome" required type="text" />
      <InputComponent
        id="product-description"
        v-model="product.description"
        label="Descrição"
        as="textarea"
        required
      />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputComponent
          id="product-price"
          v-model.number="product.price"
          label="Preço"
          type="number"
          step="0.01"
          required
        />
        <InputComponent
          id="product-expires"
          v-model="product.expires_at"
          label="Data de Validade"
          type="date"
          required
        />
      </div>
      <InputComponent
        id="product-category"
        v-model="product.category_name"
        label="Categoria"
        type="text"
        required
      />
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
import { ref, watch } from 'vue'
import type { Product, ProductCreate } from '@/shared/models/product'
import InputComponent from '@/shared/components/input/InputComponent.vue'

const props = defineProps<{
  productData?: Product | null
}>()

const product = ref<ProductCreate>({
  name: '',
  description: '',
  price: 0,
  expires_at: '',
  category_name: '',
  image: '',
})

watch(
  () => props.productData,
  (newVal) => {
    if (newVal) {
      product.value = {
        name: newVal.name,
        description: newVal.description,
        price: newVal.price,
        expires_at: newVal.expires_at.split('T')[0],
        category_name: newVal.category_name,
        image: newVal.image,
      }
    } else {
      product.value = {
        name: '',
        description: '',
        price: 0,
        expires_at: '',
        category_name: '',
        image: '',
      }
    }
  },
  { immediate: true },
)

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

defineExpose({ product })
</script>
