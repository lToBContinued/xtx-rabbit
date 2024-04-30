// 分类数据业务相关代码
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { getSecondCategoryService } from '@/apis/category.js'

export const useCategory = () => {
  // 面包屑导航
  const route = useRoute()
  const SecondCategoryList = ref({})
  const getSecondCategory = async (id = route.params.id) => {
    // id使用默认参数的形式，初次进入页面默认渲染
    const res = await getSecondCategoryService(id)
    SecondCategoryList.value = res.data.result
  }
  getSecondCategory()

  // 在路由参数变化的时候，把分类接口数据重新发送
  onBeforeRouteUpdate((to) => {
    getSecondCategory(to.params.id)
  })

  return {
    SecondCategoryList
  }
}
