import axios from 'axios'
const baseUrl = "/api"

export default {
    /**返回线上ip */
    returnUrl() {
        const url = 'http://58.249.80.213:9093/';
        return url;
    },
    /**日期格式化v1 */
    formatDates(res) {
        let date = new Date(res);
        let year = date.getFullYear(),
            mouth =
                date.getMonth() + 1 < 10
                    ? `0${date.getMonth() + 1}`
                    : date.getMonth() + 1,
            day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
            hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
            minute =
                date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return year + "-" + mouth + "-" + day + " " + hour + ":" + minute;
    },
    /**日期格式化v2 */
    formatDate(res) {
        let date = new Date(res);
        let year = date.getFullYear(),
            mouth =
                date.getMonth() + 1 < 10
                    ? `0${date.getMonth() + 1}`
                    : date.getMonth() + 1,
            day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        return year + "-" + mouth + "-" + day;
    },
    /**日期格式化v3 */
    formatTime(res) {
        let oldDate = new Date(res), nowDate = new Date();
        if ((nowDate.getTime() / 1000 / 60 - oldDate.getTime() / 1000 / 60) <= 5) {
            return `刚刚`;
        }
        if ((nowDate.getTime() / 1000 / 60 - oldDate.getTime() / 1000 / 60) > 5 && (nowDate.getTime() / 1000 / 60 - oldDate.getTime() / 1000 / 60) <= 60) {
            return `${Math.round(nowDate.getTime() / 1000 / 60 - oldDate.getTime() / 1000 / 60)}分钟前`;
        }
        if ((nowDate.getTime() / 1000 / 60 - oldDate.getTime() / 1000 / 60) > 60 && (nowDate.getTime() / 1000 / 60 - oldDate.getTime() / 1000 / 60) <= 60 * 24) {
            return `${Math.round(nowDate.getTime() / 1000 / 60 / 60 - oldDate.getTime() / 1000 / 60 / 60)}小时前`;
        }
        if ((nowDate.getTime() / 1000 / 60 / 60 - oldDate.getTime() / 1000 / 60 / 60) > 24 && (nowDate.getTime() / 1000 / 60 / 60 - oldDate.getTime() / 1000 / 60 / 60) <= 3 * 24) {
            return `${Math.round(nowDate.getTime() / 1000 / 60 / 60 / 24 - oldDate.getTime() / 1000 / 60 / 60 / 24)}天前`;
        }
        if ((nowDate.getTime() / 1000 / 60 / 60 - oldDate.getTime() / 1000 / 60 / 60) > 3 * 24) {
            return this.formatDates(res);
        }
    },
    /**状态格式化 */
    formatStatus(res) {
        if (res === "will") {
            return "<span style='color:#9e9e9e'>待开始</span>";
        }
        if (res === "ing") {
            return "<span style='color:#4caf50'>进行中</span>";
        }
        if (res === "ed") {
            return "<span style='color:#f44336'>已结束</span>";
        }
    },
    /**状态格式化V1 */
    formatStatusV(res) {
        if (res === "will") {
            return "待开始";
        }
        if (res === "ing") {
            return "进行中";
        }
        if (res === "ed") {
            return "已结束";
        }
    },
    /**对应星期几 */
    getRightDay(date) {
        let week = "";
        if (date.getDay() == 0) {
            week = "星期日";
        }
        if (date.getDay() == 1) {
            week = "星期一";
        }
        if (date.getDay() == 2) {
            week = "星期二";
        }
        if (date.getDay() == 3) {
            week = "星期三";
        }
        if (date.getDay() == 4) {
            week = "星期四";
        }
        if (date.getDay() == 5) {
            week = "星期五";
        }
        if (date.getDay() == 6) {
            week = "星期六";
        }
        return week;
    },
    /**参数筛选，为空则不传 */
    checkParams(val) {
        let params = {};
        for (let i in val) {
            if (val[i].split(" ").join("").length > 0) {
                params[i] = val[i];
            }
        }
        return params;
    },
    /**上传文件 */
    upLoadFile(file) {
        return axios({
            method: 'post',
            url: `${baseUrl}/upload`,
            headers: {
                "content-type": "multipart/form-data"
            },
            data: file
        })
    },
    /**获取学校数据 */
    getSchoolList() {
        return axios({
            method: 'post',
            url: `${baseUrl}/school/list`,
            data: {}
        })
    },
    /**获取个人信息 */
    getMyMessage() {
        return axios({
            method: 'get',
            url: `${baseUrl}/sm/student/me`
        })
    },
    /**检查是否登录 */
    checkLogin() {
        if (sessionStorage.getItem("isLogin") === "true") {
            return true;
        }
        return false;
    },
}