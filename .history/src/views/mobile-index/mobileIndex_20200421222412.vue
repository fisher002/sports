<template>
  <div>
    <top :data="title"></top>
    <div class="router-view"><router-view v-if="isRouterAlive" /></div>
    <bottom @setTitle="getTitle"></bottom>
  </div>
</template>
<script>
import bottom from "@/components/public/bottom";
import top from "@/components/public/top";
export default {
  components: { bottom, top },
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reloads: this.reloads
    };
  },
  data() {
    return {
      title: "",
      isRouterAlive: false
    };
  },
  methods: {
    getTitle(res) {
      this.title = res;
    },
    reloads() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function() {
        this.isRouterAlive = true; //再打开
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.router-view {
  width: 100%;
}
</style>