import axios from 'axios'
const baseUrl = "/api"
const url = "/am/admin"

export default {
    checkLogin(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/login`,
            params: params
        })
    },
    userRegister(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/studentRegistered/add`,
            data: params
        })
    },
    adminRegister(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}${url}/user/login`,
            data: params
        })
    },
    getSchoolList() {
        return axios({
            method: 'post',
            url: `${baseUrl}/school/list`,
            data: {}
        })
    }
}