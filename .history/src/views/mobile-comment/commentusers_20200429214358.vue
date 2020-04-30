<template>
  <div class="comment-box">
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <div class="list-item" v-for="item in data.list" :key="item.id">
        <div class="list-item-left">
          <img :src="formatUrl(item.userInfo.avatarUrl)" />
        </div>
        <div class="list-item-right">
          <div class="right-name">{{item.userInfo.name}}</div>
          <div class="right-content">{{item.commentContent}}</div>
          <div class="right-time">{{formatDate(item.createDate)}}</div>
        </div>
      </div>
      <div class="load-btn" v-show="data.hasNextPage">
        <van-button
          class="load-btn"
          @click="toLoadMore"
          :loading="loading"
          type="info"
          loading-text="加载中..."
        >点击加载更多</van-button>
      </div>
    </van-pull-refresh>
    <div class="chat-send">
      <van-field
        rows="1"
        v-model="params.commentContent"
        center
        clearable
        placeholder="请文明发言"
        autosize
        type="textarea"
      >
        <template #button>
          <van-button size="small" type="primary" @click="sendChat">发送</van-button>
        </template>
      </van-field>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/comUtils";
import { Toast } from "vant";
import api from "./commentUrl";

export default {
  data() {
    return {
      loading: false,
      isLoading: false,
      pageNum: 1,
      data: "",
      params: {
        compateId: "",
        commentContent: "",
        commentParent: ""
      }
    };
  },
  created() {
    /**参数赋值 */
    let params = this.$route.query;
    for (let i in params) {
      this.params[i] = params[i];
    }
    this.getCompateCommentPageList();
  },
  methods: {
    /**获取赛事评论 */
    getCompateCommentPageList(type) {
      api
        .getCompateCommentPageList(
          { compateId: this.params.compateId },
          this.pageNum
        )
        .then(
          res => {
            this.isLoading = false;
            if (res.data.code == 10000) {
              this.loading = !this.loading;
              if (type === "0") {
                this.data.list.push(...res.data.data.list);
                return;
              }
              this.data = res.data.data;
              return;
            }
            this.loading = !this.loading;
            Toast(res.data.msg);
          },
          res => {
            this.isLoading = false;
            this.loading = !this.loading;
          }
        );
    },
    /**新增评论 */
    sendChat() {
      api.addComment(this.params).then(
        res => {
          if (res.data.code == 10000) {
            this.params.commentContent = "";
            this.getCompateCommentPageList();
          }
        },
        res => {}
      );
    },
    /**加载更多 */
    toLoadMore() {
      this.loading = !this.loading;
      if (this.pageNum == this.data.pages) {
        this.loading = !this.loading;
        return;
      }
      if (this.data.hasNextPage) {
        this.pageNum++;
        this.getSchoolCompatePageList("0");
      }
    },
    /**下拉刷新 */
    onRefresh() {
      this.pageNum = 1;
      this.getCompateCommentPageList();
    },
    /**日期格式化 */
    formatDate(date) {
      return utils.formatTime(date);
    },
    /**头像 */
    formatUrl(url) {
      return `${utils.returnUrl()}${url}`;
    }
  }
};
</script>
<style lang="scss" scoped>
.comment-box {
  padding-bottom: 55px;
  padding-top: 5px;
}
.chat-send {
  position: fixed;
  width: 100%;
  bottom: 50px;
}
.list-item {
  width: 100%;
  min-height: 50px;
  display: flex;
  .list-item-left {
    width: 10%;
    height: 100%;
    padding: 3px 3px;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }
  .list-item-right {
    width: 90%;
    padding: 3px 0;
    border-bottom: 1px solid #e6d9d9;
    .right-name {
      font-size: 14px;
      width: 100%;
      text-align: left;
      color: #5e5eff;
    }
    .right-content {
      font-size: 15px;
      width: 100%;
      text-align: left;
      padding: 5px 0px;
    }
    .right-time {
      font-size: 12px;
      width: 100%;
      text-align: left;
      color: gray;
    }
  }
}
.van-cell--center {
  border: 1px #dac9c9 solid;
}
</style>