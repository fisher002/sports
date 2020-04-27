<template>
  <div>
    <!-- <van-empty description="暂无数据" /> -->
    <editor @setContent="getContent"></editor>
  </div>
</template>
<script>
import editor from "@/components/public/wangEditor";
export default {
  components: { editor },
  data() {
    return {};
  },
  methods: {
    getContent(val) {
      console.log(val);
    },
  }
};
</script>
<style lang="scss" scoped>
</style>