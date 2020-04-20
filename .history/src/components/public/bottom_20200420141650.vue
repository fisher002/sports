<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="search" icon="medal-o">项目</van-tabbar-item>
      <van-tabbar-item name="friends" icon="chat-o">消息</van-tabbar-item>
      <van-tabbar-item name="setting" icon="medal-o">赛事</van-tabbar-item>
      <van-tabbar-item name="mine" icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: "home"
    };
  }
};
</script>
<style lang="scss" scoped>
</style>