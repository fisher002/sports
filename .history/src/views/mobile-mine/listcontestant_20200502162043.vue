<template>
  <div>
    <van-tabs v-model="activeName" @change="OnChange">
      <van-tab title="参赛选手" name="a">
        <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
          <div v-if="data.list && data.list.length > 0">
            <div class="drop-menu">
              <van-search
                show-action
                style="width:100%"
                v-model="params.studentName"
                placeholder="请输入同学名称"
              >
                <template #action>
                  <div @click="onSearch">搜索</div>
                </template>
              </van-search>
            </div>
            <div class="class-box">
              <div
                class="class-mate"
                v-for="item in data.list"
                :key="item.id"
                @click="showScore(item)"
              >
                <div class="mate-name">
                  <div>{{item.studentName}}</div>
                  <div v-html="formatStatus(item.status)"></div>
                </div>
                <div class="mate-name mate-time">{{formatDate(item.createDate)}}</div>
              </div>
              <div class="class-mates" v-for="n in ((data.list.length % 2) == 0 ? 0 : 1)" :key="n"></div>
              <div class="load-btn" v-show="data.hasNextPage">
                <van-button
                  class="load-btn"
                  @click="toLoadMore"
                  :loading="loading"
                  type="info"
                  loading-text="加载中..."
                >点击加载更多</van-button>
              </div>
              <div v-if="data.list.length > 0" class="re-btn">
                <van-button
                  @click="toRemind"
                  style="width:100%"
                  :loading="reloading"
                  type="info"
                  loading-text="提醒中..."
                >一键提醒同学参赛</van-button>
              </div>
            </div>
          </div>
          <van-empty v-else description="暂无同学报名" />
        </van-pull-refresh>
      </van-tab>
      <van-tab title="资讯发布" name="b">
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
          <van-button style="width:80%" type="danger" @click="setMediaContent">发布</van-button>
        </div>
      </van-tab>
      <van-tab title="设备租借" name="c">
        <van-pull-refresh v-model="eqLoading" success-text="刷新成功" @refresh="eqRefresh">
          <div class="eq-item" v-if="equipments && equipments.list.length > 0">
            <div
              class="class-mate"
              v-for="item in equipments.list"
              :key="item.id"
              @click="showEqMent(item)"
            >
              <div class="mate-name font-size18">
                <div>{{item.equipmentName}}</div>
              </div>
              <div class="mate-name mate-time">{{`总数${item.num} 剩余${item.sum}`}}</div>
            </div>
          </div>
          <van-empty v-else description="暂无数据" />
        </van-pull-refresh>
      </van-tab>
      <van-tab title="设备退还" name="d">
        <van-pull-refresh v-model="eqLoading" success-text="刷新成功" @refresh="comRefresh">
          <div class="eq-item" v-if="comEquipments && comEquipments.length > 0">
            <div
              class="class-mate"
              v-for="item in comEquipments"
              :key="item.id"
              @click="showComEqMent(item)"
            >
              <div class="mate-name font-size18">
                <div>{{item.equipmentName}}</div>
              </div>
              <div class="mate-name">
                <div>数量{{item.sum}}</div>
                <div v-html="formatcStatus(item.status)"></div>
              </div>
              <div class="mate-name mate-time">{{`${formatDate(item.createDate)}`}}</div>
            </div>
          </div>
          <van-empty v-else description="暂无数据" />
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <van-dialog
      v-model="showEqsDig"
      title="设备租借"
      show-cancel-button
      :showConfirmButton="false"
      @closed="clear"
    >
      <van-form @submit="onComEqSubmit">
        <van-field
          v-model="comEqs.equipmentName"
          label="设备名"
          clearable
          readonly
          label-align="right"
        />
        <van-field v-model="comEqs.sum" label="租借总数" clearable readonly label-align="right" />
        <van-field :value="formatDate(comEqs.createDate)" label="租借时间" clearable readonly label-align="right" />
        <div style="margin: 16px;">
          <van-button
            :loading="eqsloading"
            loading-text="退还中..."
            round
            block
            type="info"
            native-type="submit"
          >立即退还</van-button>
        </div>
      </van-form>
    </van-dialog>
    <van-dialog
      v-model="showEqDig"
      title="设备租借"
      show-cancel-button
      :showConfirmButton="false"
      @closed="clear"
    >
      <van-form @submit="onEqSubmit">
        <van-field
          v-model="compateeqs.equipmentName"
          label="设备名"
          clearable
          readonly
          label-align="right"
        />
        <van-field v-model="compateeqs.num" label="总数" clearable readonly label-align="right" />
        <van-field v-model="compateeqs.sum" label="剩余数量" clearable readonly label-align="right" />
        <van-field
          v-model="comeqsData.sum"
          label="租借数量"
          type="number"
          placeholder="请输入租借数量"
          clearable
          :rules="[{ required: true, message: '租借数量不能为空' }]"
          label-align="right"
        />
        <div style="margin: 16px;">
          <van-button
            :loading="eqsloading"
            loading-text="提交中..."
            round
            block
            type="info"
            native-type="submit"
          >立即提交</van-button>
        </div>
      </van-form>
    </van-dialog>
    <van-dialog
      v-model="showDig"
      title="运动员评分"
      show-cancel-button
      :showConfirmButton="false"
      @closed="clear"
    >
      <van-form @submit="onSubmit">
        <van-field
          v-model="students.compateName"
          label="项目"
          clearable
          readonly
          label-align="right"
        />
        <van-field
          v-model="students.studentName"
          label="名字"
          clearable
          readonly
          label-align="right"
        />
        <van-field
          v-model="studentData.score"
          label="分数"
          type="number"
          placeholder="请填写分数"
          clearable
          :rules="[{ required: true, message: '分数不能为空' }]"
          label-align="right"
        />
        <van-field
          label="单位"
          placeholder="请选择单位"
          :rules="[{ required: true, message: '请选择单位' }]"
          label-align="right"
        >
          <template #input>
            <van-radio-group v-model="studentData.unit" direction="horizontal">
              <van-radio name="时">时</van-radio>
              <van-radio name="分">分</van-radio>
              <van-radio name="秒">秒</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="radio" label="排序" label-align="right">
          <template #input>
            <van-radio-group v-model="studentData.compateOrder" direction="horizontal">
              <van-radio name="asc">正序</van-radio>
              <van-radio name="desc">倒序</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-model="studentData.remark"
          label="备注"
          placeholder="请填写备注"
          type="textarea"
          maxlength="150"
          show-word-limit
          autosize
          clearable
          label-align="right"
        />
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
    </van-dialog>
  </div>
