<template>
  <div>
    <top :data="title"></top>
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
        <van-button round block type="info" native-type="submit">立即登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { Toast } from "vant";
import top from "@/components/public/top";
import api from './indexUrl'
export default {
  components: { top },
  data() {
    return {
      title: "用户登录",
      data: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      if(this.data) {
          Toast('0');
      }else {
          Toast('1');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>