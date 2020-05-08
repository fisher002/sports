<template>
  <div class="game-list">
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <div class="data-list" v-if="data.list && data.list.length > 0">
        <div class="list-item" v-for="item in data.list" :key="item.id" @click="toDeatil(item)">
          <div class="item-content">
            <div class="item-top font-size14">
              <div>
                <img width="65" height="65" :src="returnImg(item.url)" />
              </div>
              <div class="item-left">
                <div class="item-title font">{{item.schoolName}}</div>
                <div class="font">{{formatDate(item.createDate)}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="load-btn" v-show="data.hasNextPage">
          <van-button
            class="load-btn"
            @click="toLoadMore"
            :loading="loading"
            type="info"
            loading-text="加载中..."
          >点击加载更多</van-button>
        </div>
      </div>
      <div v-else>
        <van-empty description="暂无数据" />
      </div>
    </van-pull-refresh>
    <van-dialog v-model="showDig" show-cancel-button :showConfirmButton="false">
      <van-form @submit="onSubmit">
        <van-field v-model="sumdata.compateName" label="项目" clearable readonly label-align="right" />
        <van-field v-model="sumdata.schoolName" label="名称" clearable readonly label-align="right" />
        <van-field
          :value="formatDate(sumdata.createDate)"
          label="修改时间"
          clearable
          readonly
          type="number"
          label-align="right"
        />
        <van-field label="图片" label-align="right">
          <template #input>
            <van-uploader
              upload-text="小于1Mb"
              v-model="imgList"
              :after-read="upLoadFile"
              :max-count="1"
            />
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button
            :loading="scloading"
            loading-text="修改中..."
            round
            block
            type="info"
            native-type="submit"
          >立即修改</van-button>
        </div>
      </van-form>
    </van-dialog>
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
      isLoading: false,
      scloading: false,
      showDig: false,
      imgList: [],
      sumdata: "",
      data: "",
      pageNum: 1,
      params: {
        status: "",
        schoolId: ""
      }
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    /**检查是否登录 */
    checkLogin() {
      if (utils.checkLogin()) {
        this.getScrollPageList();
      }
    },
    /**获取轮播图列表 */
    getScrollPageList(type) {
      let params = utils.checkParams(this.params);
      api.getScrollPageList(params, this.pageNum).then(
        res => {
          this.isLoading = false;
          this.loading = false;
          if (res.data.code == 10000) {
            if (type === "0") {
              this.data.list.push(...res.data.data.list);
              this.data.hasNextPage = res.data.data.hasNextPage;
              return;
            }
            this.data = res.data.data;
            return;
          }
          Toast(res.data.msg);
        },
        res => {
          this.isLoading = false;
          this.loading = false;
        }
      );
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
            this.sumdata.url = res.data.data.url;
            this.imgList.push({
              url: `${utils.returnUrl()}/${res.data.data.url}`
            });
            Toast(res.data.msg);
          }
        },
        res => {}
      );
    },
    /**加载更多 */
    toLoadMore() {
      this.loading = !this.loading;
      if (this.pageNum == this.data.pages) {
        return;
      }
      if (this.data.hasNextPage) {
        this.pageNum++;
        this.getScrollPageList("0");
      }
    },
    /**下拉刷新 */
    onRefresh() {
      this.pageNum = 1;
      this.getScrollPageList();
    },
    /**toDeatil */
    toDeatil(item) {
      this.showDig = true;
      this.sumdata = item;
      this.imgList = [];
      this.imgList.push({
        url: `${utils.returnUrl()}${this.sumdata.url}`
      });
    },
    /**确认修改 */
    onSubmit() {
      Toast("未提供此功能");
      return;
      this.scloading = !this.scloading;
      api.editScroll(this.sumdata).then(
        res => {
          this.showDig = false;
          this.scloading = !this.scloading;
          Toast(res.data.msg);
        },
        res => {
          this.scloading = !this.scloading;
        }
      );
    },
    /**日期格式化 */
    formatDate(res) {
      return utils.formatDates(res);
    },
    returnImg(url) {
      return `${utils.returnUrl()}${url}`;
    }
  }
};
</script>
<style lang="scss" scoped>
.font-size13 {
  font-size: 13px;
}
.font-size14 {
  font-size: 14px;
}
.font-size15 {
  font-size: 15px;
}
.color-g {
  color: #969494;
}
.game-list {
  .drop-menu {
    display: flex;
  }
  .data-list {
    display: flex;
    padding: 0 10px;
    flex-wrap: wrap;
    .list-item {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: #dacbcb 0 0 10px;
      margin: 8px 0;
      .item-content {
        display: flex;
        width: 100%;
        padding: 3px 0;
        flex-wrap: wrap;
        .item-top {
          display: flex;
          width: 100%;
          padding: 4px 5px;
          .item-left {
            display: flex;
            flex-wrap: wrap;
            .font {
              width: 100%;
            }
            .item-title {
              font-size: 17px;
              font-weight: bold;
            }
          }
        }
      }
    }
    .load-btn {
      width: 100%;
      height: 20px;
      line-height: 18px !important;
    }
  }
}
</style>