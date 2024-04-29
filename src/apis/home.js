import request from '@/utils/request.js'

// 获取banner图片
export const getBannerPicService = (distributionSite) => {
  return request({
    url: '/home/banner',
    params: { distributionSite }
  })
}
