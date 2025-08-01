import { useMutation } from '@tanstack/vue-query'
import { ProductsService } from '@/core/services/ProductsService'
import { useToasts } from '@/shared/composables/useToasts'
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage'
import type { ProductCreate } from '@/shared/models/product'

export function useProductMutations(options: { onSuccess: () => void }) {
  const { addToast } = useToasts()

  const onDefaultSuccess = (message: string) => {
    addToast({ message, type: 'success' })
    options.onSuccess()
  }

  const onDefaultError = (err: unknown) => {
    addToast({ message: getApiErrorMessage(err), type: 'error' })
  }

  const createProductMutation = useMutation({
    mutationFn: ProductsService.create,
    onSuccess: () => onDefaultSuccess('Produto criado com sucesso!'),
    onError: onDefaultError,
  })

  const updateProductMutation = useMutation({
    mutationFn: (data: { id: string; product: ProductCreate }) =>
      ProductsService.update(data.id, { product: data.product }),
    onSuccess: () => onDefaultSuccess('Produto atualizado com sucesso!'),
    onError: onDefaultError,
  })

  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => ProductsService.delete(id),
    onSuccess: () => onDefaultSuccess('Produto excluído com sucesso!'),
    onError: onDefaultError,
  })

  return {
    createProduct: createProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
    isCreatingProduct: createProductMutation.isPending,
    isUpdatingProduct: updateProductMutation.isPending,
    isDeletingProduct: deleteProductMutation.isPending,
  }
}
