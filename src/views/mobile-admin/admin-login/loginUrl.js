import axios from 'axios'
const baseUrl = "/api"

export default {
    checkLogin(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/adminLogin`,
            data: params
        })
    },
    adminRegister(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/login`,
            data: params
        })
    },
    getSchoolList() {
        return axios({
            method: 'post',
            url: `${baseUrl}/school/list`,
            data: {}
        })
    },
    outLogin() {
        return axios({
            method: 'get',
            url: `${baseUrl}/adminLoginout`,
            data: {}
        })
    }
}