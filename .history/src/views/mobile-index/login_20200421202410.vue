<template>
  <div>
    <top :data="title"></top>
    <van-tabs v-model="activeName">
      <van-tab title="用户登录" name="user">
        <div class="user-login">
          <van-form @submit="onSubmit">
            <van-field
              v-model="userData.username"
              name="username"
              label="账号"
              placeholder="手机号码"
              clearable
              :rules="[{ required: true, message: '请填写手机号码' }]"
            />
            <van-field
              v-model="userData.password"
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
import userRegister from "./userRegister";
import adminRegister from "./adminRegister";
import api from "./indexUrl";
export default {
  components: { top, userRegister, adminRegister },
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
    /**用户登录 */
    onSubmit() {
      if (this.userData) {
        this.loading = true;
        api.checkLogin(this.userData).then(
          res => {
            if (res.data.code == 10000) {
              this.loading = false;
              sessionStorage.setItem("userId", res.data.data.id);
              sessionStorage.setItem("isLogin", true);
              Toast(res.data.msg);
              this.$router.go(-1);
            }
          },
          res => {
            this.loading = false;
            Toast(res.data.msg);
          }
        );
      }
    },
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
    },
    /**获取学校数据 */
    getSchoolList() {
      this.showPicker = true;
      if (this.schoolData.length > 0) {
        return;
      }
      this.scloading = !this.scloading;
      this.schoolData = [];
      api.getSchoolList().then(
        res => {
          if (res.data.code == 10000) {
            res.data.data.forEach(e => {
              let demo = {
                text: e.schoolName,
                schoolId: e.id
              };
              this.schoolData.push(demo);
            });
            this.scloading = !this.scloading;
          }
        },
        res => {
          this.scloading = !this.scloading;
          Toast(res.data.msg);
        }
      );
    },
    toRegister(type) {
      this.registerType = type;
      this.showDialog = true;
      if (type === "user") {
        this.registerTitle = "用户注册";
      } else {
        this.registerTitle = "管理员注册";
      }
    },
    /**注册回调 */
    callBack(res) {
      if (res === "ok") {
        this.showDialog = !this.showDialog;
      }
    },
    /**选择学校值 */
    onChange(picker, val, index) {
      this.text = val.text;
      this.adminData.schoolId = val.schoolId;
    },
    /**选择学校值 */
    onConfirm(val) {
      this.text = val.text;
      this.adminData.schoolId = val.schoolId;
      this.showPicker = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.user-login {
  padding: 30px 0;
}
</style>