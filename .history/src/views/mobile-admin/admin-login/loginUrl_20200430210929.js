import axios from 'axios'
const baseUrl = "/api"

export default {
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
}