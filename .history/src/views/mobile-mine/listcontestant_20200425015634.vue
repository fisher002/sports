<template>
  <div>
    <div v-if="data.list && data.list.length > 0" class="class-box">
      <div class="class-mate" v-for="item in data.list" :key="item.id">
        <div class="mate-name">{{item.studentName}}</div>
        <div class="mate-name mate-time">{{formatDate(item.createDate)}}</div>
      </div>
      <div class="class-mates" v-for="n in ((data.list.length % 2) == 0 ? 0 : 1)" :key="n"></div>
    </div>
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
      data: "",
      pageNum: 1,
      params: {
        studentGroup: "contestant",
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
  },
  methods: {
    /**获取报名同学 */
    getStudentList() {
      let param = utils.checkParams(this.params);
      api.getCompateStudentPageList(param, this.pageNum).then(
        res => {
          this.classMates = res.data.data;
        },
        res => {}
      );
    }
  }
};
</script>
<style lang="scss" scoped>
</style>