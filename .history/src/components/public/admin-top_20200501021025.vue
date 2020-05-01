<template>
  <div>
    <van-nav-bar
      :title="topTitle"
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
        <van-button v-if="isAdminLogin == false" block style="color:#1989fa" @click="toLogin">立即登录</van-button>
        <van-button v-if="isAdminLogin == true" block style="color:#1989fa" @click="outLogin">退出登录</van-button>
        <van-button block style="color:#1989fa" @click="showBtn = !showBtn">关闭菜单</van-button>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
import api from "@/views/mobile-admin/admin-login/loginUrl";
export default {
  inject: ["reload"],
  name: "top",
  data() {
    return {
      showBtn: false,
      isAdminLogin: false
    };
  },
  computed: {
    topTitle() {
      // 返回title
      return this.$route.meta.label ? this.$route.meta.label : "默认";
    }
  },
  methods: {
    onClickLeft() {
      if (sessionStorage.getItem("isAdminLogin") === "true" && this.noBack()) {
        return;
      }
      if (this.$route.path === "/admin/preindex") {
        this.$router.replace("/");
        return;
      }
      this.$router.go(-1);
    },
    /**路由回退检查 */
    noBack() {
      let flag = this.$route.name;
      if (flag.match(/index|listmine|listcomment|listitem|listtournament/i)) {
        return true;
      }
      return false;
    },
    onClickRight() {
      this.showBtn = !this.showBtn;
      this.checkLogin();
    },
    /**检查是否登录 */
    checkLogin() {
      if (sessionStorage.getItem("isAdminLogin" === "true")) {
        this.isAdminLogin = true;
      }
    },
    /**登录 */
    toLogin() {
      this.showBtn = !this.showBtn;
      this.$router.replace("/adminLogin");
    },
    /**退出登录 */
    outLogin() {
      if (this.isAdminLogin) {
        api.outLogin().then(
          res => {
            if(res.data.code == 10000) {
              this.isAdminLogin = false;
              this.showBtn = !this.showBtn;
              sessionStorage.clear();
              this.$router.replace("/adminLogin");
              return;
            }
          });
          return;
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