<template>
  <div>
    <van-button v-if="isLogin == false" round block type="info" native-type="button" @click="toLogin">立即登录</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLogin: false,
      userData: ""
    };
  },
  created() {
    this.isLogin();
  },
  methods: {
      /**检查是否登录 */
    isLogin() {
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