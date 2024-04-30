<script setup>
import { getBannerPicService } from '@/apis/home.js'
import { ref } from 'vue'

// 获取banner数据
const bannerList = ref([])
const getBannerPic = async () => {
  const res = await getBannerPicService('1')
  bannerList.value = res.data.result
}
getBannerPic()
</script>

<template>
  <div class="home-banner">
    <el-carousel arrow="never" height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style lang="scss" scoped>
.home-banner {
  position: absolute;
  top: 0;
  left: 0;
  width: 1240px;
  height: 500px;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
