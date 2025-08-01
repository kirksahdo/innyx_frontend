import api from '../config/api'
import type { User } from '@/shared/models/user'
import {
  type GetAllProductsResponse,
  type GetAllProductsRequest,
  type CreateProductRequest,
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

  static async create(request: CreateProductRequest) {
    const response = await api.post('/products', { ...request.product })
    return response.data
  }

  static async getProfile(): Promise<User> {
    const response = await api.get<User>('/auth/me')
    return response.data
  }

  static async logout(): Promise<void> {
    await api.post('/auth/logout')
  }
}
