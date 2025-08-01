import { ref, computed, onMounted } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { ProductsService } from '@/core/services/ProductsService'
import type { GetAllProductsRequest, Product } from '@/shared/models/product'

export function useProducts() {
  const products = ref<Product[]>([])
  const nameFilter = ref('')
  const descriptionFilter = ref('')
  const totalProducts = ref(0)
  const currentPage = ref(1)
  const itemsPerPage = ref(5)
  const totalPages = ref(0)

  const showing = computed(() => products.value.length)

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

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
      getProducts()
    }
  }

  const onSearch = () => {
    currentPage.value = 1
    getProducts()
  }

  onMounted(getProducts)

  return {
    products,
    nameFilter,
    descriptionFilter,
    totalProducts,
    currentPage,
    totalPages,
    showing,
    isLoading: getProductMutation.isPending,
    changePage,
    onSearch,
    getProducts,
  }
}
