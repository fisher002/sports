<template>
  <div>
    <van-form @submit="onAdminSubmit" label-align="left">
      <van-field
        readonly
        clickable
        label="学校"
        :value="adminData.school"
        placeholder="请选择您所在的学校"
        :rules="[{ required: true, message: '请选择您所在的学校' }]"
        @click="showAdminPicker = true"
      />
      <van-popup v-model="showAdminPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showAdminPicker = false"
          @confirm="onAdminConfirm"
          @change="onAdminChange"
        />
      </van-popup>
      <van-field
        v-model="adminData.username"
        label="账号"
        placeholder="手机号码"
        clearable
        :rules="[{ validator: checkPhone, message: '手机号码格式错误' }]"
      />
      <van-field
        v-model="adminData.code"
        center
        clearable
        label="验证码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #button>
          <van-button size="small" native-type="button" type="primary" @click="getCode">获取验证码</van-button>
        </template>
      </van-field>
      <van-field
        v-model="adminData.password"
        type="password"
        label="密码"
        placeholder="密码"
        clearable
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        type="password"
        v-model="adminData.comfirmPassword"
        label="确认密码"
        placeholder="请再次填写密码"
        clearable
        :rules="[{ validator: checkAdminPassword, message: '上下密码不一致' }]"
      />
      <div style="margin: 16px;">
        <van-button
          :loading="loading"
          loading-text="注册中..."
          round
          block
          type="info"
          native-type="submit"
        >立即注册</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { Toast } from "vant";
import api from "./indexUrl";
export default {
  props: { type: "" },
  data() {
    return {
      loading: false,
      showAdminPicker: false,
      columns: ["广东科贸职业学院", "清华大学", "北京大学", "广铁", "广外"],
      adminData: {
        username: "",
        code: "",
        password: "",
        comfirmPassword: "",
        school: ""
      }
    };
  },
  methods: {
    /**管理员注册 */
    onAdminSubmit() {
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
    /**获取验证码 */
    getCode() {
      Toast("获取验证码");
    },
    /**选择学校值,管理员 */
    onAdminChange(picker, val, index) {
      this.adminData.school = val;
    },
    /**选择学校值,管理员 */
    onAdminConfirm(val) {
      this.adminData.school = val;
      this.showAdminPicker = false;
    },
    /**密码验证,自定义,管理员 */
    checkAdminPassword(val) {
      if (val === this.adminData.password) {
        return true;
      }
      return false;
    },
    /**手机号码验证,自定义,管理员 */
    checkPhone(val) {
      let result = /^1[3456789]\d{9}$/;
      if (val !== "") {
        if (!result.test(val)) {
          return false;
        } else {
          return true;
        }
      }
      return false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>