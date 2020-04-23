<template>
  <div>
    <div class="title">用户信息</div>
    <div v-if="params.type == 'detail'">
      <van-form>
        <van-field v-model="userData.username" label="账号" label-align="right" readonly />
        <van-field label="头像" label-align="right">
          <template #input>
            <van-uploader disabled v-model="fileList" :max-count="1" :deletable="false" />
          </template>
        </van-field>
        <van-field v-model="userData.name" label="姓名" label-align="right" readonly />
        <van-field
          name="radio"
          label="性别"
          label-align="right"
          :value="userData.sex == 'M' ? '男' : '女'"
          readonly
        ></van-field>
        <van-field
          name="calendar"
          :value="userData.birth == '' ? '' : formatDate(userData.birth)"
          label="出生日期"
          label-align="right"
          readonly
        />
        <van-field label="学校" :value="userData.schoolName" label-align="right" readonly />
      </van-form>
    </div>
    <div v-if="params.type == 'edit'">
      <van-form @submit="onSubmit">
        <van-field
          v-model="userData.username"
          label="账号"
          placeholder="手机号码"
          clearable
          :rules="[{ validator: checkPhone, message: '手机号码格式错误' }]"
          label-align="right"
        />
        <van-field
          v-model="userData.code"
          center
          clearable
          label="验证码"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请输入验证码' }]"
          label-align="right"
        >
          <template #button>
            <van-button size="small" native-type="button" type="primary" @click="getCode">获取验证码</van-button>
          </template>
        </van-field>
        <van-field
          v-model="userData.password"
          type="password"
          label="密码"
          placeholder="密码"
          clearable
          :rules="[{ required: true, message: '请填写密码' }]"
          label-align="right"
        />
        <van-field
          type="password"
          v-model="userData.comfirmPassword"
          label="确认密码"
          placeholder="请再次填写密码"
          clearable
          :rules="[{ validator: checkPassword, message: '上下密码不一致' }]"
          label-align="right"
        />
        <van-field label="头像" label-align="right">
          <template #input>
            <van-uploader
              v-model="fileList"
              :before-read="beforeRead"
              :after-read="upLoadFile"
              :max-count="1"
            />
          </template>
        </van-field>
        <van-field
          v-model="userData.name"
          label="姓名"
          placeholder="请填写姓名"
          clearable
          :rules="[{ required: true, message: '请填写姓名' }]"
          label-align="right"
        />
        <van-field name="radio" label="性别" label-align="right">
          <template #input>
            <van-radio-group v-model="userData.sex" direction="horizontal">
              <van-radio name="M">男</van-radio>
              <van-radio name="F">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          readonly
          clickable
          name="calendar"
          :value="userData.birth == '' ? '' : formatDate(userData.birth)"
          label="出生日期"
          label-align="right"
          placeholder="点击选择时间"
          @click="showDatePicker = true"
        />
        <van-popup v-model="showDatePicker" position="bottom">
          <van-datetime-picker
            v-model="userData.birth"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter"
            @confirm="showDatePicker = false"
            @cancel="showDatePicker = false"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          label="学校"
          :value="text"
          placeholder="请选择您所在的学校"
          :rules="[{ required: true, message: '请选择您所在的学校' }]"
          label-align="right"
          @click="getSchoolList"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="schoolData"
            :loading="scloading"
            @cancel="showPicker = false"
            @confirm="onConfirm"
            @change="onChange"
          />
        </van-popup>
        <div style="margin: 16px;">
          <van-button
            :loading="loading"
            loading-text="修改中..."
            round
            block
            type="info"
            native-type="submit"
          >提交修改</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import api from "./mineUrl";
import utils from "@/utils/comUtils";
export default {
  props: { type: "" },
  data() {
    return {
      loading: false,
      scloading: false,
      showDatePicker: false,
      showPicker: false,
      schoolData: [],
      text: "",
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2025, 10, 1),
      fileList: [],
      userData: {
        avatarUrl: "",
        name: "",
        sex: "",
        birth: "",
        username: "",
        code: "",
        password: "",
        comfirmPassword: "",
        schoolId: ""
      },
      params: {
        userId: "",
        type: ""
      }
    };
  },
  created() {
    /**参数赋值 */
    let params = this.$route.query;
    for (let i in params) {
      this.params[i] = params[i];
    }
    this.getMyMessage();
  },
  methods: {
    /**获取我的信息 */
    getMyMessage() {
      this.fileList = [];
      api.getMyMessage().then(
        res => {
          if (res.data.code == 10000) {
            this.userData = res.data.data;
            this.fileList.push({
              url: `${utils.returnUrl()}/${this.userData.avatarUrl}`
            });
          }
        },
        res => {
          Toast(res.data.msg);
        }
      );
    },
    /**用户提交修改 */
    onSubmit() {
      if (this.userData) {
        this.loading = true;
        api.upDateUser(this.userData).then(
          res => {
            if (res.data.code == "10000") {
              this.loading = false;
              Toast(res.data.msg);
            }
          },
          res => {
            Toast(res.data.msg);
          }
        );
      }
    },
    /**获取验证码 */
    getCode() {
      Toast("获取验证码");
    },
    /**选择学校值,用户 */
    onChange(picker, val, index) {
      this.userData.schoolId = val.schoolId;
      this.text = val.text;
    },
    /**选择学校值,用户 */
    onConfirm(val) {
      this.userData.schoolId = val.schoolId;
      this.text = val.text;
      this.showPicker = false;
    },
    /**选择出生日期值 */
    onDateConfirm(val) {
      this.userData.birth = val;
      this.showDatePicker = false;
    },
    /**密码验证,自定义,用户 */
    checkPassword(val) {
      if (val === this.userData.password) {
        return true;
      }
      return false;
    },
    /**手机号码验证,自定义,用户 */
    checkPhone(val) {
      let result = /^1[3456789]\d{9}$/;
      if (val !== "") {
        if (!result.test(val)) {
          return false;
        } else {
          return true;
        }
      }
      return false;
    },
    /**获取学校数据 */
    getSchoolList() {
      this.showPicker = true;
      if (this.schoolData.length > 0) {
        return;
      }
      this.scloading = !this.scloading;
      this.schoolData = [];
      api.getSchoolList().then(
        res => {
          if (res.data.code == 10000) {
            res.data.data.forEach(e => {
              let demo = {
                text: e.schoolName,
                schoolId: e.id
              };
              this.schoolData.push(demo);
            });
            this.scloading = !this.scloading;
          }
        },
        res => {
          this.scloading = !this.scloading;
          Toast(res.data.msg);
        }
      );
    },
    /**头像上传前 */
    beforeRead(file) {
      if (file.type !== "image/jpeg") {
        Toast("请上传 jpg 格式图片");
        return false;
      }
      return true;
    },
    /**头像上传 */
    upLoadFile(file) {
      // 创建form对象
      this.fileList = [];
      let formdata = new FormData();
      formdata.append("file", file.file);
      utils.upLoadFile(formdata).then(
        res => {
          if (res.data.code == 10000) {
            this.userData.avatarUrl = res.data.data.url;
            this.fileList.push({
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
    /**日期格式化 */
    formatDate(res) {
      return utils.formatDate(res);
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
}
</style>