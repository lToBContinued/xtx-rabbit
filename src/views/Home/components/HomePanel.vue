<script setup>
defineProps({
  title: { String },
  subTitle: { String }
})
</script>

<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <!--主标题和副标题-->
        <h3>
          {{ title }}<small>{{ subTitle }}</small>
        </h3>
      </div>
      <!--主体内容插槽-->
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-panel {
  background-color: #fff;

  .head {
    display: flex;
    align-items: flex-end;
    padding: 40px 0;

    h3 {
      flex: 1;
      height: 35px;
      margin-left: 6px;
      font-size: 32px;
      line-height: 35px;
      font-weight: 400;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
