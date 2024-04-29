import request from '@/utils/request.js'

// 获取banner图片
export const getBannerPicService = (distributionSite) => {
  return request({
    url: '/home/banner',
    params: { distributionSite }
  })
}

// 获取新鲜好物信息
export const getNewListService = (limit) => {
  return request({
    url: '/home/new',
    params: { limit }
  })
}

// 获取热门品牌信息
export const getHotListService = () => {
  return request({
    url: '/home/hot'
  })
}
