<template>
  <div>
    <div class="fixed-top"><top :data="title"></top></div>
    <div class="router-view"><router-view /></div>
    <bottom @setTitle="getTitle"></bottom>
  </div>
</template>
<script>
import bottom from "@/components/public/bottom";
import top from "@/components/public/top";
export default {
  components: { bottom, top },
  data() {
    return {
      title: ""
    };
  },
  methods: {
    getTitle(res) {
      this.title = res;
    }
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
}
</style>