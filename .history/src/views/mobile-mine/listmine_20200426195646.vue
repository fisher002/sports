<template>
  <div class="msg-box">
    <div class="msg-top">
      <div v-if="isLogin == true">
        <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
          <van-loading v-if="userData == ''" color="#1989fa" />
          <div v-if="userData" class="msg-detail">
            <div class="head-img">
              <img
                @click="toDetail('/user/detailmine','detail')"
                width="60"
                height="60"
                :src="formatUrl(userData.avatarUrl)"
              />
            </div>
            <div class="msg-mine">
              <div class="mine-top">
                <div @click="toDetail('/user/detailmine','detail')">{{userData.name}}</div>
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
                <van-button
                  plain
                  hairline
                  type="info"
                  size="small"
                  @click="toDetail('/user/detailmine','detail')"
                >查看资料</van-button>
                <div style="width:20px"></div>
                <van-button
                  plain
                  hairline
                  type="info"
                  size="small"
                  @click="toDetail('/user/detailmine','edit')"
                >修改资料</van-button>
              </div>
            </div>
          </div>
          <account></account>
          <van-cell title="我的报名" @click="toSignUp" is-link value="查看" />
          <van-cell title="我的成绩" @click="toScore" is-link value="查看" />
          <van-cell title="我是裁判" @click="toReferee" is-link value="运动员管理" />
          <van-cell value="查看" @click="toMessage" is-link>
            <template #title>
              <span class="custom-title">我的消息</span>
              <van-tag v-if="msgNumber" round type="danger">{{msgNumber}}</van-tag>
            </template>
          </van-cell>
          <van-cell title="邀请好友" is-link value="得奖励" />
          <div class="out-btn" @click="outLogin">
            <span>退出登录</span>
          </div>
        </van-pull-refresh>
      </div>
      <div v-if="isLogin == false">
        <van-empty image="error" description="暂未登录">
          <van-button round block type="info" native-type="button" @click="toLogin">立即登录</van-button>
        </van-empty>
      </div>
    </div>
  </div>
</template>
<script>
import api from "./mineUrl";
import utils from "@/utils/comUtils";
import { Toast } from "vant";
import account from "@/components/public/mine/myAccount";
export default {
  components: { account },
  data() {
    return {
      isLoading: false,
      isLogin: false,
      userData: "",
      userId: "",
      msgNumber: ""
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    /**获取我的信息 */
    getMyMessage() {
      this.isLoading = !this.isLoading;
      api.getMyMessage().then(
        res => {
          if (res.data.code == 10000) {
            this.isLoading = !this.isLoading;
            this.userData = res.data.data;
            return;
          }
          Toast(res.data.msg);
          sessionStorage.clear();
          this.isLogin = false;
          this.isLoading = !this.isLoading;
        },
        res => {
          this.isLoading = !this.isLoading;
          this.isLogin = false;
        }
      );
    },
    /**检查是否登录 */
    checkLogin() {
      if (utils.checkLogin()) {
        this.isLogin = true;
        this.userId = sessionStorage.getItem("userId");
        this.getMyMessage();
        this.getMyMessageNum();
      }
    },
    /**登录 */
    toLogin() {
      this.$router.push("/login");
    },
    /**退出登录 */
    outLogin() {
      if (this.isLogin == true) {
        api.outLogin().then(res => {
          if (res.data.code == 10000) {
            this.isLogin = false;
            this.userData = "";
            sessionStorage.clear();
          }
        });
      }
    },
    /**查看用户信息 */
    toDetail(path, type) {
      this.$router.push({
        path: path,
        query: {
          type: type
        }
      });
    },
    /**我的报名 */
    toSignUp() {
      if (this.userData.id) {
        this.$router.push({
          path: "/user/signupmine",
          query: {
            studentId: `${this.userData.id}`
          }
        });
      }
    },
    /**我的成绩 */
    toScore() {
      if (this.userData.id) {
        this.$router.push({
          path: "/user/listscore",
          query: {
            studentId: `${this.userData.id}`
          }
        });
      }
    },
    /**我管理的赛事，裁判 */
    toReferee() {
      if (this.userData.id) {
        this.$router.push({
          path: "/user/refereemanage",
          query: {
            studentId: `${this.userData.id}`
          }
        });
      }
    },
    /**获取我的消息未读数目 */
    getMyMessageNum() {
      api.getMessageNum({ isRead: "N" }).then(res => {
        if (res.data.code == 10000) {
          this.msgNumber = res.data.data;
        }
      });
    },
    /**我的消息 */
    toMessage() {
      if (this.userData.id) {
        this.$router.push({
          path: "/user/listmessage",
          query: {
            toStudentId: `${this.userData.id}`
          }
        });
      }
    },
    /**下拉刷新 */
    onRefresh() {
      this.checkLogin();
    },
    /**日期格式化 */
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
    .out-btn {
      padding: 20px 0;
      display: flex;
      justify-content: center;
      color: #386af5;
      span {
        border-bottom: 1px #386af5 solid;
      }
    }
  }
}
.van-cell__title {
  display: flex;
}
.van-cell__value {
  display: block;
}
</style>