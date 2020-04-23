import axios from 'axios'
const baseUrl = "/api"

export default {
    /**返回线上ip */
    returnUrl() {
        const url = 'http://58.248.114.111:9093/';
        return url;
    },
    /**日期格式化 */
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
    /**日期格式化 */
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
    }
}