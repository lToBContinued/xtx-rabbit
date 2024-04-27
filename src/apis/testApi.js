import request from '@/utils/request.js'

export const testApi = () => {
  return request({
    url: 'home/category/head'
  })
}
