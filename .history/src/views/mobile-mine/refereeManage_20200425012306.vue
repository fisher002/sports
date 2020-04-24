<template>
  <div>
    <van-empty description="暂无数据" />
  </div>
</template>
<script>
import api from "./mineUrl";
import utils from "@/utils/comUtils";
import { Toast } from "vant";

export default {
  data() {
    return {
      data: "",
      params: {}
    };
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>