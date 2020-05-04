<template>
  <div class="index">
    <div class="btn">
      <van-button to="/user" type="primary" block round>用户入口</van-button>
      <div class="hide"></div>
      <van-button to="/adminlogin" type="primary" block round>管理员入口</van-button>
    </div>
    <canvas ref="myCanvas" class="canvas"></canvas>
  </div>
</template>
<script>
export default {
  data() {
    return {
      canvas: null
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.index {
  position: relative;
  .btn {
    flex-wrap: wrap;
    position: fixed;
    width: 100%;
    padding: 150px 0px;
    .hide {
      width: 100%;
      margin: 15px 0;
    }
  }
  .canvas {
    width: 100%;
    height: 100%;
    background: #000000;
  }
}
</style>