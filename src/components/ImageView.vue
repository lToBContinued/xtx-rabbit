<script setup>
import { ref } from 'vue'

// 图片列表
const imageList = [
  'https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png',
  'https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg',
  'https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg',
  'https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg',
  'https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg'
]

// 1、小图切换大图显示
const activeIndex = ref(0)
const enterHandeler = (i) => {
  activeIndex.value = i
}
</script>

<template>
  <div class="goods-image">
    <!--左侧大图-->
    <div ref="target" class="middle">
      <img :src="imageList[activeIndex]" alt="" />
      <!--蒙层小块-->
      <div :style="{ left: '0px', top: '0px' }" class="layer"></div>
    </div>

    <!--小图列表-->
    <ul class="small">
      <li
        v-for="(img, i) in imageList"
        :key="i"
        :class="{ active: i === activeIndex }"
        @mouseenter="enterHandeler(i)"
      >
        <img :src="img" alt="" />
      </li>
    </ul>

    <!--放大镜图-->
    <div
      v-show="false"
      :style="[
        {
          backgroundImage: `url(${imageList[0]})`,
          backgroundPositionX: `0px`,
          backgroundPositionY: `0px`
        }
      ]"
      class="large"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background-color: #f5f5f5;
  }

  //蒙层小块
  .layer {
    //绝对定位，然后跟随鼠标位置移动
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    height: 200px;
    background-color: rgba(0, 0, 0, 0.2);
  }

  //小图列表
  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图：盒子大小2：1，将来控制背景的移动来实现查看
    background-position: 0 0;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
}
</style>
