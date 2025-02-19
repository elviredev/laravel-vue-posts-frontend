import "./style.css"
import 'vue-toast-notification/dist/theme-bootstrap.css'
import { createApp } from 'vue'
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ToastPlugin from "vue-toast-notification";
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config.js'
import '../formkit.theme.ts'
import App from "./App.vue"
import router from './router/index.ts'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(pinia)
app.use(plugin, defaultConfig(config))
app.use(ToastPlugin)

app.mount('#app')
