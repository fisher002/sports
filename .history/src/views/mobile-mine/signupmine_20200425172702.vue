<template>
  <div class="game-list">
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
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
      <div class="data-list" v-if="data.list && data.list.length > 0">
        <div class="list-item" v-for="item in data.list" :key="item.id">
          <van-swipe-cell :disabled="item.status == 'check' ? false : true">
            <div class="item-title">{{item.compateName}}</div>
            <div class="item-content">
              <div class="item-top font-size14">
                <div>学校：{{item.schoolName}}</div>
                <div v-html="formatStatus(item.status)"></div>
              </div>
              <div class="item-top font-size13 color-g">
                <div>申请类型：{{item.studentGroup == 'referee' ? '裁判' : '运动员'}}</div>
                <div>申请时间：{{formatDate(item.createDate)}}</div>
              </div>
            </div>
            <template #right>
              <van-button
                square
                text="取消报名"
                type="danger"
                @click="toDelete(item.id)"
                class="delete-button"
              />
            </template>
          </van-swipe-cell>
        </div>
        <div class="load-btn" v-show="data.hasNextPage">
          <van-button
            class="load-btn"
            @click="toLoadMore"
            :loading="loading"
            type="info"
            loading-text="加载中..."
          >点击加载更多</van-button>
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
import { Dialog } from "vant";
import api from "./mineUrl";
export default {
  data() {
    return {
      loading: false,
      isLoading: false,
      values: 0,
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
        studentId: "",
        compateEventName: "" // 关键字
      }
    };
  },
  created() {
    /**参数赋值 */
    let params = this.$route.query;
    for (let i in params) {
      this.params[i] = params[i];
    }
    this.checkLogin();
  },
  methods: {
    /**检查是否登录 */
    checkLogin() {
      if (utils.checkLogin()) {
        this.getpersonalCompatePageList();
      }
    },
    /**获取比赛项目信息 */
    getpersonalCompatePageList(type) {
      let params = utils.checkParams(this.params);
      api.getpersonalCompatePageList(params, this.pageNum).then(
        res => {
          this.isLoading = false;
          if (res.data.code == 10000) {
            if (type === "0") {
              this.data.list.push(...res.data.data.list);
              return;
            }
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
    /**加载更多 */
    toLoadMore() {
      this.loading = !this.loading;
      if (this.pageNum == this.data.pages) {
        return;
      }
      if (this.data.hasNextPage) {
        this.pageNum++;
        this.getpersonalCompatePageList("0");
      }
    },
    /**onSearch搜索 */
    onSearch() {
      this.pageNum = 1;
      this.getpersonalCompatePageList();
    },
    /**下拉刷新 */
    onRefresh() {
      this.pageNum = 1;
      this.getpersonalCompatePageList();
    },
    /**取消报名 */
    toDelete(id) {
      Dialog.confirm({
        message: "确定取消报名吗？"
      })
        .then(() => {
          this.deteleSignUp(id);
        })
        .catch(() => {});
    },
    /**取消报名 */
    deteleSignUp(id) {
      api.deletepersonalCompate({ id: id }).then(res => {
        if (res.data.code == 10000) {
          this.pageNum = 1;
          this.getpersonalCompatePageList();
          return;
        }
        Toast(res.data.msg);
      });
    },
    /**状态格式化 */
    formatStatus(res) {
      if (res === "check") {
        return "<span style='color:#ff0000'>审核中</span>";
      }
      if (res === "no") {
        return "<span style='color:#9e9e9e'>审核失败</span>";
      }
      if (res === "yes") {
        return "<span style='color:#4caf50'>审核成功</span>";
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
.color-g {
  color: #969494;
}
.delete-button {
  height: 100%;
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
      border-radius: 10px;
      flex-wrap: wrap;
      overflow: hidden;
      box-shadow: #dacbcb 0 0 10px;
      margin: 8px 0;
      .item-title {
        display: flex;
        width: 100%;
        padding: 3px 10px;
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
          padding: 4px 10px;
          justify-content: space-between;
        }
      }
    }
    .load-btn {
      width: 100%;
      height: 20px;
      line-height: 18px !important;
    }
  }
}
</style>