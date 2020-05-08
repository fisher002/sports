<template>
  <div>
    <van-field v-if="data.url == 'image'" label="图片" label-align="right">
      <template #input>
        <van-uploader
          upload-text="小于1Mb"
          v-model="imgList"
          :after-read="upLoadFile"
          :max-count="1"
        />
      </template>
    </van-field>
    <div class="send-btn">
      <van-button
        style="width:80%"
        type="primary"
        @click="onSumbit"
        :loading="loading"
        loading-text="发布中..."
      >发布</van-button>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/comUtils";
import { Toast } from "vant";
import api from "./scrollUrl";

export default {
  data() {
    return {
      loading: false,
      imgList: [],
      data: {
        url: ""
      }
    };
  },
  methods: {
    /**确认发布 */
    onSumbit() {
      this.loading = !this.loading;
      if (this.data.url) {
        api.addScroll(this.data).then(
          res => {
            this.loading = !this.loading;
          },
          res => {
            this.loading = !this.loading;
          }
        );
      }
    },
    /**文件上传 */
    upLoadFile(file) {
      // 创建form对象
      this.imgList = [];
      let formdata = new FormData();
      formdata.append("file", file.file);
      utils.upLoadFile(formdata).then(
        res => {
          if (res.data.code == 10000) {
            this.data.url = res.data.data.url;
            this.imgList.push({
              url: `${utils.returnUrl()}/${res.data.data.url}`
            });
            Toast(res.data.msg);
          }
        },
        res => {}
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.send-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;
}
</style>