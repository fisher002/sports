<template>
  <div>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <div v-if="data">
        <div class="drop-menu">
          <van-search
            show-action
            style="width:100%"
            v-model="params.schoolCompateName"
            placeholder="请输入项目名称"
          >
            <template #action>
              <div @click="onSearch">搜索</div>
            </template>
          </van-search>
        </div>
        <div class="class-box" v-if="data.list && data.list.length > 0">
          <div class="list-item" v-for="item in data.list" :key="item.id" @click="toAppeal(item)">
            <div class="item-title">{{item.schoolCompateName}}</div>
            <div class="item-content">
              <div class="item-top font-size14">
                <div>分数：{{`${item.score}/${item.unit}`}}</div>
                <div class="color-g">{{formatDate(item.createDate)}}</div>
                <div class="color-g">点击可申述</div>
              </div>
              <div class="item-top font-size13 color-g">
                <div>备注：{{item.remark.substring(0,25)}}...</div>
              </div>
            </div>
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
        <van-empty v-else description="暂无数据" />
      </div>
      <van-empty v-else description="暂无数据" />
    </van-pull-refresh>
    <van-dialog
      v-model="showDig"
      title="成绩申述"
      show-cancel-button
      :showConfirmButton="false"
      @closed="clear"
    >
      <van-form @submit="onSubmit">
        <van-field
          v-model="scores.schoolCompateName"
          label="申述项目"
          clearable
          readonly
          label-align="right"
        />
        <van-field
          v-model="scores.studentName"
          label="名字"
          clearable
          readonly
          label-align="right"
        />
        <van-field
          v-model="appealData.appealContent"
          label="申述内容"
          placeholder="请填写申述内容"
          type="textarea"
          maxlength="250"
          show-word-limit
          autosize
          clearable
          label-align="right"
        />
        <div style="margin: 16px;">
          <van-button
            :loading="scloading"
            loading-text="提交中..."
            round
            block
            type="info"
            native-type="submit"
          >立即提交</van-button>
        </div>
      </van-form>
    </van-dialog>
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
      scores: "",
      appealData: {
        compateId: "",
        appealContent: ""
      },
      params: {
        schoolCompateName: "",
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
      let param = utils.checkParams(this.params);
      api.getScoreList(param, this.pageNum).then(
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
    /**成绩申述 */
    toAppeal(item) {
      if (item) {
        this.scores = item;
        this.showDig = !this.showDig;
        this.appealData.compateId = item.schoolCompateId;
      }
    },
    /**弹出框消失清楚appealData scores数据 */
    clear() {
      for (let i in this.appealData) {
        this.appealData[i] = "";
      }
      this.scores = "";
    },
    /**提交评分 */
    onSubmit() {
      this.addAppeal();
    },
    /**运动员评分 */
    addAppeal() {
      api.addAppeal(this.appealData).then(
        res => {
          if (res.data.code == 10000) {
            this.showDig = false;
            this.clear();
            Toast('申述'+res.data.msg)
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
.class-box {
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
        align-items: center;
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
.van-dialog {
  top: 51% !important;
}
</style>