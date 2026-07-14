import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import '@/styles/main.scss'
import { useAppStore } from '@/stores/appStore'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

const store = useAppStore()
store.loadFromStorage()

app.use(router)
app.mount('#app')