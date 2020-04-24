import axios from 'axios'
const baseUrl = "/api"

export default {
    getEventList() {
        return axios({
            method: 'post',
            url: `${baseUrl}/compateEvent/list `,
            data: params
        })
    }
}