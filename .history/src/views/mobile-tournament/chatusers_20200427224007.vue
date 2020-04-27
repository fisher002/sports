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
  created() {},
  methods: {
    /**检查是否登录 */
    checkLogin() {
      if (utils.checkLogin()) {
        this.getChatPageList();
      }
    },
    /**获取实时聊天内容 */
    getChatPageList() {
      let params = utils.checkParams(this.params);
      api.getChatPageList(params, this.pageNum).then(
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