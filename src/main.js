import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// pinia持久化插件
import persist from 'pinia-plugin-persistedstate'
// 引入初始化样式文件
import '@/assets/common.scss'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia.use(persist))
app.use(router)

app.mount('#app')
