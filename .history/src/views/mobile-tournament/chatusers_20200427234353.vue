<template>
  <div>
    <div v-if="data" class="chat-box">
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <div v-for="item in data.list" :key="item.id" class="chat-item">
          <div v-html="item.mediaContent" class="item"></div>
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
    <div class="chat-send">
      <van-field
        rows="1"
        v-model="params.mediaContent"
        center
        clearable
        placeholder="文明发言"
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
import api from "./courUrl";

export default {
  data() {
    return {
      isLoading: false,
      loading: false,
      data: [],
      pageNum: 1,
      params: {
        compateId: "",
        mediaContent: "",
        mediaType: "text"
      }
    };
  },
  created() {
    /**参数赋值 */
    let params = this.$route.query;
    for (let i in params) {
      this.params[i] = params[i];
    }
    this.checkLogin();
  },
  methods: {
    /**检查是否登录 */
    checkLogin() {
      if (utils.checkLogin()) {
        this.getChatPageList();
        this.autoGetMessage();
      }
    },
    /**获取实时聊天内容 */
    getChatPageList(type) {
      let compateId = { compateId: this.params.compateId };
      this.isLoading = !this.isLoading;
      api.getChatPageList(compateId, this.pageNum).then(
        res => {
          if (res.data.code == 10000) {
            this.loading = !this.loading;
            this.isLoading = !this.isLoading;
            if (type === "0") {
              this.data.list.push(...res.data.data.list);
              return;
            }
            this.data = res.data.data;
            return;
          }
          Toast(res.data.msg);
          this.loading = !this.loading;
          this.isLoading = !this.isLoading;
        },
        res => {
          Toast(res.data.msg);
          this.loading = !this.loading;
          this.isLoading = !this.isLoading;
        }
      );
    },
    /**加载更多 */
    toLoadMore() {
      this.loading = !this.loading;
      if (this.pageNum == this.data.pages) {
        return;
      }
      if (this.data.hasNextPage) {
        this.pageNum++;
        this.getChatPageList("0");
      }
    },
    /**下拉刷新 */
    onRefresh() {
      this.pageNum = 1;
      this.getChatPageList();
    },
    /**实时获取数据1.5s */
    autoGetMessage() {
      let _that = this;
      setInterval(() => {
        _that.toLoadMore();
      }, 1500);
    },
    /**发送我的消息 */
    sendChat() {
      if (this.params.mediaContent == "") {
        Toast("不能发送空白内容");
        return;
      }
      api.addMedia(this.params).then(
        res => {
          if (res.data.code == 10000) {
            this.getChatPageList();
            return;
          }
          Toast("发送失败");
        },
        res => {
          Toast("发送失败");
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.chat-box {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding-bottom: 50px;
  .chat-item {
    width: 100%;
    .item {
      border-radius: 5px;
      overflow: hidden;
      box-shadow: #dacbcb 0 0 5px;
      margin: 10px 0;
    }
  }
  .load-btn {
    width: 100%;
    height: 20px;
    line-height: 18px !important;
  }
}
.chat-send {
  position: fixed;
  width: 100%;
  bottom: 50px;
}
.van-cell {
  padding: 5px !important;
  border: 1px solid #efdbdb;
}
</style>