export default {
    /**日期格式化 */
    formatDate(res) {
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
    }
}