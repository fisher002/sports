<template>
  <div>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <div v-if="data">
        <div class="class-box" v-if="data.list && data.list.length > 0">
          <div class="list-item" v-for="item in data.list" :key="item.id">
            <van-swipe-cell :disabled="false" style="width:100%">
              <div class="item-content">
                <div class="item-top font-size14">
                  <div>
                    <img width="65" height="65" :src="formatUrl(item.userInfo.avatarUrl)" />
                  </div>
                  <div class="item-left">
                    <div class="item-title font">{{item.userInfo.name}}</div>
                    <div class="font">
                      <span>内容：{{item.commentContent}}</span>
                      <span>{{formatDate(item.createDate)}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <template #right>
                <van-button
                  square
                  text="删除"
                  type="danger"
                  @click="delComment(item.id)"
                  class="delete-button"
                />
              </template>
            </van-swipe-cell>
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
        <van-empty v-else description="暂无数据" />
      </div>
      <van-empty v-else description="暂无数据" />
    </van-pull-refresh>
    <van-dialog v-model="showDig" show-cancel-button :showConfirmButton="false">
      <!-- <van-form @submit="onSubmit">
        <van-field
          v-model="scores.schoolCompateName"
          label="项目"
          clearable
          readonly
          label-align="right"
        />
        <van-field v-model="scores.studentName" label="名字" clearable readonly label-align="right" />
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
      </van-form>-->
    </van-dialog>
  </div>
</template>
<script>
import utils from "@/utils/comUtils";
import { Toast } from "vant";
import { Dialog } from "vant";
import api from "./commentUrl";

export default {
  data() {
    return {
      showDig: false,
      scoloading: false,
      scloading: false,
      isLoading: false,
      loading: false,
      data: "",
      pageNum: 1,
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
    this.getCompateCommentPageList();
  },
  methods: {
    /**获取评论列表 */
    getCompateCommentPageList(type) {
      let param = utils.checkParams(this.params);
      api.getCompateCommentPageList(param, this.pageNum).then(
        res => {
          this.isLoading = false;
          this.loading = false;
          if (type === "0") {
            this.data.list.push(...res.data.data.list);
            this.data.hasNextPage = res.data.data.hasNextPage;
            return;
          }
          this.data = res.data.data;
        },
        res => {
          this.isLoading = false;
          this.loading = false;
        }
      );
    },
    /**修改 */
    onSubmit() {
      this.scoloading = !this.scoloading;
      api.editScore(this.scores).then(
        res => {
          this.scoloading = !this.scoloading;
          Toast(res.data.msg);
          if (res.data.code == 10000) {
            this.showDig = false;
          }
        },
        res => {
          this.scoloading = !this.scoloading;
        }
      );
    },
    /**加载更多 */
    toLoadMore() {
      this.loading = !this.loading;
      if (this.pageNum == this.data.pages) {
        this.loading = !this.loading;
        return;
      }
      if (this.data.hasNextPage) {
        this.pageNum++;
        this.getCompateCommentPageList("0");
      }
    },
    /**删除我的评论 */
    delComment(id) {
      Dialog.confirm({
        message: "是否确认删除"
      })
        .then(() => {
          api.delComment({ id: id }).then(res => {
            this.getCompateCommentPageList();
            Toast(res.data.msg);
          });
        })
        .catch(() => {});
    },
    /**下拉刷新 */
    onRefresh() {
      this.pageNum = 1;
      this.getCompateCommentPageList();
    },
    /**头像 */
    formatUrl(url) {
      return `${utils.returnUrl()}${url}`;
    },
    /**状态格式化 */
    formatStatus(res) {
      if (res === "check") {
        return "<span style='color:#ff0000'>审核中</span>";
      }
      if (res === "no") {
        return "<span style='color:#9e9e9e'>审核失败</span>";
      }
      if (res === "yes") {
        return "<span style='color:#4caf50'>审核成功</span>";
      }
    },
    /**日期格式化 */
    formatDate(res) {
      return utils.formatDates(res);
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
.class-box {
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
  .list-item {
    display: flex;
    width: 100%;
    border-radius: 10px;
    flex-wrap: wrap;
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
.van-dialog {
  top: 51% !important;
}
</style>