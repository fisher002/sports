<template>
  <div class="account-box">
    <div class="account-title">我的账户</div>
    <div class="account-demo" v-if="data">
      <div class="demo-list" v-for="(item,index) in data" :key="index">
        <div class="list icon">
          <van-icon :name="item.icon" :color="item.color" />
        </div>
        <div class="list name">{{item.name}}</div>
        <div class="list sum">{{item.sum}}</div>
      </div>
    </div>
  </div>
</template>
<script>
const icons = [
  {
    icon: "edit",
    color: "#ff7878",
    name: "笔记",
    sum: "0条"
  },
  {
    icon: "todo-list-o",
    color: "#FF9800",
    name: "历史",
    sum: "0条"
  },
  {
    icon: "down",
    color: "#89dc28",
    name: "下载",
    sum: "0条"
  },
  {
    icon: "like-o",
    color: "#ff7878",
    name: "收藏",
    sum: "0条"
  }
];
export default {
  data() {
    return {
      data: icons
    };
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.account-box {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 5px;
  border-bottom: 1px #e6dede solid;
  .account-title {
    display: flex;
    width: 100%;
    border-left: 5px solid #8cc4fc;
    padding: 0 5px;
  }
  .account-demo {
    display: flex;
    width: 100%;
    .demo-list {
      display: flex;
      width: 25%;
      flex-wrap: wrap;
      padding: 5px 0;
      .list {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        padding: 3px 0;
      }
    }
  }
}
.icon {
  font-size: 40px;
}
.name {
}
.sum {
  font-size: 14px;
  color: #dfd1d1;
}
</style>