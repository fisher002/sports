<template>
  <div>
    <van-nav-bar
      :title="title == '' ? '首页' : title"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>
<script>
// import { Toast } from 'vant';
export default {
  name: "top",
  props: { title: "" },
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$toast({
        message: "返回"
      });
      // Toast("返回");
    },
    onClickRight() {
      this.$toast({
        message: "按钮"
      });
      // Toast("按钮");
    }
  }
};
</script>
<style lang="scss" scoped>
</style>