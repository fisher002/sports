<template>
  <div class="game-list">
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <div class="data-list" v-if="data.list && data.list.length > 0">
        <div v-if="ingData" style="width: 100%">
          <div class="sort-title">正在进行的赛事</div>
          <div class="list-item" v-for="item in ingData" :key="item.id" @click="toDeatil(item.id)">
            <div class="item-title">{{item.schoolName}}</div>
            <div class="item-content">
              <div class="item-top font-size14">
                <div>名称：{{item.compateEventName}}</div>
                <div>场地：{{item.location}}</div>
                <div v-html="formatStatus(item.status)"></div>
              </div>
              <div class="item-top font-size13 color-g">
                <div>开始时间：{{formatDate(item.startTime)}}</div>
                <div>结束时间：{{formatDate(item.endTime)}}</div>
              </div>
            </div>
          </div>
          <van-empty v-if="ingData.length <= 0" description="暂无正在进行的比赛" />
        </div>
        <div v-if="willData" style="width: 100%">
          <div class="sort-title">即将进行的赛事</div>
          <div class="list-item" v-for="item in willData" :key="item.id" @click="toDeatil(item.id)">
            <div class="item-title">{{item.schoolName}}</div>
            <div class="item-content">
              <div class="item-top font-size14">
                <div>名称：{{item.compateEventName}}</div>
                <div>场地：{{item.location}}</div>
                <div v-html="formatStatus(item.status)"></div>
              </div>
              <div class="item-top font-size13 color-g">
                <div>开始时间：{{formatDate(item.startTime)}}</div>
                <div>结束时间：{{formatDate(item.endTime)}}</div>
              </div>
            </div>
          </div>
          <van-empty v-if="willData.length <= 0" description="暂无将要进行的比赛" />
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
    <div class="fixed bottom-right">
      <van-button style="width:100%" type="default" to="/user/listtournaments" size="small">全部赛事流程</van-button>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/comUtils";
import { Toast } from "vant";
import api from "./courUrl";
export default {
  data() {
    return {
      loading: false,
      isLoading: false,
      values: 0,
      data: "",
      pageNum: 1,
      willData: [],
      ingData: [],
      params: {
        status: "",
        schoolId: ""
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
        this.params.schoolId = sessionStorage.getItem("schoolId");
        this.getSchoolCompatePageList();
      }
    },
    /**获取比赛项目信息 */
    getSchoolCompatePageList(type) {
      let params = utils.checkParams(this.params);
      api.getSchoolCompatePageList(params, this.pageNum).then(
        res => {
          this.isLoading = false;
          if (res.data.code == 10000) {
            if (type === "0") {
              this.data.list.push(...res.data.data.list);
              this.willData.push(...this.sortDataw(res.data.data.list));
              this.ingData.push(...this.sortDatai(res.data.data.list));
              return;
            }
            this.willData = this.sortDataw(res.data.data.list);
            this.ingData = this.sortDatai(res.data.data.list);
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
    /**数据分类ing */
    sortDatai(data) {
      let datas = [];
      if (data) {
        data.forEach(e => {
          if (e.status === "ing") {
            datas.push(e);
          }
        });
        return datas;
      }
    },
    /**数据分类will */
    sortDataw(data) {
      let datas = [];
      if (data) {
        data.forEach(e => {
          if (e.status === "will") {
            datas.push(e);
          }
        });
        return datas;
      }
    },
    /**加载更多 */
    toLoadMore() {
      this.loading = !this.loading;
      if (this.pageNum == this.data.pages) {
        return;
      }
      if (this.data.hasNextPage) {
        this.pageNum++;
        this.getSchoolCompatePageList("0");
      }
    },
    /**下拉刷新 */
    onRefresh() {
      this.pageNum = 1;
      this.getSchoolCompatePageList();
    },
    /**toDeatil */
    toDeatil(id) {
      // this.$router.push({
      //   path: "/user/detailcompate",
      //   query: {
      //     compateId: `${id}`
      //   }
      // });
    },
    /**状态格式化 */
    formatStatus(res) {
      return utils.formatStatus(res);
    },
    /**日期格式化 */
    formatDate(res) {
      return utils.formatDates(res);
    }
  }
};
</script>
<style lang="scss" scoped>
.fixed {
  position: fixed;
  width: 45%;
}
.bottom-right {
  top: 46px;
  right: 0;
}
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
    .sort-title {
      display: flex;
    }
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
.van-empty {
 padding: 0 !important;
}
</style>