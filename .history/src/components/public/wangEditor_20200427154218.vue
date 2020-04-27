<template>
  <div class="wangeditor">
    <div ref="editor"></div>
  </div>
</template>
<script>
import E from "wangeditor";
import utils from "@/utils/comUtils";
export default {
  name: "wangEditor",
  data() {
    return {
      editor: null,
      editorContent: ""
    };
  },
  mounted() {
    this.editor = new E(this.$refs.editor);
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
      this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
    };
    this.editor.customConfig.uploadImgServer = "你的上传图片的接口";
    this.editor.customConfig.uploadFileName = "你自定义的文件名";
    // 忽略粘贴内容中的图片
    this.editor.customConfig.pasteIgnoreImg = true;
    this.editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
    // 将图片大小限制为 5M
    this.editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024;
    this.editor.customConfig.menus = [
      // 菜单配置
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
    // 自定义图片上传方法
    this.editor.customConfig.customUploadImg = function(files, insert) {
      // files 是 input 中选中的文件列表
      if (files) {
        console.log("上传图片吗");
      }
      // insert 是获取图片 url 后，插入到编辑器的方法

      // 上传代码返回结果之后，将图片插入到编辑器中
    //   insert(imgUrl);
    };

    this.editor.create(); // 创建富文本实例
    if (!this.content) {
      this.editor.txt.html("请编辑内容1");
    }
  }
};
</script>
<style lang="scss" scoped>
</style>