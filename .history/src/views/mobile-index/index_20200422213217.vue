<template>
  <div class="game-list">
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <div class="drop-menu">
        <van-dropdown-menu style="width:30%">
          <van-dropdown-item v-model="values" :options="schoolData" @change="getValue" />
        </van-dropdown-menu>
        <van-search
          style="width:70%"
          show-action
          v-model="params.compateEventName"
          placeholder="请输入搜索关键词"
        >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </div>
      <div class="data-list" v-if="data.list">
        <div class="list-item" v-for="item in data.list" :key="item.id">
          <div class="item-title">{{item.schoolName}}</div>
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
      pageNum: 1,
      params: {
        compateEventParentId: "",
        compateEventId: "",
        sexLimit: "",
        startTime: "",
        endTime: "",
        status: "",
        schoolId: "",
        compateEventName: "" // 关键字
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
      this.schoolData = [
        {
          text: "所有学校",
          value: 0
        }
      ];
      this.getSchoolList();
      if (utils.checkLogin()) {

        utils.getMyMessage().then(
          res => {
            if (res.data.code == 10000) {
              // 获取对应比赛项目
              this.params.schoolId = res.data.data.schoolId;
              this.getSchoolCompatePageList();
            }
          });
      } else {
        this.getSchoolCompatePageList();
      }
    },
    /**获取比赛项目信息 */
    getSchoolCompatePageList() {
      this.params = utils.checkParams(this.params);
      api.getSchoolCompatePageList(this.params, this.pageNum).then(
        res => {
          if (res.data.code == 10000) {
            this.data = res.data.data;
            return;
          }
          Toast(res.data.msg);
        },
        res => {
          Toast(res.data.msg);
        }
      );
    },
    /**下拉菜单回调 */
    getValue(val) {
      if (val != 0) {
        this.params.schoolId = val;
        this.getSchoolCompatePageList();
      }
    },
    /**onSearch搜索 */
    onSearch(val) {
      console.log(utils.checkParams(this.params));
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