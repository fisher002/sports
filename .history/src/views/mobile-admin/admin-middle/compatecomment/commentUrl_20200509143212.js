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
    getCompateCommentPageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/am/compateComment/page/${pageNum}`,
            data: params
        })
    },
    addComment(params) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/am/compateComment/add`,
            data: params
        })
    },
    delComment(params) {
        return axios({
            method: 'delete',
            url: `${baseUrl}/am/compateComment/delete`,
            params: params
        })
    },
}