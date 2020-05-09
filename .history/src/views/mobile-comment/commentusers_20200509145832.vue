<template>
  <div class="comment-box">
    <div v-if="data && data.list.length > 0">
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <div class="list-item" v-for="item in data.list" :key="item.id">
          <div class="list-item-left">
            <img :src="formatUrl(item.userInfo.avatarUrl)" />
          </div>
          <div class="list-item-right">
            <div class="right-name">{{item.userInfo.name}}</div>
            <div class="right-content">{{item.commentContent}}</div>
            <div class="right-time">
              <span>{{formatDate(item.createDate)}}</span>
              <span
                class="font-blue"
                v-show="checkMine(item.userInfo)"
                @click="delComment(item.id)"
              >删除</span>
            </div>
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
    </div>
    <van-empty v-else description="暂无数据" />
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
import { Dialog } from "vant";
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
              this.loading = false;
              if (type === "0") {
                this.data.list.push(...res.data.data.list);
                this.data.hasNextPage = res.data.data.hasNextPage;
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
            this.loading = false;
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
    /**检查是否为我的评论 */
    checkMine(info) {
      let userId = sessionStorage.getItem("userId");
      if (userId === `${info.id}`) {
        return true;
      }
      return false;
    },
    /**删除我的评论 */
    delComment(id) {
      Dialog.confirm({
        message: "是否确认删除"
      })
        .then(() => {
          api.delComment({ id: Number(id) }).then(res => {
            this.getCompateCommentPageList();
            Toast(res.data.msg);
          });
        })
        .catch(() => {});
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
    formatDate(res) {
      return utils.formatTime(res);
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
      .font-blue {
        color: #5e5eff;
        margin-left: 20px;
      }
    }
  }
}
.van-cell--center {
  border: 1px #dac9c9 solid;
}
</style>