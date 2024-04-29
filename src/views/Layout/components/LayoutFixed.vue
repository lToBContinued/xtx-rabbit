<script setup>
import { useScroll } from '@vueuse/core'

const { y } = useScroll(window)
</script>

<template>
  <div :class="{ show: y > 78 }" class="app-header-sticky">
    <div class="container">
      <router-link class="logo" to="/" />
      <!-- 导航区域 -->
      <ul class="app-header-nav">
        <li class="home">
          <router-link to="/">首页</router-link>
        </li>
        <li>
          <router-link to="/">居家</router-link>
        </li>
        <li>
          <router-link to="/">美食</router-link>
        </li>
        <li>
          <router-link to="/">服饰</router-link>
        </li>
        <li>
          <router-link to="/">母婴</router-link>
        </li>
        <li>
          <router-link to="/">个护</router-link>
        </li>
        <li>
          <router-link to="/">严选</router-link>
        </li>
        <li>
          <router-link to="/">数码</router-link>
        </li>
        <li>
          <router-link to="/">运动</router-link>
        </li>
        <li>
          <router-link to="/">杂项</router-link>
        </li>
      </ul>

      <div class="right">
        <router-link to="/">品牌</router-link>
        <router-link to="/">专题</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-header-sticky {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 80px;
  background-color: #fff;
  border-bottom: 1px solid #fff;
  // 隐藏时
  transform: translateY(-100%);
  opacity: 0;

  &.show {
    // 显示时
    transform: none;
    opacity: 1;
    transition: all 0.3s linear;
  }

  .container {
    display: flex;
    align-items: center;

    .logo {
      width: 200px;
      height: 80px;
      background: url('@/assets/images/logo.png') no-repeat right 2px;
      background-size: 160px auto;
    }

    .right {
      display: flex;
      width: 220px;
      padding-left: 40px;
      border-left: 2px solid $xtxColor;
      text-align: center;

      a {
        width: 38px;
        margin-right: 40px;
        font-size: 16px;
        line-height: 1;

        &:hover {
          color: $xtxColor;
        }
      }
    }

    .app-header-nav {
      display: flex;
      width: 820px;
      padding-left: 40px;
      z-index: 998;

      li {
        width: 38px;
        margin-right: 40px;
        text-align: center;

        a {
          display: inline-block;
          height: 32px;
          font-size: 16px;
          line-height: 32px;

          &:hover {
            color: $xtxColor;
            border-bottom: 1px solid $xtxColor;
          }
        }

        .active {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;
        }
      }
    }
  }
}
</style>
