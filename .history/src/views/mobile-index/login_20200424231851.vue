<template>
  <div>
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
        <van-button @click="toRegister" round block type="info">没有账号?马上注册</van-button>
      </div>
      <van-divider>第三方直接登录</van-divider>
    </div>
    <van-popup v-model="showDialog" position="top" closeable close-icon="close">
      <userRegister @back="callBack"></userRegister>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
import userRegister from "./userRegister";
import api from "./indexUrl";
export default {
  components: { userRegister },
  data() {
    return {
      showDialog: false,
      loading: false,
      scloading: false,
      showPicker: false,
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
              Toast(res.data.msg);
              sessionStorage.setItem("userId", res.data.data.id);
              sessionStorage.setItem("isLogin", true);
              sessionStorage.setItem("schoolId", res.data.data.schoolId);
              this.$router.push("/user");
            } else {
              this.loading = false;
              Toast(res.data.msg);
            }
          },
          res => {
            this.loading = false;
            Toast(res.data.msg);
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
    toRegister() {
      this.showDialog = true;
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
// .van-popup--top {
//   top: 40px !important;
// }
</style>