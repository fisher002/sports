<template>
  <div class="item">
    <van-grid :column-num="3" clickable>
      <van-grid-item
        v-for="item in data"
        :key="item.id"
        @click="toPath(item)"
        :icon="item.icon"
        :text="item.label"
      />
    </van-grid>
  </div>
</template>
<script>
import { Toast } from "vant";
import items from "./item";

export default {
  data() {
    return {
      data: [...items]
    };
  },
  created() {},
  methods: {
    /**路由跳转 */
    toPath(item) {
      Toast(item.label);
      //   if (item) {
      //     this.$router.replace(item.path);
      //   }
    }
  }
};
</script>
<style lang="scss" scoped>
.item {
  padding: 5px 0;
}
</style>