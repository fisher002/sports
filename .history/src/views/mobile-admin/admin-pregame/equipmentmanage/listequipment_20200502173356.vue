<template>
  <div class="game-list">
    <van-tabs v-model="active" @change="toEquipment">
      <van-tab title="新增" name="a">
        <van-form @submit="onSubmit">
          <van-field v-model="equipments.equipmentName" label="设备名称" label-align="right" />
          <van-field v-model="equipments.sum" label="数量" type="number" label-align="right" />
          <div style="margin: 16px;">
            <van-button
              :loading="scloading"
              loading-text="提交中..."
              round
              block
              type="info"
              native-type="submit"
            >立即提交</van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="设备列表" name="b">
        <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
          <div class="drop-menu">
            <van-search
              style="width:100%"
              show-action
              v-model="params.equipmentName"
              placeholder="请输入设备名称"
            >
              <template #action>
                <div @click="onSearch">搜索</div>
              </template>
            </van-search>
          </div>
          <div class="data-list" v-if="data.list && data.list.length > 0">
            <div class="list-item" v-for="item in data.list" :key="item.id">
              <div class="item-title">{{item.equipmentName}}</div>
              <div class="item-content">
                <div class="item-top font-size14">
                  <div>{{item.schoolName}}</div>
                  <div>总数：{{item.sum}}</div>
                  <div>剩余：{{item.num}}</div>
                </div>
                <div class="item-top font-size13 color-g">
                  <div>添加时间：{{formatDate(item.createDate)}}</div>
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
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import utils from "@/utils/comUtils";
import { Toast } from "vant";
import api from "./equipmentUrl";
export default {
  data() {
    return {
      scloading: false,
      loading: false,
      isLoading: false,
      data: "",
      pageNum: 1,
      active: "a",
      equipments: {
        equipmentName: "",
        sum: ""
      },
      params: {
        schoolId: "",
        equipmentName: ""
      }
    };
  },
  created() {},
  methods: {
    /**新增设备 */
    onSubmit() {
      if (this.equipments) {
        this.scloading = !this.scloading;
        api.addEquipment(this.equipments).then(
          res => {
            this.scloading = !this.scloading;
            Toast(res.data.msg);
          },
          res => {
            this.scloading = !this.scloading;
          }
        );
      }
    },
    /**获取比赛项目信息 */
    getEquipmentPageList(type) {
      let params = utils.checkParams(this.params);
      api.getEquipmentPageList(params, this.pageNum).then(
        res => {
          this.isLoading = false;
          if (res.data.code == 10000) {
            if (type === "0") {
              this.data.list.push(...res.data.data.list);
              return;
            }
            this.data = res.data.data;
            return;
          }
          Toast(res.data.msg);
        },
        res => {
          this.isLoading = false;
          Toast(res.data.msg);
        }
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
        this.getEquipmentPageList("0");
      }
    },
    /**onSearch搜索 */
    onSearch() {
      this.pageNum = 1;
      this.getEquipmentPageList();
    },
    /**下拉刷新 */
    onRefresh() {
      this.pageNum = 1;
      this.getEquipmentPageList();
    },
    /**toEquipment */
    toEquipment(name, title) {
      if (name === "b") {
        this.pageNum = 1;
        this.getEquipmentPageList();
      }
    },
    /**状态格式化 */
    formatStatus(res) {
      return utils.formatStatus(res);
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
      .item-title {
        display: flex;
        width: 100%;
        padding: 3px 5px;
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
          width: 100%;
          justify-content: space-between;
          padding: 4px 5px;
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