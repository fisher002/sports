import axios from 'axios'
const baseUrl = "/api"

export default {
    addSchoolCompate(params) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/am/schoolCompate/add`,
            data: params
        })
    }
}