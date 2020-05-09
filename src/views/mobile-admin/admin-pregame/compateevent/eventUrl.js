import axios from 'axios'
const baseUrl = "/api"

export default {
    getEventList(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/compateEvent/list`,
            data: params
        })
    },
    addEvent(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/am/compateEvent/add`,
            data: params
        })
    }
}