import request from '@/utils/request.js'

export const orderGetOrderList = (params) => {
  return request({
    url: '/member/order',
    params
  })
}
