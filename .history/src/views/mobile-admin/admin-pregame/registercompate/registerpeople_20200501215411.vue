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
import api from "./registerUrl";

export default {
  data() {
    return {
      isLoading: false,
      loading: false,
      showDig: false,
      data: "",
      students: "",
      pageNum: 1,
      params: {
        compateId: ""
      }
    };
  },
  created() {
    /**参数赋值 */
    let params = this.$route.query;
    for (let i in params) {
      this.params[i] = params[i];
    }
    this.getStudentList();
  },
  methods: {
    /**获取报名同学 */
    getStudentList(type) {
      this.params.schoolId = sessionStorage.getItem("schoolId");
      let param = utils.checkParams(this.params);
      api.getCompateStudentPageList(param, this.pageNum).then(
        res => {
          this.isLoading = false;
          if (type === "0") {
            this.data.list.push(...res.data.data.list);
            return;
          }
          this.data = res.data.data;
        },
        res => {
          this.isLoading = false;
        }
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
        this.getStudentList("0");
      }
    },
    /**onSearch搜索 */
    onSearch() {
      this.pageNum = 1;
      this.getStudentList();
    },
    /**下拉刷新 */
    onRefresh() {
      this.pageNum = 1;
      this.getStudentList();
    },
    /**弹起评分 */
    showScore(item) {
      if (item) {
        this.students = item;
        this.showDig = !this.showDig;
      }
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
</style>