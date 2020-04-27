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
    getChatPageList() {}
  }
};
</script>
<style lang="scss" scoped>
</style>