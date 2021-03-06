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
    getCompateCommentPageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/sm/compateComment/page/${pageNum}`,
            data: params
        })
    },
    addComment(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/sm/compateComment/add`,
            data: params
        })
    },
    delComment(params) {
        return axios({
            method: 'delete',
            url: `${baseUrl}/sm/compateComment/delete`,
            params: params
        })
    },
}