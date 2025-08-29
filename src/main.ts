// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css' // Tailwind

const app = createApp(App)

app.use(createPinia()) // 👈 register store
app.use(router)

app.mount('#app')
