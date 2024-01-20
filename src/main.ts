import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { VueFire } from 'vuefire'
import { firebaseApp } from '@/firebase'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueFire, {
  firebaseApp
})
app.use(ToastPlugin)

app.config.globalProperties.poxApi = import.meta.env.VITE_POXAPI

app.mount('#app')

// Manage Theme
const appDiv = document.getElementById('app')
appDiv?.setAttribute('data-theme', '')
