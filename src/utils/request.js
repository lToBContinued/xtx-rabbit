// axios 基础封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/userStore.js'
import router from '@/router'

const instance = axios.create({
  baseURL: 'https://apipc-xiaotuxian-front.itheima.net',
  timeout: 20000
})
// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  (error) => {
    const userStore = useUserStore()
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 统一错误提示
    ElMessage.error(error.response.data.msg)
    // 401 token失效处理
    if (error.response.status === 401) {
      userStore.removeUser()
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default instance
