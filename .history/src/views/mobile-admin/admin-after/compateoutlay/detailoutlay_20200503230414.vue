<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {
      data: {
        compateId: "",
        outlayName: "",
        outlaymenoy: "",
        compateName: ""
      },
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
    /**新增经费统计 */
    addOutLay() {}
  }
};
</script>
<style lang="scss" scoped>
</style>