import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useIntersectionObserver } from '@vueuse/core'
// pinia持久化插件
import persist from 'pinia-plugin-persistedstate'
// 引入初始化样式文件
import '@/styles/common.scss'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia.use(persist))
app.use(router)

app.mount('#app')

// 定义全局指令
app.directive('img-lazy', {
  mounted(el, binding) {
    // el: 指令绑定的那个元素 img
    // binding: binding.value 指令等于号后面绑定的表达式的值 => 图片url
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 图片进入视口区域
        el.src = binding.value
      }
    })
  }
})
