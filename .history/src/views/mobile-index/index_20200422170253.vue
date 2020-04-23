<template>
  <div>
    <div class="drop-menu">
      <van-dropdown-menu>
        <van-dropdown-item v-model="values" :options="schoolData" @change="getValue" />
      </van-dropdown-menu>
      <van-search show-action v-model="params.keyword" placeholder="请输入搜索关键词">
        <template #action>
          <div @click="onSearch(params.keyword)">搜索</div>
        </template>
      </van-search>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/comUtils";
import { Toast } from "vant";
import api from "./indexUrl";
export default {
  data() {
    return {
      values: 0,
      schoolData: [],
      params: {
        id: "",
        keyword: "",
        pageNumber: ""
      }
    };
  },
  created() {
    // this.checkLogin();
  },
  methods: {
    /**获取学校数据 */
    getSchoolList() {
      utils.getSchoolList().then(
        res => {
          if (res.data.code == 10000) {
            res.data.data.forEach(e => {
              let demo = {
                text: e.schoolName,
                value: e.id
              };
              this.schoolData.push(demo);
            });
          }
        },
        res => {
          Toast(res.data.msg);
        }
      );
    },
    /**检查是否登录 */
    checkLogin() {
      if (utils.checkLogin()) {
        utils.getMyMessage().then(
          res => {
            if (res.data.code == 10000) {
              this.schoolData = [
                {
                  text: res.data.data.schoolName,
                  value: 0
                }
              ];
              this.getSchoolList();
              // 获取对应比赛项目
            }
          },
          res => {}
        );
      } else {
        this.schoolData = [
          {
            text: "所有学校",
            value: 0
          }
        ];
        this.getSchoolList();
      }
    },
    /**下拉菜单回调 */
    getValue(val) {
      console.log(val);
    },
    /**onSearch */
    onSearch(val) {
      Toast(val)
    }
  }
};
</script>
<style lang="scss" scoped>
</style>