import request from '@/utils/request.js'

// 加入购物车
export const cartInsertCartService = ({ skuId, count }) => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}

// 获取最新购物车列表
export const cartGetNewCartListService = () => {
  return request({
    url: '/member/cart'
  })
}

// 删除购物车
export const cartDelCartService = (ids) => {
  return request({
    url: '/member/cart',
    method: 'DELETE',
    data: { ids }
  })
}

// 合并购物车
export const cartMergeCartService = (data) => {
  return request({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}
