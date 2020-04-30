<template>
  <div>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh"></van-pull-refresh>
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
              if (type === "0") {
                this.data.list.push(...res.data.data.list);
                return;
              }
              this.data = res.data.data;
              return;
            }
            Toast(res.data.msg);
          },
          res => {}
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
    /**下拉刷新 */
    onRefresh() {
      this.pageNum = 1;
      this.getCompateCommentPageList();
    }
  }
};
</script>
<style lang="scss" scoped>
.chat-send {
  position: fixed;
  width: 100%;
  bottom: 50px;
}
.van-cell--center {
  border: 1px #dac9c9 solid;
}
</style>