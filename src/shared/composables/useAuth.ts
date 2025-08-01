import type { LoginRequest } from './../models/auth'
import { AuthService } from '@/core/services/AuthService'
import type { User } from '@/shared/models/user'
import { computed, ref } from 'vue'

const user = ref<User | null>(null)
const isAuthenticated = computed(() => !!user.value)
const isAuthCheckAttemped = ref(false)

export const useAuth = () => {
  const checkAuthStatus = async () => {
    if (isAuthCheckAttemped.value) return
    isAuthCheckAttemped.value = true
    try {
      const response = await AuthService.getProfile()
      user.value = response
    } catch (error) {
      user.value = null
      console.error('Failed to fetch user profile:', error)
    }
  }

  const login = async (credentials: LoginRequest) => {
    const userData = await AuthService.login(credentials)
    user.value = userData.user
  }

  const logout = async () => {
    await AuthService.logout()
    user.value = null
  }

  return {
    user,
    isAuthenticated,
    isAuthCheckAttemped,
    checkAuthStatus,
    login,
    logout,
  }
}
