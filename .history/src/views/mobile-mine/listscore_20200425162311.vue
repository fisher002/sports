<template>
  <div>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <div v-if="data.list && data.list.length > 0">
        <div class="drop-menu">
          <van-search
            show-action
            style="width:100%"
            v-model="params.studentName"
            placeholder="请输入同学名称"
          >
            <template #action>
              <div @click="onSearch">搜索</div>
            </template>
          </van-search>
        </div>
        <div class="class-box">
          <div class="class-mate" v-for="item in data.list" :key="item.id" @click="showScore(item)">
            <div class="mate-name">
              <div>{{item.studentName}}</div>
              <div v-html="formatStatus(item.status)"></div>
            </div>
            <div class="mate-name mate-time">{{formatDate(item.createDate)}}</div>
          </div>
          <div class="class-mates" v-for="n in ((data.list.length % 2) == 0 ? 0 : 1)" :key="n"></div>
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
      </div>
      <van-empty v-else description="暂无同学报名" />
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
      showDig: false,
      scloading: false,
      isLoading: false,
      loading: false,
      data: "",
      pageNum: 1,
      students: "",
      studentData: {
        schoolCompateId: "",
        studentId: "",
        score: "",
        unit: "",
        remark: "",
        compateOrder: ""
      },
      params: {
        studentName: "",
        studentId: ""
      }
    };
  },
  created() {
    /**参数赋值 */
    let params = this.$route.query;
    for (let i in params) {
      this.params[i] = params[i];
    }
    this.getScoreList();
  },
  methods: {
    /**获取我的成绩 */
    getScoreList(type) {
      this.params.studentId = sessionStorage.getItem("studentId");
      let param = utils.checkParams(this.params);
      api.getScoreList(param).then(
        res => {
          this.isLoading = false;
          this.data = res.data.data;
        },
        res => {
          this.isLoading = false;
        }
      );
    },
    /**弹起评分 */
    showScore(item) {
      if (item) {
        this.students = item;
        this.showDig = !this.showDig;
        this.studentData.studentId = item.studentId;
        this.studentData.schoolCompateId = item.compateId;
      }
    },
    /**弹出框消失清楚studentData students数据 */
    clear() {
      for (let i in this.studentData) {
        this.studentData[i] = "";
      }
      this.students = "";
    },
    /**提交评分 */
    onSubmit() {
      this.addContestantScore();
    },
    /**运动员评分 */
    addContestantScore() {
      api.addContestantScore(this.studentData).then(
        res => {
          if (res.data.code == 10000) {
            this.showDig = false;
            this.clear();
            return;
          }
          Toast(res.data.msg);
        },
        res => {}
      );
    },
    /**加载更多 */
    toLoadMore() {
      this.loading = !this.loading;
      if (this.pageNum == this.data.pages) {
        this.loading = !this.loading;
        return;
      }
      if (this.data.hasNextPage) {
        this.pageNum++;
        this.getScoreList("0");
      }
    },
    /**onSearch搜索 */
    onSearch() {
      this.pageNum = 1;
      this.getScoreList();
    },
    /**下拉刷新 */
    onRefresh() {
      this.pageNum = 1;
      this.getScoreList();
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
.class-box {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px 0;
  .class-mate {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 40%;
    margin: 8px 10px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: #dacbcb 0 0 6px;
    .mate-name {
      display: flex;
      justify-content: space-around;
      width: 100%;
      padding: 5px 2px;
    }
    .mate-time {
      font-size: 15px;
      color: #b1a1a1;
    }
  }
  .class-mates {
    width: 40%;
    margin: 8px 10px;
  }
  .load-btn {
    width: 100%;
    height: 20px;
    line-height: 18px !important;
  }
}
.van-dialog {
  top: 51% !important;
}
</style>