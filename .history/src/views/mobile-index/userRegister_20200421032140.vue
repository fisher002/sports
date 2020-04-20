<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="userData.username"
        label="账号"
        placeholder="手机号码"
        clearable
        :rules="[{ validator: checkPhone, message: '手机号码格式错误' }]"
        label-align="right"
      />
      <van-field
        v-model="userData.code"
        center
        clearable
        label="验证码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
        label-align="left"
      >
        <template #button>
          <van-button size="small" native-type="button" type="primary" @click="getCode">获取验证码</van-button>
        </template>
      </van-field>
      <van-field
        v-model="userData.password"
        type="password"
        label="密码"
        placeholder="密码"
        clearable
        :rules="[{ required: true, message: '请填写密码' }]"
        label-align="left"
      />
      <van-field
        type="password"
        v-model="userData.comfirmPassword"
        label="确认密码"
        placeholder="请再次填写密码"
        clearable
        :rules="[{ validator: checkPassword, message: '上下密码不一致' }]"
        label-align="left"
      />
      <van-field
        readonly
        clickable
        label="学校"
        :value="userData.school"
        placeholder="请选择您所在的学校"
        :rules="[{ required: true, message: '请选择您所在的学校' }]"
        label-align="left"
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
      showPicker: false,
      columns: ["广东科贸职业学院", "清华大学", "北京大学", "广铁", "广外"],
      userData: {
        username: "",
        code: "",
        password: "",
        comfirmPassword: "",
        school: ""
      }
    };
  },
  methods: {
    /**用户注册 */
    onSubmit() {
      if (this.userData) {
        this.loading = true;
        // api.checkLogin(this.userData).then(
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
    /**选择学校值,用户 */
    onChange(picker, val, index) {
      this.userData.school = val;
    },
    /**选择学校值,用户 */
    onConfirm(val) {
      this.userData.school = val;
      this.showPicker = false;
    },
    /**密码验证,自定义,用户 */
    checkPassword(val) {
      if (val === this.userData.password) {
        return true;
      }
      return false;
    },
    /**手机号码验证,自定义,用户 */
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