<template>
  <div>
    <div class="fixed-top">
      <top></top>
    </div>
    <div class="router-view">
      <router-view />
    </div>
    <bottom></bottom>
  </div>
</template>
<script>
import bottom from "@/components/public/admin-bottom";
import top from "@/components/public/top";
export default {
  components: { bottom, top },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.router-view {
  width: 100%;
  padding: 46px 0;
}
.fixed-top {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
}
</style>