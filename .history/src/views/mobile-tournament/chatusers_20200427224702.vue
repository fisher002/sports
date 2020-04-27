<template></template>
<script>
import utils from "@/utils/comUtils";
import { Toast } from "vant";
import api from "./courUrl";

export default {
  data() {
    return {
      loading: false,
      data: [],
      pageNum: 1,
      params: {
        compateId: ""
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
      }
    },
    /**获取实时聊天内容 */
    getChatPageList(type) {
      api.getChatPageList(this.params, this.pageNum).then(
        res => {
          if (res.data.code == 10000) {
            this.loading = !this.loading;
            if (type === "0") {
              this.data.list.push(...res.data.data.list);
              return;
            }
            this.data = res.data.data;
            return;
          }
          Toast(res.data.msg);
          this.loading = !this.loading;
        },
        res => {
          Toast(res.data.msg);
          this.loading = !this.loading;
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
      this.getSchoolCompatePageList();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>