import axios from 'axios'
const baseUrl = "/api"

export default {
    getEventList(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/compateEvent/list `,
            data: params
        })
    }
}