<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="data.compateEventName"
        label="赛事"
        placeholder="请选择赛事"
        clearable
        readonly
        label-align="right"
        @click="showCompate"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :loading="comloading"
          :columns="compateList"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <van-field name="radio" label="性别限制" label-align="right">
        <template #input>
          <van-radio-group v-model="data.sexLimit" direction="horizontal">
            <van-radio name="M">男</van-radio>
            <van-radio name="F">女</van-radio>
            <van-radio name>不限</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="data.quantityLimit"
        label="人数限制"
        placeholder="请填写人数限制"
        type="number"
        clearable
        :rules="[{ required: true, message: '请填写人数限制' }]"
        label-align="right"
      />
      <van-field
        label="开始时间"
        readonly
        :value="data.startTime == '' ? '' : formatDate(data.startTime)"
        placeholder="请选择开始时间"
        clearable
        :min-date="minDate"
        label-align="right"
        @click="showStartDatePicker = true"
      />
      <van-popup v-model="showStartDatePicker" position="bottom">
        <van-datetime-picker
          v-model="data.startTime"
          type="datetime"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="showStartDatePicker = false"
          @cancel="showStartDatePicker = false"
        />
      </van-popup>
      <van-field
        label="结束时间"
        readonly
        placeholder="请选择结束时间"
        :value="data.endTime == '' ? '' : formatDate(data.endTime)"
        clearable
        label-align="right"
        @click="showEndDatePicker = true"
      />
      <van-popup v-model="showEndDatePicker" position="bottom">
        <van-datetime-picker
          v-model="data.endTime"
          type="datetime"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="showEndDatePicker = false"
          @cancel="showEndDatePicker = false"
        />
      </van-popup>
      <van-field
        v-model="data.location"
        label="比赛地点"
        placeholder="请填写比赛地点"
        clearable
        :rules="[{ required: true, message: '请填写比赛地点' }]"
        label-align="right"
      />
      <van-field label="报名通道" clearable label-align="right" readonly>
        <template #input>
          <van-switch
            active-value="Y"
            inactive-value="N"
            v-model="data.signUpStatus"
            active-color="#07c160"
            inactive-color="#ee0a24"
          />
        </template>
      </van-field>
      <van-field
        v-model="data.rule"
        label="规则"
        placeholder="请填写规则"
        clearable
        :rules="[{ required: true, message: '请填写规则' }]"
        label-align="right"
      />
      <div style="margin: 16px;">
        <van-button
          :loading="loading"
          loading-text="发布中..."
          round
          block
          type="info"
          native-type="submit"
        >立即发布</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { Toast } from "vant";
import api from "./pregameUrl";
import utils from "@/utils/comUtils";
export default {
  props: { type: "" },
  data() {
    return {
      loading: false,
      comloading: false,
      showStartDatePicker: false,
      showEndDatePicker: false,
      showPicker: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      compateList: [],
      data: {
        compateEventId: "",
        compateEventName: "",
        sexLimit: "",
        quantityLimit: "",
        startTime: "",
        endTime: "",
        rule: "",
        location: "",
        signUpStatus: "N"
      }
    };
  },
  created() {},
  methods: {
    /**获取类型数据 */
    getEventList() {
      this.compateList = [];
      this.comloading = !this.comloading;
      api.getEventList({}).then(
        res => {
          this.comloading = !this.comloading;
          if (res.data.code == 10000) {
            res.data.data.forEach(e => {
              if (e.parentId != null) {
                let demo = {
                  text: e.compateEventName,
                  value: e.id
                };
                this.compateList.push(demo);
              }
            });
          }
        },
        res => {
          this.comloading = !this.comloading;
        }
      );
    },
    /**发布赛事 */
    onSubmit() {
      this.loading = !this.loading;
      api.addSchoolCompate(this.data).then(
        res => {
          this.loading = !this.loading;
          if (res.data.code == 10000) {
            Toast(res.data.msg);
            return;
          }
          Toast(res.data.msg);
        },
        res => {
          this.loading = !this.loading;
        }
      );
    },
    /**选择赛事 */
    showCompate() {
      this.showPicker = true;
      this.getEventList();
    },
    /**选择学校值,用户 */
    onConfirm(val) {
      this.data.compateEventId = val.value;
      this.data.compateEventName = val.text;
      this.showPicker = false;
    },
    /**密码验证,自定义,用户 */
    checkPassword(val) {
      if (val === this.data.password) {
        return true;
      }
      return false;
    },
    /**手机号码验证,自定义,用户 */
    checkPhone(val) {
      let result = /^1[3456789]\d{9}$/;
      if (val !== "") {
        if (!result.test(val)) {
          return false;
        } else {
          return true;
        }
      }
      return false;
    },
    /**日期格式化 */
    formatDate(res) {
      return utils.formatDatev(res);
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
}
</style>