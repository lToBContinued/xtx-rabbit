import { defineStore } from 'pinia'
import { ref } from 'vue'
import { layoutGetCategoryListService } from '@/apis/layout.js'

// 导航列表数据管理
export const useCategoryStore = defineStore('category', () => {
  // 商品分类列表
  const categoryList = ref([])

  // action 获取分类列表
  const getCategoryList = async () => {
    const res = await layoutGetCategoryListService()
    categoryList.value = res.data.result
    console.log(categoryList.value)
  }

  return {
    categoryList,
    getCategoryList
  }
})
