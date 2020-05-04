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
      canvas: null,
      height: null,
      width: null
    };
  },
  created() {
    window.addEventListener("resize", this.getWindowInfo); //注册监听器
    this.getWindowInfo(); //页面创建时先调用一次
  },
  mounted() {
    this.canvas = this.$refs.myCanvas;
    this.canvas.height = this.height;
    this.canvas.width = this.width;
    let x = 0,
      y = 0;
    let ctx = this.canvas.getContext("2d");
    ctx.beginPath();
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#000000";
    ctx.fillStyle = "#ffffff";
    ctx.arc(100, 100, 50, 0, 2 * Math.PI, true);
    ctx.stroke();
  },
  methods: {
    /**获取屏幕宽高 */
    getWindowInfo() {
      this.height = document.documentElement.clientHeight;
      this.width = document.documentElement.clientWidth;
    }
  },
  destroyed() {
    /**页面销毁后注销监听器 */
    window.removeEventListener("resize", this.getWindowInfo);
  }
};
</script>
<style lang="scss" scoped>
.index {
  position: relative;
  .btn {
    position: fixed;
    width: 100%;
    padding: 150px 0px;
    z-index: 999;
    .hide {
      width: 100%;
      margin: 15px 0;
    }
  }
  .canvas {
    z-index: 990;
    position: absolute;
    left: 0;
    background: #000000;
  }
}
</style>