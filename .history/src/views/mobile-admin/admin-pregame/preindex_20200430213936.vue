<template>
  <div>
    <van-grid :column-num="3" clickable>
      <van-grid-item
        v-for="value in 6"
        :key="value"
        @click="toPath(value)"
        icon="photo-o"
        text="文字"
      />
    </van-grid>
  </div>
</template>
<script>
import { Toast } from "vant";

export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    /**路由跳转 */
    toPath(val) {
      Toast(val);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>