import axios from 'axios'
const baseUrl = "/api"
const url = "/am/admin"

export default {
    checkLogin(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}${url}/user/login`,
            params: params
        })
    },
    userRegister(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/studentRegistered/add`,
            params: params
        })
    },
    adminRegister(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}${url}/user/login`,
            params: params
        })
    },
    getSchoolList() {
        return axios({
            method: 'post',
            url: `http://58.249.75.20:9093/school/list`
        })
    }
}