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
        label-align="right"
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
        label-align="right"
      />
      <van-field
        type="password"
        v-model="userData.comfirmPassword"
        label="确认密码"
        placeholder="请再次填写密码"
        clearable
        :rules="[{ validator: checkPassword, message: '上下密码不一致' }]"
        label-align="right"
      />
      <van-field
        v-model="userData.name"
        label="姓名"
        placeholder="请填写姓名"
        clearable
        :rules="[{ required: true, message: '请填写姓名' }]"
        label-align="right"
      />
      <van-field name="radio" label="性别" label-align="right">
        <template #input>
          <van-radio-group v-model="userData.sex" direction="horizontal">
            <van-radio name="M">男</van-radio>
            <van-radio name="F">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="birthDate"
        label="出生日期"
        label-align="right"
        placeholder="点击选择时间"
        @click="showDatePicker = true"
      />
      <van-popup v-model="showDatePicker" position="bottom">
        <van-datetime-picker type="time" @confirm="onDateConfirm" @cancel="showDatePicker = false" />
      </van-popup>
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
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="schoolData"
          :loading="loading"
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
      showDatePicker: false,
      showPicker: false,
      schools: "",
      schoolData: [],
      text: "",
      userData: {
        avatarUrl: "",
        name: "",
        sex: "",
        birth: "",
        username: "",
        code: "",
        password: "",
        comfirmPassword: "",
        schoolId: ""
      }
    };
  },
  created() {},
  methods: {
    /**用户注册 */
    onSubmit() {
      if (this.userData) {
        this.loading = true;
        api.userRegister(this.userData).then(
          res => {
            if (res.data.code == "10000") {
              this.$emit("back", "ok");
              this.loading = false;
              Toast(res.data.msg);
            }
          },
          res => {
            Toast(res.data.msg);
          }
        );
      }
    },
    /**获取验证码 */
    getCode() {
      Toast("获取验证码");
    },
    /**选择学校值,用户 */
    onChange(picker, val, index) {
      this.userData.schoolId = val.schoolId;
      this.text = val.text;
    },
    /**选择学校值,用户 */
    onConfirm(val) {
      this.userData.schoolId = val.schoolId;
      this.text = val.text;
      this.showPicker = false;
    },
    /**选择出生日期值 */
    onDateConfirm(val) {
      this.userData.birth = val;
      this.showDatePicker = false;
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
    },
    /**获取学校数据 */
    getSchoolList() {
      this.showPicker = true;
      if (this.schoolData.length > 0) {
        return;
      }
      this.loading = !this.loading;
      this.schoolData = [];
      api.getSchoolList().then(
        res => {
          if (res.data.code == "10000") {
            this.schools = res.data.data;
            this.schools.forEach(e => {
              let demo = {
                text: e.schoolName,
                schoolId: e.id
              };
              this.schoolData.push(demo);
            });
            this.loading = !this.loading;
          }
        },
        res => {
          Toast(res.data.msg);
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
</style>