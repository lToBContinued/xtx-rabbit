<script setup>
import { ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'

// 图片列表
defineProps({
  imageList: {
    type: Array,
    default: () => []
  }
})

// 1、小图切换大图显示
const activeIndex = ref(0)
const enterHandeler = (i) => {
  activeIndex.value = i
}

// 2、蒙层跟随鼠标移动
const target = ref(null)
// 获取鼠标相对位置
const { elementX, elementY, isOutside } = useMouseInElement(target)
// 监听elementX和elementY的变化，一旦变化，重置蒙层位置（left和top）
const left = ref(0)
const top = ref(0)
const positionX = ref(0)
const positionY = ref(0)
watch([elementX, elementY, isOutside], () => {
  // 如果鼠标没有移动到盒子中，不执行放大等逻辑
  if (!isOutside.value) {
    // 有效范围内控制滑块距离
    // 横向
    if (elementX.value > 100 && elementX.value < 300) {
      left.value = elementX.value - 100
    }
    // 纵向
    if (elementY.value > 100 && elementY.value < 300) {
      top.value = elementY.value - 100
    }
    // 边界距离控制
    if (elementX.value > 300) {
      left.value = 200
    }
    if (elementX.value < 100) {
      left.value = 0
    }
    if (elementY.value > 300) {
      top.value = 200
    }
    if (elementY.value < 100) {
      top.value = 0
    }

    // 控制大图显示
    positionX.value = -left.value * 2
    positionY.value = -top.value * 2
  }
})
</script>

<template>
  <div class="goods-image">
    <!--左侧大图-->
    <div ref="target" class="middle">
      <img :src="imageList[activeIndex]" alt="" />
      <!--蒙层小块-->
      <div
        v-show="!isOutside"
        :style="{ left: `${left}px`, top: `${top}px` }"
        class="layer"
      ></div>
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
      v-show="!isOutside"
      :style="[
        {
          backgroundImage: `url(${imageList[activeIndex]})`,
          backgroundPositionX: `${positionX}px`,
          backgroundPositionY: `${positionY}px`
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
