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
    <van-popup v-model="showBtn" position="right" :style="{ height: '100%' }">
      <div class="side-btn">
        <van-button block style="color:#1989fa">关于我们</van-button>
        <van-button v-if="isLogin == false" block style="color:#1989fa" to="/login">立即登录</van-button>
        <van-button v-if="isLogin == true" block style="color:#1989fa" @click="outLogin">退出登录</van-button>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
import api from "@/views/mobile-index/indexUrl";
export default {
  name: "top",
  props: { data: "" },
  data() {
    return {
      showBtn: false,
      isLogin: false
    };
  },
  methods: {
    onClickLeft() {
      if (this.$route.path === "/") {
        Toast("已经是首页");
        return;
      }
      this.$router.go(-1);
    },
    onClickRight() {
      this.showBtn = !this.showBtn;
      this.checkLogin();
    },
    /**检查是否登录 */
    checkLogin() {
      if (sessionStorage.getItem("isLogin") == "true") {
        this.isLogin = true;
      }
    },
    /**退出登录 */
    outLogin() {
      if (this.isLogin == true) {
        api.outLogin().then(res => {
          this.isLogin = false;
          sessionStorage.clear();
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.side-btn {
  width: 120px;
  height: 100%;
  background: #ffffff;
}
</style>