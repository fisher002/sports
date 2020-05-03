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
    addFinalStudents(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/am/compateStudent/addStudentIds`,
            data: params
        })
    },
}