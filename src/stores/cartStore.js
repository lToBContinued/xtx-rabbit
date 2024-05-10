// 管理购物车数据
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    // 购物车列表
    const cartList = ref([])

    // 添加购物车
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

    // 删除购物车
    const delCart = (skuId) => {
      // splice方法删除
      const idx = cartList.value.findIndex((item) => item.skuId === skuId)
      cartList.value.splice(idx, 1)
      // filter方法删除
      // cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
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

    // 计算属性
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

    return {
      cartList,
      addCart,
      delCart,
      allCount,
      allPrice,
      singleCheck,
      isAll,
      allCheck
    }
  },
  { persist: true }
)
