<script setup>
import { useCategoryStore } from '@/stores/category.js'

const categoryStore = useCategoryStore()
</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in categoryStore.categoryList" :key="item.id">
        <router-link to="/">{{ item.name }}</router-link>
        <router-link
          v-for="i in item.children.slice(0, 2)"
          :key="i.name"
          to="/"
        >
          {{ i.name }}
        </router-link>
        <!--弹层layer位置-->
        <div class="layer">
          <h4>分类推荐<small>根据您的购买记录或浏览记录推荐</small></h4>
          <ul>
            <li v-for="i in item.goods" :key="i.id">
              <router-link to="/">
                <img :src="i.picture" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">{{ i.name }}</p>
                  <p class="desc ellipsis">{{ i.desc }}</p>
                  <p class="price"><i>¥</i>{{ i.price }}</p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.home-category {
  position: relative;
  width: 250px;
  height: 500px;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;

  .menu {
    li {
      position: relative;
      padding-left: 40px;
      height: 55px;
      line-height: 55px;

      &:hover {
        background-color: $xtxColor;
      }

      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }

      .layer {
        display: none;
        position: absolute;
        left: 250px;
        top: 0;
        width: 990px;
        height: 500px;
        padding: 0 15px;
        background-color: rgba(255, 255, 255, 0.8);

        h4 {
          font-size: 20px;
          font-weight: 400;
          line-height: 80px;

          small {
            font-size: 16px;
            color: #666;
          }
        }

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            width: 310px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background-color: #fff;

            &:nth-child(3n) {
              margin-right: 0;
            }

            a {
              display: flex;
              align-items: center;
              width: 100%;
              height: 100%;
              padding: 10px;

              &:hover {
                background: #e3f9f4;
              }

              img {
                width: 95px;
                height: 95px;
              }

              .info {
                padding-left: 10px;
                line-height: 24px;
                overflow: hidden;

                .name {
                  font-size: 16px;
                  color: #666;
                }

                .desc {
                  color: #999;
                }

                .price {
                  font-size: 22px;
                  color: $priceColor;

                  i {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }

      // 关键样式  hover状态下的layer盒子变成block
      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>
