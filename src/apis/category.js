// 获取二级分类列表
import request from '@/utils/request.js'

export const getSecondCategoryService = (id) => {
  return request({
    url: '/category',
    params: { id }
  })
}
