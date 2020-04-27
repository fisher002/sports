<template>
  <div class="wangeditor">
    <div ref="editor"></div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "wangEditor",
  data() {
    return {
      editor: null,
      editorContent: ""
    };
  }
};
</script>
<style lang="scss" scoped>
</style>