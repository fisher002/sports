import axios from 'axios'
const baseUrl = "/api"

export default {
    addEvent(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/am/compateEvent/add`,
            data: params
        })
    }
}