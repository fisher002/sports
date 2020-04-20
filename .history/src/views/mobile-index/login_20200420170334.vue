<template>
  <div>
    <top :data="title"></top>
    <div class="user-login">
      <van-form @submit="onSubmit">
        <van-field
          v-model="data.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          clearable
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="data.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          clearable
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            <span v-if="showLogin == false">立即登录</span>
            <van-loading v-else size="24px" color="#1989fa">登录中...</van-loading>
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import top from "@/components/public/top";
import api from "./indexUrl";
export default {
  components: { top },
  data() {
    return {
      showLogin: false,
      title: "用户登录",
      data: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.data) {
        this.showLogin = true;
        Toast(this.data.username);
        // api.checkLogin(this.data).then(
        //   res => {},
        //   res => {}
        // );
        setTimeout(this.showLogin = false,2000);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.user-login {
  padding: 50px 0;
}
</style>