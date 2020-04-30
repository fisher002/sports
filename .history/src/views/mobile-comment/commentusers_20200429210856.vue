<template>
  <div>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh"></van-pull-refresh>
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
      api.getCompateCommentPageList({ compateId: this.params.compateId },this.pageNum).then(
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
    addComment() {
      api.addComment(this.params).then(
        res => {},
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
</style>