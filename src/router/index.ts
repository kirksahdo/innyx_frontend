import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '../features/auth/router'
import protectedRoutes from './protectedRoutes'
import { useAuth } from '@/shared/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...authRoutes, ...protectedRoutes],
})

const { isAuthenticated } = useAuth()

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  if (requiresAuth && !isAuthenticated.value) {
    next({ name: 'login' })
  } else if (to.meta.isGuest && isAuthenticated.value) {
    next({ name: 'home' })
  } else if (!to.meta.isGuest && !to.meta.requiresAuth) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
