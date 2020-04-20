<template>
  <div>
    <div v-if="type == 'user'">
      <van-form @submit="onSubmit">
        <van-field
          v-model="userData.username"
          label="账号"
          placeholder="手机号码"
          clearable
          :rules="[{ required: true, message: '请填写手机号码' }]"
        />
        <van-field
          v-model="userData.code"
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
          v-model="userData.password"
          type="password"
          label="密码"
          placeholder="密码"
          clearable
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="userData.comfirmPassword"
          type="password"
          label="确认密码"
          placeholder="请再次填写密码"
          clearable
          :rules="[{ validator: checkPassword, message: '上下密码不一致' }]"
        />
        <van-field
          readonly
          clickable
          label="学校"
          :value="userData.school"
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
    <div v-if="type == 'admin'">管理员注册</div>
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
      },
      adminData: {
        school: "",
        username: "",
        password: ""
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
    /**管理员注册 */
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
    /**获取验证码 */
    getCode() {
      Toast("获取验证码");
    },
    /**选择学校值 */
    onChange(picker, val, index) {
      this.userData.school = val;
    },
    /**选择学校值 */
    onConfirm(val) {
      this.userData.school = val;
      this.showPicker = false;
    },
    /**密码验证 */
    checkPassword(val) {
      Toast(val);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>