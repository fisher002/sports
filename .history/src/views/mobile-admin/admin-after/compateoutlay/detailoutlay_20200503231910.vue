<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="data.outlayName"
        label="经费名称"
        clearable
        label-align="right"
        :rules="[{ required: true, message: '经费名称不能为空' }]"
      />
      <van-field
        v-model="data.outlayMenoy"
        label="费用"
        type="number"
        clearable
        label-align="right"
        :rules="[{ required: true, message: '费用不能为空' }]"
      />
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
import utils from "@/utils/comUtils";
import { Toast } from "vant";
import api from "./outlayUrl";

export default {
  data() {
    return {
      loading: false,
      data: {
        compateId: "",
        outlayName: "",
        outlayMenoy: ""
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
    onSubmit() {
      if (this.params.compateId) {
        this.loading = !this.loading;
        this.data.compateId = this.params.compateId;
        api.addOutLay(this.data).then(
          res => {
            this.loading = !this.loading;
            Toast(res.data.msg);
          },
          res => {
            this.loading = !this.loading;
          }
        );
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>