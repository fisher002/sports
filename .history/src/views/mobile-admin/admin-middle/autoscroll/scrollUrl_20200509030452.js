import axios from 'axios'
const baseUrl = "/api"

export default {
    getScrollPageList(params, pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/am/scroll/page/${pageNum}`,
            data: params
        })
    },
    addScroll(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/am/scroll/add`,
            data: params
        })
    },
    editScroll(params) {
        return axios({
            method: 'put',
            url: `${baseUrl}/am/scroll/edit`,
            data: params
        })
    },
    delScroll(params) {
        return axios({
            method: 'delete',
            url: `${baseUrl}/am/scroll/delete`,
            data: params
        })
    }
}