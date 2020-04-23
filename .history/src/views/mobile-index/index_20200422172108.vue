<template>
  <div class="game-list">
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <div class="drop-menu">
        <van-dropdown-menu style="width:30%">
          <van-dropdown-item v-model="values" :options="schoolData" @change="getValue" />
        </van-dropdown-menu>
        <van-search style="width:70%" show-action v-model="params.keyword" placeholder="请输入搜索关键词">
          <template #action>
            <div @click="onSearch(params.keyword)">搜索</div>
          </template>
        </van-search>
      </div>
      <div class="data-list" v-if="data">
        <div class="list-item">
          <div class="item-title"></div>
          <div class="item-content"></div>
        </div>
      </div>
      <div v-else>
        <van-empty description="暂无数据" />
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import utils from "@/utils/comUtils";
import { Toast } from "vant";
import api from "./indexUrl";
export default {
  data() {
    return {
      isLoading: false,
      values: 0,
      schoolData: [],
      data: "",
      params: {
        id: "",
        keyword: "",
        pageNumber: ""
      }
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    /**获取学校数据 */
    getSchoolList() {
      utils.getSchoolList().then(
        res => {
          if (res.data.code == 10000) {
            res.data.data.forEach(e => {
              let demo = {
                text: e.schoolName,
                value: e.id
              };
              this.schoolData.push(demo);
            });
          }
        },
        res => {
          Toast(res.data.msg);
        }
      );
    },
    /**检查是否登录 */
    checkLogin() {
      if (utils.checkLogin()) {
        utils.getMyMessage().then(
          res => {
            if (res.data.code == 10000) {
              this.schoolData = [
                {
                  text: res.data.data.schoolName,
                  value: 0
                }
              ];
              this.getSchoolList();
              // 获取对应比赛项目
            }
          },
          res => {}
        );
      } else {
        this.schoolData = [
          {
            text: "所有学校",
            value: 0
          }
        ];
        this.getSchoolList();
      }
    },
    /**下拉菜单回调 */
    getValue(val) {
      Toast(val);
    },
    /**onSearch搜索 */
    onSearch(val) {
      Toast(val);
    },
    /**下拉刷新 */
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    }
  }
};
</script>
<style lang="scss" scoped>
.game-list {
  .drop-menu {
    display: flex;
  }
  .data-list {
    display: flex;
  }
}
</style>