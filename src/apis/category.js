import request from '@/utils/request.js'

// 获取二级分类列表
export const getSecondCategoryService = (id) => {
  return request({
    url: '/category',
    params: { id }
  })
}

// 获取二级分类列表数据
export const getCategoryFilterService = (id) => {
  return request({
    url: '/category/sub/filter',
    params: { id }
  })
}

// 获取商品分类列表
export const getGoodsCategoryService = (data) => {
  return request({
    url: '/category/goods/temporary',
    method: 'POST',
    data
  })
}
