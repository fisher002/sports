import axios from 'axios'
const baseUrl = "/api"

export default {
    getEventList(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/compateEvent/list`,
            data: params
        })
    },
    addSchoolCompate(params) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/am/schoolCompate/add`,
            data: params
        })
    },
    editSchoolCompate(params) {
        return axios({
            method: 'put',
            url: `${baseUrl}/am/schoolCompate/edit`,
            data: params
        })
    },
    getSchoolCompatePageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/schoolCompate/page/${pageNum}`,
            data: params
        })
    },
    getCompateStudentPageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/sm/compateStudent/page/${pageNum}`,
            data: params
        })
    },
    getCompateDetail(id) {
        return axios({
            method: 'get',
            url: `${baseUrl}/schoolCompate/${id}`
        })
    },
    delCompate(params) {
        return axios({
            method: 'delete',
            url: `${baseUrl}/am/schoolCompate/delete`,
            params: params
        })
    },
}