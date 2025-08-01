import api from '../config/api'
import {
  type GetAllProductsResponse,
  type GetAllProductsRequest,
  type CreateProductRequest,
  type UpdateProductRequest,
  type Product,
} from '@/shared/models/product'

export abstract class ProductsService {
  static async getAll({
    description = '',
    name = '',
    page = 1,
    per_page = 5,
  }: GetAllProductsRequest): Promise<GetAllProductsResponse> {
    const response = await api.get<GetAllProductsResponse>(
      `/products?description=${description}&name=${name}&page=${page}&per_page=${per_page}`,
    )
    return response.data
  }

  static async create({ product }: CreateProductRequest): Promise<Product> {
    const response = await api.post<Product>('/products', product)
    return response.data
  }

  static async update(id: string, { product }: UpdateProductRequest): Promise<Product> {
    const response = await api.put<Product>(`/products/${id}`, product)
    return response.data
  }

  static async delete(id: string): Promise<void> {
    await api.delete(`/products/${id}`)
  }
}
