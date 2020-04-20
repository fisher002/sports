<template>
  <div>
    <div v-if="type == 'user'">
      <img src="https://img.yzcdn.cn/vant/apple-3.jpg" />
    </div>
    <div v-if="type == 'admin'">
      <img src="https://img.yzcdn.cn/vant/apple-3.jpg" />
    </div>
  </div>
</template>
<script>
export default {
  props: { type: "" },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
</style>