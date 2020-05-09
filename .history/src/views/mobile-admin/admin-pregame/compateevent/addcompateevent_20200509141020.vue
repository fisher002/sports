<template>
  <div class="item-box">
    <van-radio-group v-model="type" direction="horizontal">
      <van-radio name="parent">父级</van-radio>
      <van-radio name="child">子级</van-radio>
    </van-radio-group>
    <van-form @submit="onSubmit">
      <div v-if="type === 'parent'" class="parent">
        <van-field
          v-model="data.compateEventName"
          label="名称"
          label-align="right"
          placeholder="请填写名称"
          :rules="[{ required: true, message: '请填写名称' }]"
        />
      </div>
      <div v-if="type === 'child'" class="parent">
        <van-field
          v-model="data.compateEventName"
          label="名称"
          label-align="right"
          placeholder="请填写名称"
          :rules="[{ required: true, message: '请填写名称' }]"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="value"
          label="父级项目"
          placeholder="点击选择"
          @click="getEventList"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="events"
            @confirm="onConfirm"
            @cancel="showPicker = false"
            :loading="evloading"
          />
        </van-popup>
      </div>
      <div style="margin: 16px;">
        <van-button
          :loading="loading"
          loading-text="提交中..."
          round
          block
          type="info"
          native-type="submit"
        >立即提交</van-button>
        <div style="height:10px"></div>
      </div>
    </van-form>
  </div>
</template>
<script>
import api from "./eventUrl";
import { Toast } from "vant";

export default {
  data() {
    return {
      loading: false,
      showPicker: false,
      evloading: false,
      type: "parent",
      value: "",
      events: [],
      data: {
        compateEventName: "",
        parentId: ""
      }
    };
  },
  methods: {
    /**获取项目列表 */
    getEventList() {
      this.showPicker = true;
      this.evloading = true;
      api.getEventList({}).then(res => {
        if (res.data.code == 10000) {
          res.data.data.forEach(e => {
            if (e.parentId == null || e.parentId == "") {
              let demo = {
                text: e.compateEventName,
                value: e.id
              };
              this.events.push(demo);
              this.evloading = false;
            }
          });
        }
      });
    },
    /**提交 */
    onSubmit() {
      this.loading = !this.loading;
      api.addEvent(this.data).then(
        res => {
          this.loading = !this.loading;
          Toast(res.data.msg);
        },
        res => {
          this.loading = !this.loading;
        }
      );
    },
    /**父级选择 */
    onConfirm(val) {
      this.value = val.text;
      this.data.parentId = val.value;
      this.showPicker = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.item-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px 0;
  .parent {
    width: 100%;
  }
}
</style>