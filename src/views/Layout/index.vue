<script setup>
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue'
</script>

<template>
  <!--二级路由出口-->
  <layout-nav></layout-nav>
  <layout-header></layout-header>
  <router-view></router-view>
  <layout-footer></layout-footer>
</template>

<style lang="scss" scoped></style>
