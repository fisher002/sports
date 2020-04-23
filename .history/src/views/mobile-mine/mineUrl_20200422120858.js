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
    }
}