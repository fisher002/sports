<template>
  <div>
    <van-button
      v-if="isLogin == false"
      round
      block
      type="info"
      native-type="button"
      @click="toLogin"
    >立即登录</van-button>
  </div>
</template>
<script>
import api from "./mineUrl";
import { Toast } from "vant";
export default {
  data() {
    return {
      isLogin: false,
      userData: ""
    };
  },
  created() {
    this.checkLogin();
    this.getMyMessage();
  },
  methods: {
    /**获取我的信息 */
    getMyMessage() {
      api.getMyMessage().then(
        res => {
          if (res.data.code == 10000) {
            this.userData = res.data.data;
            Toast(res.data.msg);
          }
        },
        res => {
          Toast(res.data.msg);
        }
      );
    },
    /**检查是否登录 */
    checkLogin() {
      if (
        sessionStorage.getItem("user") &&
        sessionStorage.getItem("isLogin") == "true"
      ) {
        this.isLogin = true;
        this.userData = sessionStorage.getItem("user");
      }
    },
    /**登录 */
    toLogin() {
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="scss" scoped>
</style>