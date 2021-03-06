import axios from 'axios'
const baseUrl = "/api"

export default {
    getSchoolCompatePageList(params, pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/schoolCompate/page/${pageNum}`,
            data: params
        })
    },
    getChatPageList(params, pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/sm/compateMedia/page/${pageNum}`,
            data: params
        })
    },
}