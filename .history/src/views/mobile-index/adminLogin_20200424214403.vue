<template>
  <div>
    <top></top>
    <van-tabs v-model="activeName">
      <van-tab title="管理员登陆" name="admin">
        <div class="user-login">
          <van-form @submit="onSubmitAdmin">
            <van-field
              readonly
              clickable
              label="学校"
              :value="text"
              placeholder="请选择您所在的学校"
              :rules="[{ required: true, message: '请选择您所在的学校' }]"
              @click="getSchoolList"
            />
            <van-popup v-model="showPicker" position="bottom">
              <van-picker
                show-toolbar
                :columns="schoolData"
                :loading="scloading"
                @cancel="showPicker = false"
                @confirm="onConfirm"
                @change="onChange"
              />
            </van-popup>
            <van-field
              v-model="adminData.username"
              name="username"
              label="账号"
              placeholder="手机号码"
              clearable
              :rules="[{ required: true, message: '请填写手机号码' }]"
            />
            <van-field
              v-model="adminData.password"
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
    <van-popup v-model="showDialog" position="top" closeable close-icon="close">
      <userRegister v-if="registerType == 'user'" @back="callBack"></userRegister>
      <adminRegister v-if="registerType == 'admin'" @back="callBack"></adminRegister>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
import top from "@/components/public/top";
import adminRegister from "./adminRegister";
import api from "./indexUrl";

export default {
  components: { top, adminRegister },
  data() {
    return {
      showDialog: false,
      loading: false,
      scloading: false,
      showPicker: false,
      title: "登录",
      activeName: "user",
      registerTitle: "",
      registerType: "",
      schoolData: [],
      text: "",
      userData: {
        username: "",
        password: ""
      },
      adminData: {
        school: "",
        username: "",
        password: ""
      }
    };
  },
  methods: {
    /**管理员登陆 */
    onSubmitAdmin() {
      if (this.adminData) {
        this.loading = true;
        // api.checkLogin(this.adminData).then(
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
</style>