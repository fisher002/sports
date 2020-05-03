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
    getOutPlayPageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/am/adminOutlay/page/${pageNum}`,
            data: params
        })
    },
    delOutPlay() {
        return axios({
            method: 'delete',
            url: `${baseUrl}/am/adminOutlay/delete`,
            data: params
        })
    },
    editOutPlay() {
        return axios({
            method: 'put',
            url: `${baseUrl}/am/adminOutlay/edit`,
            data: params
        })
    }
}