<template></template>
<script>
import utils from "@/utils/comUtils";
import { Toast } from "vant";
import api from "./courUrl";

export default {
  data() {
    return {
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
  },
  methods: {
    /**检查是否登录 */
    checkLogin() {
      if (utils.checkLogin()) {
        this.getChatPageList();
      }
    },
    /**获取实时聊天内容 */
    getChatPageList() {
      api.getChatPageList(this.params, this.pageNum).then(
        res => {
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
        res => {
          Toast(res.data.msg);
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
</style>