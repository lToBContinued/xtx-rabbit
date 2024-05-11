// 管理购物车数据
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './userStore.js'
import {
  cartDelCartService,
  cartGetNewCartListService,
  cartInsertCartService
} from '@/apis/cart.js'

export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    // 购物车列表
    const cartList = ref([])

    // 获取最新购物车列表
    const updateNewList = async () => {
      const res = await cartGetNewCartListService()
      cartList.value = res.data.result
    }

    // 添加购物车
    const addCart = async (goods) => {
      if (isLogin.value) {
        // 登录之后的加入购物车逻辑
        const { skuId, count } = goods
        await cartInsertCartService({ skuId, count })
        await updateNewList()
      } else {
        // 通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
          // 已添加过 - count+1
          item.count++
        } else {
          // 没有添加过 - 直接push
          cartList.value.push(goods)
        }
      }
    }

    // 删除购物车
    const delCart = async (skuId) => {
      if (isLogin.value) {
        await cartDelCartService([skuId])
        await updateNewList()
      } else {
        // splice方法删除
        const idx = cartList.value.findIndex((item) => item.skuId === skuId)
        cartList.value.splice(idx, 1)
        // filter方法删除
        // cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
      }
    }

    // 清空购物车
    const clearCart = () => {
      cartList.value = []
    }

    // 单选功能
    const singleCheck = (skuId, selected) => {
      // 通过skuId找到要修改的对应项，然后把selected字段修改为传过来的值
      const item = cartList.value.find((item) => item.skuId === skuId)
      item.selected = selected
    }
    // 全选功能
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected))
    }

    // 计算属性--------------------------------------------------
    // 商品总数
    const allCount = computed(() => {
      return cartList.value.reduce((sum, item) => {
        return sum + item.count
      }, 0)
    })
    // 商品总价
    const allPrice = computed(() => {
      return cartList.value
        .reduce((sum, item) => {
          return sum + item.count * item.price
        }, 0)
        .toFixed(2)
    })
    // 是否全选
    const isAll = computed(() => {
      return cartList.value.every((item) => item.selected === true)
    })
    // 已选择数量
    const selectCount = computed(() => {
      return cartList.value
        .filter((item) => item.selected === true)
        .reduce((sum, item) => sum + item.count, 0)
    })
    // 已选择商品价格合计
    const selectPrice = computed(() => {
      return cartList.value
        .filter((item) => item.selected === true)
        .reduce((sum, item) => sum + item.count * item.price, 0)
        .toFixed(2)
    })

    return {
      cartList,
      addCart,
      delCart,
      allCount,
      allPrice,
      singleCheck,
      isAll,
      allCheck,
      selectCount,
      selectPrice,
      clearCart
    }
  },
  { persist: true }
)
