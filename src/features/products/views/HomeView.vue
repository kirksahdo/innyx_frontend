<template>
  <ContainerComponent>
    <div class="size-full flex flex-col p-5 gap-6 bg-gray-50 rounded-lg shadow-sm">
      <div class="flex justify-between items-start">
        <FiltersComponent
          v-model:description-filter="descriptionFilter"
          v-model:name-filter="nameFilter"
          :onSearch="onSearch"
        />
      </div>
      <div class="flex w-40">
        <ButtonComponent type="button" @click="openCreateModal"> Criar Produto </ButtonComponent>
      </div>

      <ProductTableComponent :products="products" @edit-product="openEditModal" />

      <PaginationComponent
        :changePage="changePage"
        :currentPage="currentPage"
        :totalPages="totalPages"
        :totalProducts="totalProducts"
        :showing="showing"
      />
    </div>
  </ContainerComponent>

  <ModalComponent
    :title="selectedProduct ? 'Editar Produto' : 'Criar Novo Produto'"
    :show="isModalOpen"
    @close="closeModal"
  >
    <ProductFormComponent ref="productForm" :product-data="selectedProduct" />
    <template #actions>
      <div class="flex justify-end gap-2 w-full">
        <ButtonComponent
          v-if="selectedProduct"
          type="button"
          variant="danger"
          @click="handleDelete"
          :disabled="isDeletingProduct"
          notFull
          danger
        >
          {{ isDeletingProduct ? 'Excluindo...' : 'Excluir Produto' }}
        </ButtonComponent>
        <ButtonComponent
          type="button"
          @click="handleSubmit"
          :disabled="isCreatingProduct || isUpdatingProduct"
          notFull
        >
          {{
            isCreatingProduct || isUpdatingProduct
              ? 'Salvando...'
              : selectedProduct
                ? 'Salvar Alterações'
                : 'Salvar Produto'
          }}
        </ButtonComponent>
      </div>
    </template>
  </ModalComponent>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ContainerComponent from '@/shared/components/container/ContainerComponent.vue'
import FiltersComponent from '../components/FiltersComponent.vue'
import type { Product } from '@/shared/models/product'
import ProductTableComponent from '../components/ProductTableComponent.vue'
import PaginationComponent from '../components/PaginationComponent.vue'
import ModalComponent from '@/shared/components/modal/ModalComponent.vue'
import ProductFormComponent from '../components/ProductFormComponent.vue'
import ButtonComponent from '@/shared/components/button/ButtonComponent.vue'
import { useProducts } from '../composables/useProducts'
import { useProductMutations } from '../composables/useProductMutations'

const {
  products,
  nameFilter,
  descriptionFilter,
  totalProducts,
  currentPage,
  totalPages,
  showing,
  changePage,
  onSearch,
  getProducts,
} = useProducts()

const isModalOpen = ref(false)
const selectedProduct = ref<Product | null>(null)
const productForm = ref<InstanceType<typeof ProductFormComponent> | null>(null)

const {
  createProduct,
  updateProduct,
  deleteProduct,
  isCreatingProduct,
  isUpdatingProduct,
  isDeletingProduct,
} = useProductMutations({
  onSuccess: () => {
    closeModal()
    if (selectedProduct.value) {
      getProducts()
    } else {
      onSearch()
    }
  },
})

const openCreateModal = () => {
  selectedProduct.value = null
  isModalOpen.value = true
}

const openEditModal = (product: Product) => {
  selectedProduct.value = product
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedProduct.value = null
}

const handleSubmit = () => {
  if (productForm.value) {
    const productData = productForm.value.product
    if (selectedProduct.value) {
      updateProduct({ id: selectedProduct.value.id, product: productData })
    } else {
      createProduct({ product: productData })
    }
  }
}

const handleDelete = () => {
  if (selectedProduct.value) {
    deleteProduct(selectedProduct.value.id)
  }
}
</script>
