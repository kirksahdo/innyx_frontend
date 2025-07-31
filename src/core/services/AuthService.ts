import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/shared/models/auth'
import api from '../config/api'
import type { User } from '@/shared/models/user'

export abstract class AuthService {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials)
    return response.data
  }

  static async register(credentials: RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/auth/register', credentials)
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
