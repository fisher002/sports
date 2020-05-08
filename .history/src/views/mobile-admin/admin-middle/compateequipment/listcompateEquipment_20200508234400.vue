<template>
  <div class="game-list">
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <div class="drop-menu">
        <van-search
          style="width:100%"
          show-action
          v-model="params.compateName"
          placeholder="请输入比赛名称"
        >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </div>
      <div class="data-list" v-if="data.list && data.list.length > 0">
        <div class="list-item" v-for="item in data.list" :key="item.id" @click="toDeatil(item)">
          <div class="item-title">{{item.compateName}}</div>
          <div class="item-content">
            <div class="item-top font-size14">
              <div>名称：{{item.equipmentName}}</div>
              <div>数量：{{item.sum}}</div>
              <div v-html="formatStatus(item.status)"></div>
            </div>
            <div class="item-top font-size13 color-g">
              <div>租借时间：{{formatDate(item.createDate)}}</div>
            </div>
          </div>
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
import api from "./equipmentUrl";
export default {
  data() {
    return {
      loading: false,
      isLoading: false,
      data: "",
      pageNum: 1,
      params: {
        status: "",
        compateName: "" // 关键字
      }
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    /**检查是否登录 */
    checkLogin() {
      if (utils.checkLogin()) {
        // 获取对应比赛项目
        this.getCompateEquipmentPageList();
      }
    },
    /**获取比赛项目信息 */
    getCompateEquipmentPageList(type) {
      let params = utils.checkParams(this.params);
      api.getCompateEquipmentPageList(params, this.pageNum).then(
        res => {
          this.isLoading = false;
          this.loading = false;
          if (res.data.code == 10000) {
            if (type === "0") {
              this.data.list.push(...res.data.data.list);
              this.data.hasNextPage = res.data.data.hasNextPage;
              return;
            }
            this.data = res.data.data;
            return;
          }
          Toast(res.data.msg);
        },
        res => {
          this.isLoading = false;
          this.loading = false;
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
        this.getCompateEquipmentPageList("0");
      }
    },
    /**onSearch搜索 */
    onSearch() {
      this.pageNum = 1;
      this.getCompateEquipmentPageList();
    },
    /**下拉刷新 */
    onRefresh() {
      this.pageNum = 1;
      this.getCompateEquipmentPageList();
    },
    /**toDeatil */
    toDeatil(item) {
      if (item.status === "will") {
        return;
      }
      this.$router.push({
        path: "/admin/listcompatescore",
        query: {
          schoolCompateId: `${item.id}`
        }
      });
    },
    /**状态格式化 */
    formatStatus(res) {
      if (res === "no") {
        return "<span style='color:#ff0000'>未退还</span>";
      }
      if (res === "ing") {
        return "<span style='color:#ff0000'>审核中</span>";
      }
      if (res === "yes") {
        return "<span style='color:#4caf50'>已退还</span>";
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
.game-list {
  .drop-menu {
    display: flex;
  }
  .data-list {
    display: flex;
    padding: 0 10px;
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
    .load-btn {
      width: 100%;
      height: 20px;
      line-height: 18px !important;
    }
  }
}
</style>