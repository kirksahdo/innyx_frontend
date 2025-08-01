import type { RouteRecordRaw } from 'vue-router'

const productRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/shared/components/layout/LayoutComponent.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
      },
    ],
  },
]

export default productRoutes
