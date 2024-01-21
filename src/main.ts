import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import {VueFire} from 'vuefire'
import {firebaseApp} from '@/firebase'
// TODO firebase deploy --only hosting FOR DEPLOY

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueFire, {
  firebaseApp
})

app.config.globalProperties.poxApi = import.meta.env.VITE_POXAPI

app.mount('#app')

// Manage Theme
const appDiv = document.getElementById('app')
appDiv?.setAttribute('data-theme', '')
