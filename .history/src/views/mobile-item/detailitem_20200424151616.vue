<template>
  <div>
    <div v-if="data" class="item-box">
        
    </div>
    <van-empty v-else description="暂无数据" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: "",
      params: {
        id: ""
      }
    };
  },
  created() {
    /**参数赋值 */
    let params = this.$route.query;
    for (let i in params) {
      this.params[i] = params[i];
    }
  }
};
</script>
<style lang="scss" scoped>
</style>