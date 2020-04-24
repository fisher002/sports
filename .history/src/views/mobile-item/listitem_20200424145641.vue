<template>
  <div>
    <div v-if="data" class="item-box">
      <div class="item" v-for="item in data" :key="item.id" @click="toDetail(item.id)">
        <span>{{item.name}}</span>
      </div>
    </div>
    <van-empty v-else description="暂无数据" />
  </div>
</template>
<script>
import { Toast } from "vant";
import api from './itemUrl'

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
  },
  created() {},
  methods: {
    /**项目详情 */
    toDetail(id) {
      Toast(id)
    }
  }
};
</script>
<style lang="scss" scoped>
.item-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 40px 0;
  .item {
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: #c3b1b1 1px solid;
    box-shadow: #b1a2a2 0 0 10px;
  }
}
</style>