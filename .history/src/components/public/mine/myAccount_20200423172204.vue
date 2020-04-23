<template>
  <div class="account-box">
    <div class="account-title">我的账户</div>
    <div class="account-demo">
      <div class="demo-list">
        <div class="list icon">
          <van-icon name="edit" />
        </div>
        <div class="list name">笔记</div>
        <div class="list sum">4条</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: ""
    };
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
    .demo-list {
      display: flex;
      width: 25%;
      flex-wrap: wrap;
      padding: 5px 0;
      .list {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        padding: 3px 0;
      }
    }
  }
}
.icon {
  font-size: 18px;
  color: #ec4848;
}
.name {
}
.sum {
  font-size: 14px;
  color: #dfd1d1;
}
</style>