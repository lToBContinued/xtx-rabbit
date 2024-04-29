<script setup>
import HomeCategory from '@/views/Home/components/HomeCategory.vue'
import HomeBanner from '@/views/Home/components/HomeBanner.vue'
import HomeHot from '@/views/Home/components/HomeHot.vue'
import HomeNew from '@/views/Home/components/HomeNew.vue'
import HomeProduct from '@/views/Home/components/HomeProduct.vue'
</script>

<template>
  <div>
    <div class="container">
      <home-category></home-category>
      <home-banner></home-banner>
    </div>
    <home-new></home-new>
    <home-hot></home-hot>
    <home-product></home-product>
  </div>
</template>

<style scoped></style>
