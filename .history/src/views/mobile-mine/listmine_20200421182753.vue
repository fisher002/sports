<template>
  <div>我的</div>
</template>
<script>
export default {
  data() {
    return {
      isLogin: false,
      userData: ""
    };
  },
  created() {
    if (
      sessionStorage.getItem("user") &&
      sessionStorage.getItem("isLogin") == "true"
    ) {
        this.isLogin = true;
        this.userData = sessionStorage.getItem("user");
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>