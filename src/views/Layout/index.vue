<script setup>
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue'
import LayoutFixed from '@/views/Layout/components/LayoutFixed.vue'
import { useCategoryStore } from '@/stores/categoryStore.js'

const categoryStore = useCategoryStore()
categoryStore.getCategoryList()
</script>

<template>
  <!--二级路由出口-->
  <layout-fixed></layout-fixed>
  <layout-nav></layout-nav>
  <layout-header></layout-header>
  <!-- 添加key，破坏复用机制，强制销毁重建 -->
  <!-- <router-view :key="$route.fullPath"></router-view> -->
  <router-view></router-view>
  <layout-footer></layout-footer>
</template>

<style lang="scss" scoped></style>
