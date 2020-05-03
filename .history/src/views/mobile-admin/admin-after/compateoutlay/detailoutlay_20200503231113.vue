<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field v-model="data.outlayName" label="经费名称" clearable label-align="right" />
      <van-field v-model="data.outlaymenoy" label="费用" type="number" clearable label-align="right" />
      <div style="margin: 16px;">
        <van-button
          :loading="loading"
          loading-text="提交中..."
          round
          block
          type="info"
          native-type="submit"
        >立即提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
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
    onSubmit() {}
  }
};
</script>
<style lang="scss" scoped>
</style>