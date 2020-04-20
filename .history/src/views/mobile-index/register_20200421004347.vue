<template>
  <div>
    <div v-if="type == 'user'">
      <van-form @submit="onSubmit">
        <van-field
          v-model="userData.username"
          name="username"
          label="账号"
          placeholder="手机号码"
          clearable
          :rules="[{ required: true, message: '请填写手机号码' }]"
        />
        <van-field v-model="userData.code" center clearable label="验证码" placeholder="请输入验证码">
          <template #button>
            <van-button size="small" type="primary">获取验证码</van-button>
          </template>
        </van-field>
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
export default {
  props: { type: "" },
  data() {
    return {
      loading: false,
      columns: ["广东科贸职业学院", "清华大学", "北京大学", "广铁", "广外"],
      userData: {
        username: "",
        code: "",
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
    }
  }
};
</script>
<style lang="scss" scoped>
</style>