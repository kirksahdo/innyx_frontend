import type { LoginRequest } from './../models/auth'
import { AuthService } from '@/core/services/AuthService'
import type { User } from '@/shared/models/user'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const user = ref<User | null>(null)
const isAuthenticated = computed(() => !!user.value)
const isAuthCheckAttemped = ref(false)

export const useAuth = () => {
  const router = useRouter()

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
    try {
      await AuthService.logout()
    } finally {
      user.value = null
      await router.push({ name: 'login' })
    }
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
