// 管理用户数据相关
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userLoginService } from '@/apis/user.js'

export const useUserStore = defineStore(
  'user',
  () => {
    // 定义管理用户数据的state
    const userInfo = ref({})
    // 定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
      const res = await userLoginService({ account, password })
      userInfo.value = res.data.result
    }
    // 用户退出登录
    const removeUser = () => {
      userInfo.value = {}
    }
    // 以对象的格式把state和action return
    return {
      userInfo,
      getUserInfo,
      removeUser
    }
  },
  { persist: true }
)