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
            <div class="item-top">
              <div>名称：{{item.compateEventName}}</div>
              <div>类型：{{item.compateEventParentName}}</div>
              <div>状态：{{item.status}}</div>
            </div>
            <div class="item-top">
              <div>场地：{{item.location}}</div>
              <div>{{`仅${item.sexLimit == 'M' ? '男' : '女'}生`}}</div>
              <div>限制人数：{{item.quantityLimit}}人</div>
              <div>已报名人数：{{item.num}}人</div>
            </div>
            <div class="item-top">
              <div>开始时间：{{item.startTime}}</div>
              <div>结束时间：{{item.endTime}}</div>
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
    padding: 10px;
    flex-wrap: wrap;
    .list-item {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: #f7f0f0 0 0 8px;
      margin: 5px 0;
      .item-title {
        display: flex;
        width: 100%;
        padding: 3px 0;
      }
      .item-content {
        display: flex;
        width: 100%;
        padding: 3px 0;
        flex-wrap: wrap;
        .item-top {
          display: flex;
          width: 100%;
          font-size: 15px;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>