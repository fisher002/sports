<template>
  <div>
    <top :data="title"></top>
    <van-tabs v-model="activeName">
      <van-tab title="用户登录" name="user">
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
            <van-button @click="toRegister('user')" round block type="info">没有账号?马上注册</van-button>
          </div>
          <van-divider>第三方直接登录</van-divider>
        </div>
      </van-tab>
      <van-tab title="管理员登陆" name="admin">
        <div class="user-login">
          <van-form @submit="onSubmitAdmin">
            <van-field
              readonly
              clickable
              label="学校"
              :value="school"
              placeholder="请选择您所在的学校"
              :rules="[{ required: true, message: '请选择您所在的学校' }]"
              @click="showPicker = true"
            />
            <van-popup v-model="showPicker" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"
                @change="onChange"
              />
            </van-popup>
            <van-field
              v-model="data1.username"
              name="username"
              label="账号"
              placeholder="手机号码"
              clearable
              :rules="[{ required: true, message: '请填写手机号码' }]"
            />
            <van-field
              v-model="data1.password"
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
            <van-button @click="toRegister('admin')" round block type="info">没有账号?马上注册</van-button>
          </div>
          <van-divider>第三方直接登录</van-divider>
        </div>
      </van-tab>
    </van-tabs>
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
      showPicker: false,
      title: "登录",
      activeName: "user",
      columns: ['广东科贸职业学院', '清华大学', '北京大学', '广铁', '广外'],
      school: "",
      data: {
        username: "",
        password: ""
      },
      data1: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    /**用户登录 */
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
    },
    /**管理员登陆 */
    onSubmitAdmin() {
      if (this.data1) {
        this.loading = true;
        // api.checkLogin(this.data1).then(
        //   res => {},
        //   res => {}
        // );
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    },
    toRegister(type) {
      if (type === "user") {
        Toast("用户注册");
      } else {
        Toast("管理员注册");
      }
    },
    /**选择学校值 */
    onChange(val) {
      console.log(val)
    },
    onConfirm(val) {
      this.school = val;
      this.showPicker = false;
    },
  }
};
</script>
<style lang="scss" scoped>
.user-login {
  padding: 50px 0;
}
</style>