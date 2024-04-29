import request from '@/utils/request.js'

// 获取分类
export const layoutGetCategoryListService = () => {
  return request({ url: '/home/category/head' })
}
