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
            data: params
        })
    },
    getMessagePageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/sm/message/page/${pageNum}`,
            data: params
        })
    },
    changeRead(params) {
        return axios({
            method: 'get',
            url: `${baseUrl}/sm/message/isRead`,
            params: params
        })
    },
    addMedia(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/sm/compateMedia/add`,
            data: params
        })
    },
    getEquipmentList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/sm/equipment/page/${pageNum}`,
            data: params
        })
    },
    getCompateEquipmentList(params) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/sm/compateEquipment/list`,
            data: params
        })
    },
    addCompateEquipment(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/sm/compateEquipment/add`,
            data: params
        })
    },
    editCompateEquipment(params) {
        return axios({
            method: 'put',
            url: `${baseUrl}/sm/compateEquipment/edit`,
            data: params
        })
    },
}