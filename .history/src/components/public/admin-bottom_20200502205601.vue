<template>
  <div>
    <van-tabbar v-model="active" inactive-color="#000000" active-color="#000000" @change="onChange">
      <van-tabbar-item name="赛前" icon="wap-home-o" replace to="/admin">赛前</van-tabbar-item>
      <van-tabbar-item name="赛中" icon="award-o" replace to="/admin/middleindex">赛中</van-tabbar-item>
      <van-tabbar-item name="赛后" icon="chat-o" replace to="/admin/afterindex">赛后</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      active: "赛前"
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
.van-tabbar {
  z-index: 1000 !important;
}
</style>