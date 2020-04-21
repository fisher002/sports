<template>
  <div class="msg-box">
    <div class="msg-top">
      <div v-if="isLogin == true">
        <van-loading v-if="userData == ''" color="#1989fa" />
        <div v-if="userData" class="msg-detail">
          <div class="head-img">
            <img width="60" height="60" :src="formatUrl(userData.avatarUrl)" />
          </div>
          <div class="msg-mine">
            <div class="mine-top">
              <div>{{userData.name}}</div>
              <div style="margin-left:30px">{{userData.schoolName}}</div>
            </div>
            <div class="mine-top">
              <div>{{userData.sex == 'M' ? '男' : '女'}}</div>
              <div style="margin-left:60px">
                <van-icon name="birthday-cake-o" />
                {{formatDate(userData.birth)}}
              </div>
            </div>
            <div class="mine-top">
              <van-button type="primary" size="small">编辑资料</van-button>
              <div style="width:20px"></div>
              <van-button type="primary" size="small">修改密码</van-button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isLogin == false">
        <van-button round block type="info" native-type="button" @click="toLogin">立即登录</van-button>
      </div>
    </div>
    <van-divider :style="{ color: '#d0bebe', borderColor: '#d0bebe', margin: '0' }" />
    <div class="msg-main"></div>
    <div class="msg-bottom"></div>
  </div>
</template>
<script>
import api from "./mineUrl";
import utils from "@/utils/comUtils";
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
    },
    // 日期格式化
    formatDate(res) {
      return utils.formatDates(res);
    },
    /**头像 */
    formatUrl(url) {
      return `${utils.returnUrl()}/${url}`;
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
          padding: 3px 0;
          width: 100%;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>