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
    <van-dialog v-model="showDig" title="运动员详情" show-cancel-button :showConfirmButton="false">
      <van-form @submit="onSubmit" v-if="students">
        <van-field
          v-model="students.compateName"
          label="项目"
          clearable
          readonly
          label-align="right"
        />
        <van-field
          v-model="students.studentName"
          label="名字"
          clearable
          readonly
          label-align="right"
        />
        <van-field
          :value="formatDate(students.createDate)"
          label="提交时间"
          clearable
          readonly
          label-align="right"
        />
        <van-field name="radio" label="状态" label-align="right">
          <template #input>
            <van-radio-group v-model="students.status" direction="horizontal">
              <van-radio name="check">审核中</van-radio>
              <van-radio name="no">审核失败</van-radio>
              <van-radio name="yes">审核成功</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button
            :loading="scloading"
            loading-text="提交中..."
            round
            block
            type="info"
            native-type="submit"
          >立即提交</van-button>
          <div style="height:10px"></div>
          <van-button round block type="danger" native-type="button" @click="delStudent">删除该学生</van-button>
        </div>
      </van-form>
    </van-dialog>
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
      scloading: false,
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
    /**弹起dig */
    showScore(item) {
      if (item) {
        this.students = item;
        this.showDig = !this.showDig;
      }
    },
    /**提交修改 */
    onSubmit() {
      api.editCompateStudent(this.students).then(
        res => {
          this.showDig = false;
          if (res.data.code == 10000) {
            Toast(res.data.msg);
          }
        },
        res => {
          this.showDig = false;
        }
      );
    },
    /**删除学生 */
    delStudent() {
      api.delCompateStudent({id: this.students.id}).then(
        res => {
          this.showDig = false;
          if (res.data.code == 10000) {
            Toast(res.data.msg);
            this.getStudentList();
          }
        },
        res => {
          this.showDig = false;
        }
      );
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
}
</style>