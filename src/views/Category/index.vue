<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import GoodsItem from '@/views/Home/components/GoodsItem.vue'
import { useBanner } from '@/views/Category/composables/useBanner.js'
import { useCategory } from '@/views/Category/composables/useCategory.js'

// 获取banner数据
const { bannerList } = useBanner()
// 导航
const { SecondCategoryList } = useCategory()
</script>

<template>
  <div class="top-category">
    <div class="container">
      <!--面包屑导航-->
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ SecondCategoryList.name }}</el-breadcrumb-item>
      </el-breadcrumb>

      <!--轮播图-->
      <el-skeleton :loading="bannerList.length === 0" :throttle="500" animated>
        <template #template>
          <el-skeleton-item
            style="width: 1240px; height: 500px; margin: 20px auto 0"
            variant="image"
          ></el-skeleton-item>
        </template>
        <template #default>
          <div class="home-banner">
            <el-carousel height="500px">
              <el-carousel-item v-for="item in bannerList" :key="item.id">
                <img :src="item.imgUrl" alt="" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </template>
      </el-skeleton>

      <!--分类模板-->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in SecondCategoryList.children" :key="i.id">
            <router-link :to="`/category/sub/${i.id}`">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <div
        v-for="item in SecondCategoryList.children"
        :key="item.id"
        class="ref-goods"
      >
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :key="good.id" :good="good" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-category {
  .container {
    margin-top: 20px;

    .home-banner {
      width: 1240px;
      height: 500px;
      margin: 20px auto 0;

      img {
        width: 100%;
        height: 500px;
      }
    }
  }

  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}
</style>
