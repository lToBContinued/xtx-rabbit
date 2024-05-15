<script setup>
import { ref } from 'vue'
import HomePanel from '@/views/Home/components/HomePanel.vue'
import { getNewListService } from '@/apis/home.js'

const newList = ref([])
const getNewList = async () => {
  const res = await getNewListService(4)
  newList.value = res.data.result
}
getNewList()
</script>

<template>
  <home-panel subTitle="新鲜出炉&nbsp;品质靠谱" title="新鲜好物">
    <ul class="goods-list">
      <li v-for="item in newList" :key="item.id">
        <el-skeleton
          :loading="newList.length === 0"
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
            <RouterLink :to="`/detail/${item.id}`">
              <img :src="item.picture" alt="" />
              <p class="name">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
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
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
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
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>
