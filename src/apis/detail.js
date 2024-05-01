import request from '@/utils/request.js'

export const getDetailService = (id) => {
  return request({
    url: '/goods',
    params: { id }
  })
}
