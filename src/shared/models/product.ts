export interface Product {
  id: string
  name: string
  description: string
  price: number
  expires_at: string
  category_name: string
  image: string
}

export interface GetAllProductsRequest {
  page?: number
  per_page?: number
  name?: string
  description?: string
}

export interface GetAllProductsResponse {
  current_page: number
  data: Product[]
  last_page: number
  total: number
  per_page: number
}

export type ProductCreate = Omit<Product, 'id'>

export interface CreateProductRequest {
  product: ProductCreate
}

export type ProductUpdate = Partial<ProductCreate>

export interface UpdateProductRequest {
  product: ProductUpdate
}
