import request from '@/utils/request.js'

export const checkoutGetCheckInfoService = () => {
  return request({
    url: '/member/order/pre'
  })
}
