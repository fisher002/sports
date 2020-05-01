<template>
  <div class="wangeditor">
    <div ref="editor"></div>
    <!-- <div class="send-btn">
      <van-button native-type="button" style="width:80%" type="danger" @click="setContent">{{title =="" ? "确认" : title}}</van-button>
    </div>-->
  </div>
</template>
<script>
import E from "wangeditor";
import utils from "@/utils/comUtils";
import { Toast } from "vant";

export default {
  name: "wangEditor",
  props: { content: "" },
  data() {
    return {
      editor: null,
      editorContent: ""
    };
  },
  computed: {
    hear() {
      return this.content;
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editor);
    this.editor.customConfig.onchange = html => {
      this.$emit("setContent", html);
    };
    // 自定义 onchange 触发的延迟时间，默认为 200 ms
    this.editor.customConfig.onchangeTimeout = 100; // 单位 ms
    // this.editor.customConfig.uploadImgServer = "你的上传图片的接口";
    // this.editor.customConfig.uploadFileName = "你自定义的文件名";
    // 忽略粘贴内容中的图片
    this.editor.customConfig.pasteIgnoreImg = true;
    this.editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
    // 将图片大小限制为 5M
    this.editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024;
    // 限制一次最多上传 1 张图片
    // this.editor.customConfig.uploadImgMaxLength = 1;
    // z-index
    this.editor.customConfig.zIndex = 100;
    this.editor.customConfig.menus = [
      // 菜单配置
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "foreColor", // 文字颜色
      "link", // 插入链接
      "justify", // 对齐方式
      //   "image", // 插入图片
      "undo" // 撤销
    ];
    // 自定义图片上传方法
    this.editor.customConfig.customUploadImg = function(files, insert) {
      // files 是 input 中选中的文件列表
      if (files) {
        if (files.length > 1) {
          Toast("一次只能上传一张图片");
          return;
        }
        let file = new FormData();
        file.append("file", files[0]);
        utils.upLoadFile(file).then(
          res => {
            if (res.data.code == 10000) {
              insert(`${utils.returnUrl()}${res.data.data.url}`);
            }
          },
          res => {
            Toast("error");
          }
        );
      }
      // insert 是获取图片 url 后，插入到编辑器的方法
      // 上传代码返回结果之后，将图片插入到编辑器中
      //   insert(imgUrl);
    };

    this.editor.create(); // 创建富文本实例
    if (this.hear()) {
      this.editor.txt.html(this.hear());
    }else {
      this.editor.txt.html("请编写内容");
    }
  },
  methods: {
    /**获取editor文本内容 */
    // setContent() {
    //   if (this.editorContent) {
    //     this.$emit("setContent", this.editorContent);
    //   } else {
    //     this.$emit("setContent", null);
    //   }
    // }
  }
};
</script>
<style lang="scss" scoped>
.wangeditor {
  width: 100%;
  .send-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }
}
</style>