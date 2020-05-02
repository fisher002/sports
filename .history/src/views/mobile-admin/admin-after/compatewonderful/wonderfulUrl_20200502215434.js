import axios from 'axios'
const baseUrl = "/api"

export default {
    getSchoolCompatePageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/schoolCompate/page/${pageNum}`,
            data: params
        })
    },
    editMessage(params) {
        return axios({
            method: 'put',
            url: `${baseUrl}/am/compateAppeal/edit`,
            data: params
        })
    },
}