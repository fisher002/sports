<template>
  <div>
    <div v-if="data" class="item-box">
      <div class="item" v-for="item in data" :key="item.id">
        <span>{{item.name}}</span>
      </div>
    </div>
    <van-empty v-else description="暂无数据" />
  </div>
</template>
<script>
const item = [
  { name: "田赛", id: 1 },
  { name: "径赛", id: 2 },
  { name: "其他", id: 3 }
];
export default {
  data() {
    return {
      data: [...item]
    };
  }
};
</script>
<style lang="scss" scoped>
.item-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 15px 0;
  .item {
    width: 35%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>