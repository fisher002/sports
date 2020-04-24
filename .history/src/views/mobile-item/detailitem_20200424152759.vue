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
      data: "",
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
      border: rgb(216, 202, 202) 1px solid;
    }
  }
}
</style>