<template>
  <div>
    <van-nav-bar
      :title="data == '' ? '首页' : data"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="apps-o" size="18" />
      </template>
    </van-nav-bar>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "top",
  props: { data: "" },
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      if (this.$route.path === "/") {
        Toast("已经是首页");
        return;
      }
      this.$router.go(-1);
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