<script setup>
import { ref } from 'vue'
import HomePanel from '@/views/Home/components/HomePanel.vue'
import { getHotListService } from '@/apis/home.js'

const hotList = ref([])
const getHotList = async () => {
  const res = await getHotListService()
  hotList.value = res.data.result
}
getHotList()
</script>

<template>
  <home-panel subTitle="新鲜出炉&nbsp;品质靠谱" title="人气推荐">
    <ul class="goods-list">
      <li v-for="item in hotList" :key="item.id">
        <el-skeleton
          :loading="hotList.length === 0"
          animated
          style="width: 240px"
        >
          <template #template>
            <el-skeleton-item
              style="width: 306px; height: 300px"
              variant="image"
            />
            <div style="padding: 14px">
              <el-skeleton-item style="width: 50%" variant="h3" />
              <div
                style="
                  display: flex;
                  align-items: center;
                  margin-top: 16px;
                  height: 16px;
                "
              >
                <el-skeleton-item style="margin-right: 16px" variant="text" />
                <el-skeleton-item style="width: 30%" variant="text" />
              </div>
            </div>
          </template>
          <template #default>
            <RouterLink to="/">
              <img v-img-lazy="item.picture" alt="" />
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </RouterLink>
          </template>
        </el-skeleton>
      </li>
    </ul>
  </home-panel>
</template>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    transition: all 0.5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
