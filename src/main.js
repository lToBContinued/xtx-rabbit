import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import persist from 'pinia-plugin-persistedstate' // pinia持久化插件
import '@/styles/common.scss' // 引入初始化样式文件
import { lazyPlugin } from '@/directives/index.js' // 引入懒加载指令插件

const pinia = createPinia()
const app = createApp(App)

app.use(pinia.use(persist))
app.use(router)
app.use(lazyPlugin)
app.mount('#app')
