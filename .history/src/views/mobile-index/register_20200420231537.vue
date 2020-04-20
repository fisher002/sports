<template>
  <div>
      <div v-if="type == 'user'"></div>
      <div v-if="type == 'admin'"></div>
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