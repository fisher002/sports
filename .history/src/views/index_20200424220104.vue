<template>
  <div class="index">
    <van-button to="/user" type="primary" block round>用户入口</van-button>
    <div class="hide"></div>
    <van-button to="/adminlogin" type="primary" block round>管理员入口</van-button>
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
  flex-wrap: wrap;
  padding: 150px 20px;
  .hide {
    width: 100%;
    margin: 15px 0;
  }
}
</style>