// banner 轮播图相关业务代码
import { ref } from 'vue'
import { getBannerPicService } from '@/apis/home.js'

export const useBanner = () => {
  const bannerList = ref([])
  const getBannerPic = async () => {
    const res = await getBannerPicService('2')
    bannerList.value = res.data.result
  }
  getBannerPic()

  return {
    bannerList
  }
}
