import request from '@/utils/request.js'

export const checkoutGetCheckInfoService = () => {
  return request({
    url: '/member/order/pre'
  })
}

// 创建订单
export const createOrderService = (data) => {
  return request({
    url: '/member/order',
    method: 'POST',
    data
  })
}
