import axios from 'axios'
const baseUrl = "/api"

export default {
    getCompateAppealPageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/am/compateAppeal/page/${pageNum}`,
            data: params
        })
    },
    editMessage(params) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/am/compateAppeal/edit`,
            data: params
        })
    },
}