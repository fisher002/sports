<template>
  <div>
    <div class="drop-menu">
      <van-dropdown-menu>
        <van-dropdown-item v-model="text" :options="schoolData" @change="getValue" />
      </van-dropdown-menu>
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
      text: "",
      schoolData: []
    };
  },
  created() {},
  methods: {
    /**获取学校数据 */
    getSchoolList() {
      if (this.schoolData.length > 0) {
        return;
      }
      this.schoolData = [];
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
    /**下拉菜单回调 */
    getValue(val) {
      console.log(val)
    }
  }
};
</script>
<style lang="scss" scoped>
</style>