<template>
  <div>
    <van-field
      label="资源类型"
      placeholder="请选择资源类型"
      :rules="[{ required: true, message: '请选择资源类型' }]"
      label-align="right"
    >
      <template #input>
        <van-radio-group v-model="medias.mediaType" direction="horizontal">
          <van-radio name="image">图片</van-radio>
          <van-radio name="video">视频</van-radio>
          <van-radio name="text">文字</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field v-if="medias.mediaType == 'image'" label="图片" label-align="right">
      <template #input>
        <van-uploader
          upload-text="小于1Mb"
          v-model="imgList"
          :after-read="upLoadFile"
          :max-count="1"
        />
      </template>
    </van-field>
    <van-field v-if="medias.mediaType == 'video'" label="视频" label-align="right">
      <template #input>
        <van-uploader upload-text="小于1Mb" :after-read="upLoadFile">
          <van-button icon="video-o" type="primary">上传视频</van-button>
        </van-uploader>
      </template>
    </van-field>
    <editor v-if="medias.mediaType == 'text'" @setContent="getContent"></editor>
    <div class="send-btn">
      <van-button
        style="width:80%"
        :loading="loading"
        loading-text="发布中..."
        type="danger"
        @click="setMediaContent"
      >发布</van-button>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/comUtils";
import { Toast } from "vant";
import { Dialog } from "vant";
import api from "./wonderfulUrl";
import editor from "@/components/public/wangEditor";

export default {
  components: { editor },
  data() {
    return {
      loading: false,
      data: "",
      medias: {
        compateId: "",
        mediaContent: "",
        mediaType: "image"
      },
      params: {
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
    /**获取富文本组件回调 */
    getContent(val) {
      if (val) {
        this.medias.mediaContent = val;
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
            this.medias.mediaContent = res.data.data.url;
            this.imgList.push({
              url: `${utils.returnUrl()}/${res.data.data.url}`
            });
            Toast(res.data.msg);
          }
        },
        res => {
          Toast(res.data.msg);
        }
      );
    },
    /**确认发布 */
    setMediaContent() {
      this.medias.compateId = this.params.compateId;
      api.addMedia(this.medias).then(
        res => {
          if (res.data.code == 10000) {
            Toast("发布成功");
            return;
          }
          Toast(res.data.msg);
        },
        res => {
          Toast("发布失败");
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
</style>