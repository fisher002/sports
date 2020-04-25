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
            method: 'delete',
            url: `${baseUrl}/sm/compateStudent/delete`,
            params: params
        })
    },
    getCompateStudentPageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/sm/compateStudent/page/${pageNum}`,
            data: params
        })
    },
    getScoreList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/sm/studentScore/page/${pageNum}`,
            data: params
        })
    },
    addContestantScore(params) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/sm/studentScore/add`,
            data: params
        })
    },
    addMessageToUser(params) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/sm/message/refereeSendCompateMessage`,
            data: params
        })
    },
    addAppeal(params) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/sm/compateAppeal/add`,
            data: params
        })
    },
    getMessageNum(params) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/sm/message/count`,
            params: params
        })
    },
    getMessagePageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/sm/message/page/${pageNum}`,
            data: params
        })
    },
}