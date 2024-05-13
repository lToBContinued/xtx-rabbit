import request from '@/utils/request.js'

export const payGetOrderService = (id) => {
  return request({
    url: `/member/order/${id}`
  })
}
