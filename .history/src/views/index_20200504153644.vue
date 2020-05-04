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
      width: null,
      ctx: null
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
    this.ctx = canvas.getContext("2d");
    this.ctx.shadowBlur = 30;
    this.ctx.shadowColor = "#ffffff";
    let grd = this.ctx.createRadialGradient(75, 50, 5, 90, 60, 100); // 创建一个径向/圆渐变
    grd.addColorStop(0.5, "blue");
    grd.addColorStop(1, "white");
    this.ctx.fillStyle = grd;
    let i = 0;
    let timer = setInterval(() => {
      i++;
      this.ctx.beginPath();
      this.ctx.arc(
        this.autoX(),
        this.autoY(),
        this.autoR(),
        0,
        2 * Math.PI,
        true
      );
      this.ctx.fill();
      this.ctx.stroke();
      if (i == 15) {
        clearInterval(timer);
      }
    }, 1000);
  },
  methods: {
    /**获取屏幕宽高 */
    getWindowInfo() {
      this.height = document.documentElement.clientHeight;
      this.width = document.documentElement.clientWidth;
    },
    /**横向变化 */
    autoX() {
      let x1 = 0;
      x1 = Math.floor(Math.random() * (this.width - 50)) + 50;
      return x1;
    },
    /**纵向变化 */
    autoY() {
      let y1 = 0;
      y1 = Math.floor(Math.random() * (this.height - 50)) + 50;
      return y1;
    },
    /**半径变化 */
    autoR() {
      let r1 = 0;
      r1 = Math.floor(Math.random() * 50) + 5;
      return r1;
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