import type { RouteRecordRaw } from 'vue-router'
import { useAuth } from '@/shared/composables/useAuth'

const { isAuthenticated } = useAuth()

const protectedRoutes: Array<RouteRecordRaw> = isAuthenticated && [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/features/products/views/HomeView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]

export default protectedRoutes
