import request from '@/utils/request.js'

// 获取商品详情
export const getDetailService = (id) => {
  return request({
    url: '/goods',
    params: { id }
  })
}

// 获取热榜商品
export const getHotGoodsService = ({ id, type, limit = 3 }) => {
  return request({
    url: '/goods/hot',
    params: {
      id,
      type,
      limit
    }
  })
}
