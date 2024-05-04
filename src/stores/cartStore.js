// 管理购物车数据
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    // 购物车列表
    const cartList = ref([])
    // 添加购物车操作
    const addCart = (goods) => {
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
    return {
      cartList,
      addCart
    }
  },
  { persist: true }
)
