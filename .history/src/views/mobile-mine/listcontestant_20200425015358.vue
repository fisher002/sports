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
export default {
  data() {
    return {
      data: "",
      params: {
        studentGroup: "contestant",
        compateId: ""
      }
    };
  },
  created() {},
  methods: {
    /**获取报名同学 */
    getStudentList() {
      let param = { compateId: this.params.compateId };
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