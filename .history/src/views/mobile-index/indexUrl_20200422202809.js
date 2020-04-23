import axios from 'axios'
const baseUrl = "/api"

export default {
    checkLogin(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/login`,
            data: params
        })
    },
    outLogin() {
        return axios({
            method: 'GET',
            url: `${baseUrl}/loginout`
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
    getSchoolCompateList(params) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/sm/schoolCompate/list`,
            data: params
        })
    }
}