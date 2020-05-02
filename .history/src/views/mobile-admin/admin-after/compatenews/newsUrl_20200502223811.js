import axios from 'axios'
const baseUrl = "/api"

export default {
    getSchoolCompatePageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/schoolCompate/page/${pageNum}`,
            data: params
        })
    },
    addNews(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/am/compateMedia/add`,
            data: params
        })
    },
}