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
    }
}