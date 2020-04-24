<template>
  <div>
    <van-tabbar v-model="active" inactive-color="#000000" active-color="#000000" @change="onChange">
      <van-tabbar-item name="首页" icon="wap-home-o" replace to="/user">首页</van-tabbar-item>
      <van-tabbar-item name="项目" icon="award-o" replace to="/user/listitem">项目</van-tabbar-item>
      <van-tabbar-item name="消息" icon="chat-o" replace to="/user/listcomment">消息</van-tabbar-item>
      <van-tabbar-item name="赛事" icon="medal-o" replace to="/user/listtournament">赛事</van-tabbar-item>
      <van-tabbar-item name="我的" icon="user-circle-o" replace to="/user/listmine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      active: "首页"
    };
  },
  methods: {
    onChange(val) {
      // this.$emit('setTitle',val);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>