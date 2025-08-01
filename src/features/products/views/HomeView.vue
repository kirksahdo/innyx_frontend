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
        <ButtonComponent
          type="button"
          :onClick="
            () => {
              showProductModal = true
            }
          "
        >
          Criar Produto
        </ButtonComponent>
      </div>

      <ProductTableComponent :products="products" />

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
    title="Criar Novo Produto"
    :show="showProductModal"
    @close="showProductModal = false"
  >
    <ProductFormComponent ref="productForm" />
    <template #actions>
      <ButtonComponent type="button" @click="handleProductSubmit"> Salvar Produto </ButtonComponent
      >>
    </template>
  </ModalComponent>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ContainerComponent from '@/shared/components/container/ContainerComponent.vue'
import FiltersComponent from '../components/FiltersComponent.vue'
import type { GetAllProductsRequest, Product } from '@/shared/models/product'
import ProductTableComponent from '../components/ProductTableComponent.vue'
import PaginationComponent from '../components/PaginationComponent.vue'
import { ProductsService } from '@/core/services/ProductsService'
import ModalComponent from '@/shared/components/modal/ModalComponent.vue'
import ProductFormComponent from '../components/ProductFormComponent.vue'
import ButtonComponent from '@/shared/components/button/ButtonComponent.vue'
import { useMutation } from '@tanstack/vue-query'
import { useToasts } from '@/shared/composables/useToasts'
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage'
import { computed } from 'vue'

const showProductModal = ref(false)
const { addToast } = useToasts()

onMounted(() => {
  getProducts()
})

const getProductMutation = useMutation({
  mutationFn: (filters: GetAllProductsRequest) => ProductsService.getAll(filters),
  onSuccess: (res) => {
    products.value = res.data
    itemsPerPage.value = res.per_page
    currentPage.value = res.current_page
    totalPages.value = Math.ceil(res.total / res.per_page)
    totalProducts.value = res.total
  },
  onError: (err) => {
    console.error(err)
  },
})

const getProducts = () => {
  const filters: GetAllProductsRequest = {
    name: nameFilter.value,
    description: descriptionFilter.value,
    page: currentPage.value,
    per_page: itemsPerPage.value,
  }
  getProductMutation.mutate(filters)
}

const products = ref<Product[]>([])

const nameFilter = ref('')
const descriptionFilter = ref('')

const totalProducts = ref(0)
const currentPage = ref(1)
const itemsPerPage = ref(5)
const totalPages = ref(0)
const showing = computed(() => products.value.length)

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    getProducts()
  }
}

const productForm = ref<InstanceType<typeof ProductFormComponent> | null>(null)

const createProductMutation = useMutation({
  mutationFn: ProductsService.create,
  onSuccess: () => {
    addToast({ message: 'Produto criado com sucesso!', type: 'success' })
    showProductModal.value = false
    resetPagination()
    getProducts()
  },
  onError: (err) => {
    addToast({ message: getApiErrorMessage(err), type: 'error' })
  },
})

const handleProductSubmit = () => {
  if (productForm.value) {
    createProductMutation.mutate({ product: productForm.value.product })
  }
}

const resetPagination = () => {
  currentPage.value = 1
  itemsPerPage.value = 5
  totalPages.value = 0
  totalProducts.value = 0
}

const onSearch = () => {
  resetPagination()
  getProducts()
}
</script>
