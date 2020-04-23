<template>
  <div>
    <van-tabs v-model="activeName" @change="resultBack">
      <van-tab title="赛事详情" name="a">
        <van-form>
          <van-field label="学校" :value="data.schoolName" label-align="right" readonly />
          <van-field v-model="data.compateEventName" label="赛事名称" label-align="right" readonly />
          <van-field
            label="赛事类型"
            v-model="data.compateEventParentName"
            label-align="right"
            readonly
          />
          <van-field v-model="data.location" label="赛事场地" label-align="right" readonly />
          <van-field label="状态" :value="formatStatus(data.status)" label-align="right" readonly />
          <van-field
            label="性别限制"
            label-align="right"
            :value="data.sexLimit == '' ? '无限制' : data.sexLimit == 'M' ? '男' : '女'"
            readonly
          ></van-field>
          <van-field :value="data.quantityLimit" label="限制人数" label-align="right" readonly />
          <van-field
            :value="data.startTime == '' ? '' : formatDate(data.startTime)"
            label="开始时间"
            label-align="right"
            readonly
          />
          <van-field
            :value="data.endTime == '' ? '' : formatDate(data.endTime)"
            label="结束时间"
            label-align="right"
            readonly
          />
          <van-collapse v-model="activeNames" accordion>
            <van-collapse-item title="规则" name="1">
              <div v-html="data.rule"></div>
            </van-collapse-item>
          </van-collapse>
        </van-form>
        <div style="margin: 16px 10px;">
          <van-button
            :loading="loading"
            size="large"
            :type="isSignUp ? 'primary' : 'info'"
            :disabled="isSignUp"
            @click="toSignUp()"
            loading-text="报名中..."
          >{{btnText}}</van-button>
          <div style="padding: 5px 0;"></div>
          <van-button
            size="large"
            type="info"
            :disabled="isSignUp"
            :loading="reloading"
            @click="toSignUpReferee()"
            loading-text="申请中..."
          >申请成为裁判</van-button>
        </div>
      </van-tab>
      <van-tab title="已报名同学" name="b">
        <div v-if="classMates"></div>
        <van-empty v-else description="暂无同学报名" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import utils from "@/utils/comUtils";
import { Toast } from "vant";
import api from "./indexUrl";
export default {
  data() {
    return {
      loading: false,
      reloading: false,
      isSignUp: false,
      btnText: "我要报名",
      activeName: "a",
      activeNames: [],
      data: "",
      classMates: "",
      params: {
        compateId: "",
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
    this.getCompateDetail();
    if (utils.checkLogin()) {
      this.checkSignUp();
    }
  },
  methods: {
    /**获取赛事详情 */
    getCompateDetail() {
      let id = this.params.compateId;
      api.getCompateDetail(id).then(
        res => {
          if (res.data.code == 10000) {
            this.data = res.data.data;
          }
        },
        res => {
          Toast(res.data.msg);
        }
      );
    },
    /**获取报名同学 */
    getCompateStudentList() {

    },
    /**标签回调 */
    resultBack(val) {
      console.log(val);
    },
    /**报名 */
    toSignUp() {
      if (!utils.checkLogin()) {
        Toast("未登录，不可报名");
        return;
      }
      if (this.checkSignUp()) {
        return;
      }
      let param = utils.checkParams(this.params);
      this.loading = !this.loading;
      api.toSignUp(param).then(
        res => {
          if (res.data.code == 10000) {
            this.loading = !this.loading;
            this.isSignUp = true;
            this.btnText = "报名成功";
            Toast(res.data.msg);
            return;
          }
          this.isSignUp = false;
          this.loading = false;
          Toast(res.data.msg);
        },
        res => {
          this.isSignUp = false;
          this.loading = !this.loading;
          Toast(res.data.msg);
        }
      );
    },
    /**检查是否已报名 */
    checkSignUp() {
      this.params.studentId = sessionStorage.getItem("userId");
      api.getCompateStudentList(this.params).then(
        res => {
          if (res.data.data.length > 0) {
            this.isSignUp = true;
            this.btnText = "您已报名";
            return true;
          }
          return false;
        },
        res => {
          return false;
        }
      );
    },
    /**申请成为裁判 */
    toSignUpReferee() {
      this.reloading = !this.reloading;
      let param = utils.checkParams(this.params);
      api.toSignUpReferee(param).then(
        res => {
          this.reloading = !this.reloading;
          Toast(res.data.msg)
        },
        res => {
          this.reloading = !this.reloading;
        }
      );
    },
    /**日期格式化 */
    formatDate(res) {
      return utils.formatDates(res);
    },
    /**状态格式化 */
    formatStatus(res) {
      return utils.formatStatusV(res);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>