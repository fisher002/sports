<template>
  <div>
    <!-- <van-empty description="暂无数据" /> -->
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
    /**获取富文本组件回调 */
    getContent(val) {
      console.log(val);
    },
  }
};
</script>
<style lang="scss" scoped>
</style>