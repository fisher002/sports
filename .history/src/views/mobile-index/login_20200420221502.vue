<template>
  <div>
    <top :data="title"></top>
    <div class="user-login">
      <van-form @submit="onSubmit">
        <van-field
          v-model="data.username"
          name="username"
          label="账号"
          placeholder="手机号码"
          clearable
          :rules="[{ required: true, message: '请填写手机号码' }]"
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
          <van-button
            :loading="loading"
            loading-text="登录中..."
            round
            block
            type="info"
            native-type="submit"
          >立即登录</van-button>
        </div>
      </van-form>
      <div style="margin: 16px;">
          <van-button round block type="info">没有账号?马上注册</van-button>
        </div>
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
      loading: false,
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
        this.loading = true;
        // api.checkLogin(this.data).then(
        //   res => {},
        //   res => {}
        // );
        setTimeout(() => {
          this.loading = false;
        }, 2000);
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