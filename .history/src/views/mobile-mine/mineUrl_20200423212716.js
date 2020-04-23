import axios from 'axios'
const baseUrl = "/api"

export default {
    getMyMessage() {
        return axios({
            method: 'get',
            url: `${baseUrl}/sm/student/me`
        })
    },
    getMyMessageById(id) {
        return axios({
            method: 'get',
            url: `${baseUrl}/studentMessage/${id}`
        })
    },
    upDateUser(params) {
        return axios({
            method: 'PUT',
            url: `${baseUrl}/sm/student/edit`,
            data: params
        })
    },
    outLogin() {
        return axios({
            method: 'GET',
            url: `${baseUrl}/loginout`
        })
    },
    getpersonalCompatePageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/sm/compateStudent/page/${pageNum}`,
            data: params
        })
    },
    deletepersonalCompate(params) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/sm/compateStudent/delete`,
            data: params
        })
    }
}