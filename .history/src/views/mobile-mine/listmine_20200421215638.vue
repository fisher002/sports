<template>
  <div class="msg-box">
    <div class="msg-top">
      <div v-if="isLogin == true" class="msg-detail">
        <div class="head-img">
          <img width="50" height="50" src="../../../static/img/demo.jpg" />
        </div>
        <div class="msg-mine">
          <div class="mine-top">
            <div>{{userData.name}}</div>
            <div style="margin-left:30px">{{userData.schoolName}}</div>
          </div>
          <div class="mine-center">
            <div>{{userData.sex == 'M' ? '男' : '女'}}</div>
            <div style="margin-left:30px">{{userData.birth}}</div>
          </div>
        </div>
      </div>
      <div v-if="isLogin == false">
        <van-button round block type="info" native-type="button" @click="toLogin">立即登录</van-button>
      </div>
    </div>
    <div class="msg-main"></div>
    <div class="msg-bottom"></div>
  </div>
</template>
<script>
import api from "./mineUrl";
import { Toast } from "vant";
export default {
  data() {
    return {
      isLogin: false,
      userData: "",
      userId: ""
    };
  },
  created() {
    this.checkLogin();
    this.getMyMessage();
  },
  methods: {
    /**获取我的信息 */
    getMyMessage() {
      //   if (this.userData.length > 0) {
      //     return;
      //   }
      api.getMyMessage().then(
        res => {
          if (res.data.code == 10000) {
            this.userData = res.data.data;
          }
        },
        res => {
          Toast(res.data.msg);
        }
      );
    },
    /**检查是否登录 */
    checkLogin() {
      if (sessionStorage.getItem("isLogin") == "true") {
        this.isLogin = true;
        this.userId = sessionStorage.getItem("userId");
      }
    },
    /**登录 */
    toLogin() {
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="scss" scoped>
.msg-box {
  padding: 3px 0;
  width: 100%;
  .msg-top {
    padding: 20px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    .msg-detail {
      width: 100%;
      display: flex;
      .head-img {
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid #e6d0d0;
        }
      }
      .msg-mine {
        width: 75%;
        display: flex;
        flex-wrap: wrap;
        .mine-top {
          width: 100%;
          display: flex;
        }
        .mine-center {
          width: 100%;
          display: flex;
        }
      }
    }
  }
}
</style>