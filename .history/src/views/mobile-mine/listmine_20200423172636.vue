<template>
  <div class="msg-box">
    <div class="msg-top">
      <div v-if="isLogin == true">
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
      </div>
      <div v-if="isLogin == false">
        <van-empty image="error" description="暂未登录">
          <van-button round block type="info" native-type="button" @click="toLogin">立即登录</van-button>
        </van-empty>
      </div>
    </div>
    <div class="msg-main"></div>
    <div class="msg-bottom"></div>
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
      isLogin: false,
      userData: "",
      userId: ""
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    /**获取我的信息 */
    getMyMessage() {
      api.getMyMessage().then(
        res => {
          if (res.data.code == 10000) {
            this.userData = res.data.data;
            return;
          }
          this.isLogin = false;
        },
        res => {
          this.isLogin = false;
          Toast(res.data.msg);
        }
      );
    },
    /**检查是否登录 */
    checkLogin() {
      if (sessionStorage.getItem("isLogin") == "true") {
        this.isLogin = true;
        this.userId = sessionStorage.getItem("userId");
        this.getMyMessage();
      }
    },
    /**登录 */
    toLogin() {
      this.$router.push("/login");
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