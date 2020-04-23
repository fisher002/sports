<template>
  <div>
    <van-tabs v-model="activeName">
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
          <van-field v-model="data.name" label="赛事场地" label-align="right" readonly />
          <van-field label="状态" v-html="formatStatus(data.status)" label-align="right" readonly />
          <van-field
            label="性别限制"
            label-align="right"
            :value="data.sexLimit == 'M' ? '男' : '女'"
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
          <van-field label="规则" :value="data.rule" label-align="right" readonly />
        </van-form>
        <div style="margin: 16px;">
          <van-button plain hairline type="info" @click="toSignUp()">提交报名</van-button>
        </div>
      </van-tab>
      <van-tab title="报名同学" name="b">报名同学</van-tab>
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
      activeName: "a",
      data: "",
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
  },
  methods: {
    /**获取赛事详情 */
    getCompateDetail() {
      let param = utils.checkParams(this.params);
      api.getSchoolCompateList(param).then(
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
    /**报名 */
    toSignUp() {},
    /**日期格式化 */
    formatDate(res) {
      return utils.formatDates(res);
    },
    /**状态格式化 */
    formatStatus(res) {
      return utils.formatStatus(res);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>