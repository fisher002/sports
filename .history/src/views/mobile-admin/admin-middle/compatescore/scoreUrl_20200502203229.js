import axios from 'axios'
const baseUrl = "/api"

export default {
    getCompateStudentPageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/am/compateStudent/page/${pageNum}`,
            data: params
        })
    },
    getSchoolCompatePageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/schoolCompate/page/${pageNum}`,
            data: params
        })
    },
    getScoreList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/am/studentScore/page/${pageNum}`,
            data: params
        })
    },
    addMessage(params) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/am/adminMessage/add`,
            data: params
        })
    },
}