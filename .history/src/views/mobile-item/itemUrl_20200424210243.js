import axios from 'axios'
const baseUrl = "/api"

export default {
    getEventList() {
        return axios({
            method: 'post',
            url: `${baseUrl}/compateEvent/list `,
            data: {}
        })
    },
    getSchoolCompatePageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/schoolCompate/page/${pageNum}`,
            data: params
        })
    },
}