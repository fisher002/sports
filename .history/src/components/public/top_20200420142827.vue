<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      Toast("back");
    },
    onClickRight() {
      Toast("back");
    }
  }
};
</script>
<style lang="scss" scoped>
</style>