<template>
  <div>
    <van-pull-refresh v-if="data" v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <div class="item-box">
        <div class="drop-menu">
          <van-dropdown-menu style="width:30%">
            <van-dropdown-item v-model="value" :options="events" @change="getValue" />
          </van-dropdown-menu>
          <van-search
            show-action
            style="width:70%"
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
              <van-sidebar-item @click="getRule('男子 4*100 米')" title="男子 4*100 米" />
              <van-sidebar-item @click="getRule('女子 4*100 米')" title="女子 4*100 米" />
              <van-sidebar-item @click="getRule('男子 100 米')" title="男子 100 米" />
              <van-sidebar-item @click="getRule('女子 100 米')" title="女子 100 米" />
            </van-sidebar>
          </div>
          <div class="list-right">{{text}}</div>
        </div>
      </div>
    </van-pull-refresh>
    <van-empty v-else description="暂无数据" />
  </div>
</template>
<script>
import { Toast } from "vant";
import api from "./itemUrl";

export default {
  data() {
    return {
      isLoading: false,
      activeKey: 0,
      events: [],
      value: "",
      data: "",
      text: "",
      params: {
        compateEventId: "",
        compateEventName: ""
      }
    };
  },
  created() {
    this.getEventList();
  },
  methods: {
    /**获取类型数据 */
    getEventList() {
      // let demo = {
      //   text: e.eventName,
      //   value: e.id
      // };
      api.getEventList().then(
        res => {
          if(res.data.code == 10000){
            this.events = res.data.data;
          }
        },
        res => {}
      );
    },
    /**搜索 */
    onSearch() {},
    /**项目规则 */
    getRule(val) {
      this.text = val;
    },
    /**刷新 */
    onRefresh() {},
    /**下拉回调 */
    getValue(val) {}
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
      display: flex;
      justify-content: center;
      width: 70%;
      border: #d8caca 1px solid;
      border-radius: 5px;
      padding: 4px;
    }
  }
}
</style>