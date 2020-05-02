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
}