import type { User } from './user'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface RegisterResponse {
  message: string
  access_token: string
}
