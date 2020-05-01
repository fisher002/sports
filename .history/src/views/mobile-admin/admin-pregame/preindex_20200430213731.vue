<template>
  <div>
    <van-grid :column-num="3" clickable>
      <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="文字" />
    </van-grid>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
</style>