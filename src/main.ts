import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/global.css'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { useAuth } from './shared/composables/useAuth'

const { checkAuthStatus } = useAuth()

const app = createApp(App)

const queryClient = new QueryClient()

await checkAuthStatus()

app.use(router)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
