<template>
  <div>
    <top :data="title"></top>
    <router-view />
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
</style>