<template>
  <div>
    <div v-if="data" class="item-box">
      <div class="drop-menu">
        <van-search
          show-action
          style="width:100%"
          v-model="params.compateEventName"
          placeholder="请输入比赛名称"
        >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </div>
      <div class="item-list">
        <div class="list-left">
          <van-sidebar v-model="activeKey">
            <van-sidebar-item title="标签名称" />
            <van-sidebar-item title="标签名称" />
            <van-sidebar-item title="标签名称" />
          </van-sidebar>
        </div>
        <div class="list-right"></div>
      </div>
    </div>
    <van-empty v-else description="暂无数据" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeKey: 0,
      data: "000",
      params: {
        id: "",
        compateEventName: ""
      }
    };
  },
  created() {
    /**参数赋值 */
    let params = this.$route.query;
    for (let i in params) {
      this.params[i] = params[i];
    }
  },
  methods: {
    /**搜索 */
    onSearch() {}
  }
};
</script>
<style lang="scss" scoped>
.item-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 5px 0;
  .drop-menu {
    display: flex;
    width: 100%;
  }
  .item-list {
    padding: 5px 3px;
    width: 100%;
    display: flex;
    .list-left {
      width: 25%;
      padding: 0 3px;
    }
    .list-right {
      width: 70%;
      border: #d8caca 1px solid;
      border-radius: 5px;
    }
  }
}
</style>