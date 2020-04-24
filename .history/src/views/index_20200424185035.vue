<template>
  <div class="index">
    <van-button to="/user" type="primary" block round>普通用户入口</van-button>
    <div class="hide"></div>
    <van-button type="primary" block round>裁判入口</van-button>
    <div class="hide"></div>
    <van-button type="primary" block round>管理员入口</van-button>
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
.index {
  display: flex;
  padding: 50px 3px;
  .hide {
    width: 100%;
    margin: 15px 0;
  }
}
</style>