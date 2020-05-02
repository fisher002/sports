import axios from 'axios'
const baseUrl = "/api"

export default {
    getCompateStudentPageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/am/compateStudent/page/${pageNum}`,
            data: params
        })
    },
    editCompateStudent(params) {
        return axios({
            method: 'put',
            url: `${baseUrl}/am/compateStudent/edit`,
            data: params
        })
    },
    delCompateStudent(params) {
        return axios({
            method: 'delete',
            url: `${baseUrl}/am/compateStudent/delete`,
            params: params
        })
    },
}