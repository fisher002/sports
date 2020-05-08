<template>
  <div>
    <div class="title">管理员注册</div>
    <van-form @submit="onAdminSubmit" label-align="left">
      <van-field
        readonly
        clickable
        label="学校"
        :value="text"
        placeholder="请选择您所在的学校"
        :rules="[{ required: true, message: '请选择您所在的学校' }]"
        label-align="right"
        @click="getSchoolList"
      />
      <van-popup v-model="showAdminPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="schoolData"
          :loading="scloading"
          @cancel="showAdminPicker = false"
          @confirm="onAdminConfirm"
          @change="onAdminChange"
        />
      </van-popup>
      <van-field
        v-model="adminData.nickname"
        label="姓名"
        placeholder="请输入姓名"
        clearable
        :rules="[{ required: true, message: '请输入姓名' }]"
        label-align="right"
      />
      <van-field
        v-model="adminData.username"
        label="账号"
        placeholder="手机号码"
        clearable
        :rules="[{ validator: checkPhone, message: '手机号码格式错误' }]"
        label-align="right"
      />
      <van-field
        v-model="adminData.code"
        center
        clearable
        label="验证码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
        label-align="right"
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
        label-align="right"
      />
      <van-field
        type="password"
        v-model="adminData.comfirmPassword"
        label="确认密码"
        placeholder="请再次填写密码"
        clearable
        :rules="[{ validator: checkAdminPassword, message: '上下密码不一致' }]"
        label-align="right"
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
import api from "./loginUrl";
import utils from '@/utils/comUtils'
export default {
  props: { type: "" },
  data() {
    return {
      loading: false,
      scloading: false,
      showAdminPicker: false,
      schools: "",
      schoolData: [],
      text: "",
      adminData: {
        nickname: "",
        username: "",
        code: "",
        password: "",
        comfirmPassword: "",
        schoolId: ""
      }
    };
  },
  methods: {
    /**管理员注册 */
    onAdminSubmit() {
      if (this.adminData) {
        this.loading = true;
        this.loading = true;
        api.adminRegister(this.adminData).then(res=>{
          if(res.data.code == "10000") {
            this.$emit('back','ok');
            this.loading = false;
            Toast(res.data.msg);
          }
        },res=>{
        })
      }
    },
    /**获取学校数据 */
    getSchoolList() {
      this.showAdminPicker = true;
      if(this.schoolData.length > 0) {
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
          Toast(res.data.msg);
        }
      );
    },
    /**获取验证码 */
    getCode() {
      Toast("获取验证码");
    },
    /**选择学校值,管理员 */
    onAdminChange(picker, val, index) {
      this.text = val.text;
      this.adminData.schoolId = val.schoolId;
    },
    /**选择学校值,管理员 */
    onAdminConfirm(val) {
      this.text = val.text;
      this.adminData.schoolId = val.schoolId;
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
.title {
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
}
</style>