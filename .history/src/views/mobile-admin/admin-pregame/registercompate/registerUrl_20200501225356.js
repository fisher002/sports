import axios from 'axios'
const baseUrl = "/api"

export default {
    editSchoolCompate(params) {
        return axios({
            method: 'put',
            url: `${baseUrl}/am/schoolCompate/edit`,
            data: params
        })
    },
    getCompateStudentPageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/am/compateStudent/page/${pageNum}`,
            data: params
        })
    },
}