</template>
<script>
import utils from "@/utils/comUtils";
import { Toast } from "vant";
import { Dialog } from "vant";
import api from "./mineUrl";
import editor from "@/components/public/wangEditor";

export default {
  components: { editor },
  data() {
    return {
      showDig: false,
      showEqDig: false,
      showEqsDig: false,
      eqLoading: false,
      eqsloading: false,
      scloading: false,
      isLoading: false,
      loading: false,
      reloading: false,
      data: "",
      pageNum: 1,
      students: "",
      compateeqs: "",
      comEqs: "",
      activeName: "a",
      imgList: [],
      studentData: {
        schoolCompateId: "",
        studentId: "",
        score: "",
        unit: "",
        remark: "",
        compateOrder: ""
      },
      medias: {
        compateId: "",
        mediaContent: "",
        mediaType: "image"
      },
      pageNums: 1,
      equipments: "",
      comEquipments: "",
      comeqsData: {
        compateId: "",
        sum: "",
        equipmentId: ""
      },
      params: {
        studentGroup: "contestant",
        compateId: "",
        studentName: "",
        schoolId: "",
        status: "yes"
      }
    };
  },
  created() {
    /**参数赋值 */
    let params = this.$route.query;
    for (let i in params) {
      this.params[i] = params[i];
    }
    this.getStudentList();
  },
  methods: {
    /**OnChange */
    OnChange(val) {
      if (val === "c") {
        this.getEquipmentList();
      }
      if (val === "d") {
        this.getCompateEquipmentList();
      }
    },
    /**获取学校设备 */
    getEquipmentList() {
      api.getEquipmentList({}, this.pageNums).then(
        res => {
          this.eqLoading = false;
          if (res.data.code == 10000) {
            this.equipments = res.data.data;
          }
        },
        res => {
          this.eqLoading = false;
        }
      );
    },
    /**获取已租借设备 */
    getCompateEquipmentList() {
      api.getCompateEquipmentList({ compateId: this.params.compateId }).then(
        res => {
          this.eqLoading = false;
          if (res.data.code == 10000) {
            this.comEquipments = res.data.data;
          }
        },
        res => {
          this.eqLoading = false;
        }
      );
    },
    /**获取报名同学 */
    getStudentList(type) {
      this.params.schoolId = sessionStorage.getItem("schoolId");
      let param = utils.checkParams(this.params);
      api.getCompateStudentPageList(param, this.pageNum).then(
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
    /**弹起评分 */
    showScore(item) {
      if (item) {
        this.students = item;
        this.showDig = !this.showDig;
        this.studentData.studentId = item.studentId;
        this.studentData.schoolCompateId = item.compateId;
      }
    },
    /**弹出框消失清楚studentData students数据 */
    clear() {
      for (let i in this.studentData) {
        this.studentData[i] = "";
      }
      this.students = "";
    },
    /**弹起租借 */
    showEqMent(item) {
      this.compateeqs = item;
      this.showEqDig = !this.showEqDig;
      this.comeqsData.equipmentId = item.id;
      this.comeqsData.compateId = this.params.compateId;
    },
    /**弹起退还 */
    showComEqMent(item) {
      if(item.status === 'yes') {
        return;
      }
      this.comEqs = item;
      this.showEqsDig = !this.showEqsDig;
    },
    /**提交退还信息 */
    onComEqSubmit() {
      this.eqsloading = true;
      api.editCompateEquipment({id: this.comEqs.id,status: 'yes'}).then(
        res => {
          this.eqsloading = false;
          this.showEqsDig = false;
          this.getCompateEquipmentList();
          Toast(res.data.msg);
        },
        res => {
          this.eqsloading = false;
        }
      );
    },
    /**提交租借信息 */
    onEqSubmit() {
      this.eqsloading = true;
      api.addCompateEquipment(this.comeqsData).then(
        res => {
          this.eqsloading = false;
          this.showEqDig = false;
          Toast(res.data.msg);
          this.getEquipmentList();
        },
        res => {
          this.eqsloading = false;
        }
      );
    },
    /**提交评分 */
    onSubmit() {
      this.addContestantScore();
    },
    /**运动员评分 */
    addContestantScore() {
      api.addContestantScore(this.studentData).then(
        res => {
          if (res.data.code == 10000) {
            this.showDig = false;
            this.clear();
            return;
          }
          Toast(res.data.msg);
        },
        res => {}
      );
    },
    /**一键提醒 */
    toRemind() {
      if (this.params.compateId) {
        this.reloading = !this.reloading;
        api.addMessageToUser({ id: this.params.compateId }).then(
          res => {
            if (res.data.code == 10000) {
              this.reloading = !this.reloading;
              Toast(res.data.msg);
              return;
            }
            Toast(res.data.msg);
            this.reloading = !this.reloading;
          },
          res => {
            this.reloading = !this.reloading;
          }
        );
      }
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
        this.getStudentList("0");
      }
    },
    /**onSearch搜索 */
    onSearch() {
      this.pageNum = 1;
      this.getStudentList();
    },
    /**下拉刷新 */
    onRefresh() {
      this.pageNum = 1;
      this.getStudentList();
    },
    /**下拉刷新 */
    eqRefresh() {
      this.eqLoading = !this.eqLoading;
      this.pageNums = 1;
      this.getEquipmentList();
    },
    /**下拉刷新 */
    comRefresh() {
      this.eqLoading = !this.eqLoading;
      this.getCompateEquipmentList();
    },
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
    /**状态格式化 */
    formatcStatus(res) {
      if (res === "no") {
        return "<span style='color:#ff0000'>未退还</span>";
      }
      if (res === "yes") {
        return "<span style='color:#4caf50'>已退还</span>";
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
.font-size18 {
  font-size: 18px;
  font-weight: bold;
}
.class-box {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px 0;
  .load-btn {
    width: 100%;
    height: 20px;
    line-height: 18px !important;
  }
  .re-btn {
    width: 100%;
    padding: 15px 5px;
  }
}
.eq-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.class-mate {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 40%;
  margin: 8px 10px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: #dacbcb 0 0 6px;
  .mate-name {
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 5px 2px;
  }
  .mate-time {
    font-size: 15px;
    color: #b1a1a1;
  }
}
.class-mates {
  width: 40%;
  margin: 8px 10px;
}
.van-dialog {
  top: 51% !important;
}
.send-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;
}
</style>