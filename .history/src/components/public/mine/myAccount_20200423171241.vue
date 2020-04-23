<template>
  <div class="account-box">
    <div class="account-title">我的账户</div>
    <div class="account-demo"></div>
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
.account-box {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 5px;
  .account-title {
    display: flex;
    width: 100%;
    border-left: 5px solid #8cc4fc;
    padding: 0 5px;
  }
  .account-demo {
    display: flex;
    width: 100%;
  }
}
</style>