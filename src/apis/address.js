import request from '@/utils/request.js'

// 获取收货地址
export const addressGetAddressListService = () => {
  return request({
    url: '/member/address'
  })
}

// 添加地址
export const addressAddAddressService = (data) => {
  return request({
    url: '/member/address',
    method: 'post',
    data
  })
}

// 删除收货地址
export const addressDelAddressService = (id) => {
  return request({
    url: `/member/address/${id}`,
    method: 'DELETE'
  })
}

// 修改收货地址
export const addressChangeAddressService = (data, id) => {
  return request({
    url: `/member/address/${id}`,
    method: 'PUT',
    data
  })
}
