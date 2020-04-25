<template>
  <div>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <div v-if="data">
        <div class="drop-menu">
          <van-search
            show-action
            style="width:100%"
            v-model="params.messageContent"
            placeholder="请输入内容"
          >
            <template #action>
              <div @click="onSearch">搜索</div>
            </template>
          </van-search>
        </div>
        <div class="class-box" v-if="data.list && data.list.length > 0">
          <div class="list-item" v-for="item in data.list" :key="item.id" @click="toAppeal(item)">
            <div class="item-title">{{item.toStudentName}}</div>
            <div class="item-content">
              <div class="item-top font-size14">
                <div>来自：{{item.fromStudentName}}</div>
                <div class="color-g">{{formatDate(item.createDate)}}</div>
                <div class="color-g" v-html="formatStatus(item.isRead)"></div>
              </div>
              <div class="item-top font-size13 color-g">
                <div>内容：{{item.messageContent.substring(0,20)}}...</div>
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
        <van-empty v-else description="暂无数据" />
      </div>
      <van-empty v-else description="暂无数据" />
    </van-pull-refresh>
    <van-dialog v-model="showDig" title="消息详情" show-cancel-button showConfirmButton @closed="clear">
      <van-form>
        <van-field
          v-model="messages.fromStudentName"
          label="来自"
          clearable
          readonly
          label-align="right"
        />
        <van-field
          :value="formatDate(messages.createDate)"
          label="时间"
          clearable
          readonly
          label-align="right"
        />
        <van-field
          v-model="messages.messageContent"
          label="内容"
          type="textarea"
          autosize
          readonly
          label-align="right"
        />
      </van-form>
    </van-dialog>
  </div>
</template>
<script>
import utils from "@/utils/comUtils";
import { Toast } from "vant";
import { Dialog } from "vant";
import api from "./mineUrl";

export default {
  data() {
    return {
      showDig: false,
      scloading: false,
      isLoading: false,
      loading: false,
      data: "",
      pageNum: 1,
      messages: "",
      params: {
        toStudentId: "",
        messageContent: ""
      }
    };
  },
  created() {
    /**参数赋值 */
    let params = this.$route.query;
    for (let i in params) {
      this.params[i] = params[i];
    }
    this.getMessageList();
  },
  methods: {
    /**获取我的消息*/
    getMessageList(type) {
      let param = utils.checkParams(this.params);
      api.getMessagePageList(param, this.pageNum).then(
        res => {
          this.isLoading = false;
          if (type === "0") {
            this.data.list.push(...res.data.data.list);
            return;
          }
          this.data = res.data.data;
        },
        res => {
          this.isLoading = false;
        }
      );
    },
    /**查看信息 */
    toAppeal(item) {
      if (item) {
        this.messages = item;
        this.showDig = !this.showDig;
        api.changeRead({ id: item.id }).then(res => {
          if (res.data.code == 10000) {
            Toast("0");
          }
        });
      }
    },
    /**弹出框消失清楚appealData messages数据 */
    clear() {
      for (let i in this.appealData) {
        this.appealData[i] = "";
      }
      this.messages = "";
      this.getMessageList();
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
        this.getMessageList("0");
      }
    },
    /**onSearch搜索 */
    onSearch() {
      //   this.pageNum = 1;
      //   this.getMessageList();
    },
    /**下拉刷新 */
    onRefresh() {
      this.pageNum = 1;
      this.getMessageList();
    },
    /**状态格式化 */
    formatStatus(res) {
      if (res === "N") {
        return "<span style='color:#ff0000'>未读</span>";
      }
      if (res === "Y") {
        return "<span style='color:#4caf50'>已读</span>";
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
    .item-title {
      display: flex;
      width: 100%;
      padding: 3px 10px;
      font-size: 17px;
      font-weight: bold;
    }
    .item-content {
      display: flex;
      width: 100%;
      padding: 3px 0;
      flex-wrap: wrap;
      .item-top {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 4px 10px;
        justify-content: space-between;
      }
    }
  }
  .load-btn {
    width: 100%;
    height: 20px;
    line-height: 18px !important;
  }
}
</style>