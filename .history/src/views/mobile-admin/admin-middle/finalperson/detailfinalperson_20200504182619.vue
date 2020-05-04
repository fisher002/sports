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
          <van-checkbox-group
            v-model="students"
            ref="checkboxGroup"
            style="width: 100%;padding: 0 5px;"
          >
            <div class="class-mate" v-for="item in data.list" :key="item.id">
              <div class="mate-name">
                <div>{{item.name}}</div>
                <div>{{item.sex == 'M' ? '男' : '女'}}</div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
            </div>
          </van-checkbox-group>
          <div class="load-btn" v-show="data.hasNextPage">
            <van-button
              class="load-btn"
              @click="toLoadMore"
              :loading="loading"
              type="info"
              loading-text="加载中..."
            >点击加载更多</van-button>
          </div>
          <div v-if="data.list.length > 0" class="re-btn">
            <van-button
              @click="addFinalStudents"
              style="width:100%"
              :loading="reloading"
              type="info"
              loading-text="添加中..."
            >立即添加</van-button>
          </div>
        </div>
      </div>
      <van-empty v-else description="暂无数据" />
    </van-pull-refresh>
  </div>
</template>
<script>
import utils from "@/utils/comUtils";
import { Toast } from "vant";
import api from "./finalUrl";

export default {
  data() {
    return {
      reloading: false,
      isLoading: false,
      loading: false,
      data: "",
      students: [],
      pageNum: 1,
      params: {
        compateId: "",
        schoolId: "",
      },
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
      api.getCompateStudentPageList({schoolId: this.params.schoolId}, this.pageNum).then(
        res => {
          this.isLoading = false;
          this.loading = false;
          if (type === "0") {
            this.data.list.push(...res.data.data.list);
            this.data.hasNextPage = res.data.data.hasNextPage;
            return;
          }
          this.data = res.data.data;
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
    /**立即添加决赛名单 */
    addFinalStudents() {
      if (this.students.length <= 0) {
        Toast("未选择，无法操作");
        return;
      }
      let demo = { compateId: "", students: [] };
      if (this.params.compateId) {
        this.reloading = !this.reloading;
        demo.compateId = this.params.compateId;
        demo.students = this.students;
        api.addFinalStudents(demo).then(
          res => {
            Toast(res.data.msg);
            this.reloading = !this.reloading;
          },
          res => {
            this.reloading = !this.reloading;
          }
        );
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
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: #dacbcb 0 0 6px;
    margin: 10px 0;
    .mate-name {
      display: flex;
      justify-content: space-around;
      width: 100%;
      padding: 5px 2px;
    }
  }
  .load-btn {
    width: 100%;
    height: 20px;
    line-height: 18px !important;
  }
  .re-btn {
    width: 100%;
    padding: 15px 5px;
  }
}
</style>