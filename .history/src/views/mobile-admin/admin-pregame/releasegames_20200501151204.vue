<template>
  <div>
    <div class="title">用户注册</div>
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
      <van-field label="头像" label-align="right">
        <template #input>
          <van-uploader
            v-model="fileList"
            :before-read="beforeRead"
            :after-read="upLoadFile"
            :max-count="1"
          />
        </template>
      </van-field>
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
        name="calendar"
        :value="userData.birth == '' ? '' : formatDate(userData.birth)"
        label="出生日期"
        label-align="right"
        placeholder="点击选择时间"
        @click="showDatePicker = true"
      />
      <van-popup v-model="showDatePicker" position="bottom">
        <van-datetime-picker
          v-model="userData.birth"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="showDatePicker = false"
          @cancel="showDatePicker = false"
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
import api from "./pregameUrl";
import utils from "@/utils/comUtils";
export default {
  props: { type: "" },
  data() {
    return {
      loading: false,
      scloading: false,
      showDatePicker: false,
      showPicker: false,
      text: "",
      fileList: [],
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
    /**日期格式化 */
    formatDate(res) {
      return utils.formatDate(res);
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
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