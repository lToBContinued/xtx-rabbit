import request from '@/utils/request.js'

export const userLoginService = ({ account, password }) => {
  return request({
    url: 'login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}
