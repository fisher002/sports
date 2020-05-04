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
      height: null,
      width: null
    };
  },
  created() {
    window.addEventListener("resize", this.getWindowInfo); //注册监听器
    this.getWindowInfo(); //页面创建时先调用一次
  },
  mounted() {
    let canvas = this.$refs.myCanvas;
    canvas.height = this.height;
    canvas.width = this.width;
    this.createSrc(canvas);
  },
  methods: {
    /**获取屏幕宽高 */
    getWindowInfo() {
      this.height = document.documentElement.clientHeight;
      this.width = document.documentElement.clientWidth;
    },
    /**自定义创建圆 */
    createSrc(canvas) {
      let ctx = canvas.getContext("2d");
      ctx.shadowBlur = 30;
      ctx.shadowColor = "#ffffff";
      let grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100); // 创建一个径向/圆渐变
      grd.addColorStop(0, "blue");
      grd.addColorStop(1, "white");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(this.autoX(), this.autoY(), 50, 0, 2 * Math.PI, true);
      ctx.fill();
      ctx.stroke();
    },
    /**纵向变化 */
    autoY() {
      let y = this.height + 100;
      let timer = setInterval(() => {
        y -= 1;
      }, 1000);
      if (y == -100) {
        y = this.height + 100;
      }
      console.log('y'+y)
      return y;
    },
    /**横向变化 */
    autoX() {
      let x = 0;
      x = Math.floor(Math.random() * this.width) + 50;
      console.log('x'+x)
      return x;
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