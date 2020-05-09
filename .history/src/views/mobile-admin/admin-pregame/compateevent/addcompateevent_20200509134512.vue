<template>
  <div>
    <van-radio-group v-model="type" direction="horizontal">
      <van-radio name="parent">父级</van-radio>
      <van-radio name="child">子级</van-radio>
    </van-radio-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: "parent",
      data: {
        compateEventName: "",
        parentId: ""
      }
    };
  }
};
</script>
<style lang="scss" scoped>
</style>