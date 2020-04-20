<template>
  <div>
    <div v-if="type == 'user'">用户注册</div>
    <div v-if="type == 'admin'">管理员注册</div>
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