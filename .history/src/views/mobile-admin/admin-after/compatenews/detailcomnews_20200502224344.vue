<template>
  <div>
    <editor v-if="medias.mediaType == 'text'" @setContent="getContent"></editor>
    <div class="send-btn">
      <van-button
        style="width:80%"
        :loading="loading"
        loading-text="发布中..."
        type="danger"
        @click="setMediaNews"
      >发布</van-button>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/comUtils";
import { Toast } from "vant";
import api from "./newsUrl";
import editor from "@/components/public/wangEditor";

export default {
  components: { editor },
  data() {
    return {
      loading: false,
      data: "",
      imgList: [],
      medias: {
        compateId: "",
        mediaContent: "",
        mediaType: "news"
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
    setMediaNews() {
      this.medias.compateId = this.params.compateId;
      this.loading = !this.loading;
      api.addNews(this.medias).then(
        res => {
          this.loading = !this.loading;
          Toast(res.data.msg);
        },
        res => {
          Toast("发布失败");
          this.loading = !this.loading;
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
</style>