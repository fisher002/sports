<template>
  <div class="item">
    <van-grid :column-num="3" clickable>
      <van-grid-item
        v-for="item in data"
        :key="item.id"
        @click="toPath(item.label)"
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
    toPath(val) {
      Toast(val);
    }
  }
};
</script>
<style lang="scss" scoped>
.item {
  padding: 5px 0;
}
</style>