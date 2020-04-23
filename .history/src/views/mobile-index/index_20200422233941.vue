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
          <div class="item-content">
            <div class="item-top font-size14">
              <div>名称：{{item.compateEventName}}</div>
              <div>场地：{{item.location}}</div>
              <div v-html="formatStatus(item.status)"></div>
            </div>
            <div class="item-top font-size13">
              <div>{{`仅${item.sexLimit == 'M' ? '男' : '女'}生`}}</div>
              <div>限制人数：{{item.quantityLimit}}人</div>
              <div>已报名人数：{{item.num}}人</div>
            </div>
            <div class="item-top font-size13">
              <div>开始时间：{{formatDate(item.startTime)}}</div>
              <div>结束时间：{{formatDate(item.endTime)}}</div>
            </div>
          </div>
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
        utils.getMyMessage().then(res => {
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
      let params = utils.checkParams(this.params);
      api.getSchoolCompatePageList(params, this.pageNum).then(
        res => {
          this.isLoading = false;
          if (res.data.code == 10000) {
            this.data = res.data.data;
            return;
          }
          Toast(res.data.msg);
        },
        res => {
          this.isLoading = false;
          Toast(res.data.msg);
        }
      );
    },
    /**下拉菜单回调 */
    getValue(val) {
      this.pageNum = 1;
      if (val > 0) {
        this.params.schoolId = val;
        this.getSchoolCompatePageList();
        return;
      }
      this.getSchoolCompatePageList();
    },
    /**onSearch搜索 */
    onSearch() {
      this.pageNum = 1;
      this.getSchoolCompatePageList();
    },
    /**下拉刷新 */
    onRefresh() {
      this.pageNum = 1;
      this.getSchoolCompatePageList();
    },
    /**状态格式化 */
    formatStatus(res) {
      if (res === "will") {
        return "<span style='color:#9e9e9e'>待开始</span>";
      }
      if (res === "ing") {
        return "<span style='color:#4caf50'>进行中</span>";
      }
      if (res === "ed") {
        return "<span style='color:#f44336'>已结束</span>";
      }
    },
    /**日期格式化 */
    formatDate(res) {
      return utils.formatDates(res);
    }
  }
};
</script>
<style lang="scss" scoped>
.font-size13 {
  font-size: 13px;
}
.font-size14 {
  font-size: 14px;
}
.font-size15 {
  font-size: 15px;
}
.game-list {
  .drop-menu {
    display: flex;
  }
  .data-list {
    display: flex;
    padding: 10px;
    flex-wrap: wrap;
    .list-item {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: #dacbcb 0 0 10px;
      margin: 8px 0;
      .item-title {
        display: flex;
        width: 100%;
        padding: 3px 5px;
        font-size: 17px;
        font-weight: bold;
      }
      .item-content {
        display: flex;
        width: 100%;
        padding: 3px 0;
        flex-wrap: wrap;
        .item-top {
          display: flex;
          width: 100%;
          justify-content: space-between;
          padding: 4px 5px;
        }
      }
    }
  }
}
</style>