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
    addOutLay(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/am/adminOutlay/add`,
            data: params
        })
    },
}