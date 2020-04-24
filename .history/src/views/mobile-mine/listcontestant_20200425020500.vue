<template>
  <div>
    <van-pull-refresh
      v-if="data.list && data.list.length > 0"
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
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
        <div class="class-mate" v-for="item in data.list" :key="item.id">
          <div class="mate-name">{{item.studentName}}</div>
          <div class="mate-name mate-time">{{formatDate(item.createDate)}}</div>
        </div>
        <div class="class-mates" v-for="n in ((data.list.length % 2) == 0 ? 0 : 1)" :key="n"></div>
      </div>
    </van-pull-refresh>
    <van-empty v-else description="暂无同学报名" />
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
      isLoading: false,
      loading: false,
      data: "",
      pageNum: 1,
      params: {
        studentGroup: "contestant",
        compateId: "",
        studentName: ""
      }
    };
  },
  created() {
    /**参数赋值 */
    let params = this.$route.query;
    for (let i in params) {
      this.params[i] = params[i];
    }
  },
  methods: {
    /**获取报名同学 */
    getStudentList(type) {
      let param = utils.checkParams(this.params);
      api.getCompateStudentPageList(param, this.pageNum).then(
        res => {
          this.data = res.data.data;
        },
        res => {}
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
  }
};
</script>
<style lang="scss" scoped>
</style>