<template>
  <div>
    <top></top>
    <div class="user-login">
      <van-form @submit="onSubmitAdmin">
        <!-- <van-field
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
        </van-popup>-->
        <van-field
          v-model="adminData.username"
          name="username"
          label="账号"
          placeholder="请输入账号"
          clearable
          :rules="[{ required: true, message: '请填写账号' }]"
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
    <van-popup v-model="showDialog" position="top" closeable close-icon="close">
      <adminRegister @back="callBack"></adminRegister>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
import adminRegister from "./adminRegister";
import top from "@/components/public/top";
import api from "./loginUrl";

export default {
  components: { adminRegister, top },
  data() {
    return {
      showDialog: false,
      loading: false,
      scloading: false,
      showPicker: false,
      registerTitle: "",
      schoolData: [],
      text: "",
      userData: {
        username: "",
        password: ""
      },
      adminData: {
        schoolId: "",
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
        api.checkLogin(this.adminData).then(
          res => {
            this.loading = false;
            if (res.data.code == 10000) {
              sessionStorage.setItem('adminId',res.data.data.id);
              sessionStorage.setItem('schoolId',res.data.data.schoolId);
              sessionStorage.setItem('isAdminLogin',true);
              sessionStorage.setItem('admin',res.data.data);
              this.$router.replace("/admin");
            }
            Toast(res.data.msg);
          },
          res => {
            this.loading = false;
          }
        );
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
      this.showDialog = true;
      this.registerTitle = "管理员注册";
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