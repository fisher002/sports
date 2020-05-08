import axios from 'axios'
const baseUrl = "/api"

export default {
    getCompateStudentPageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/am/compateEquipment/page/${pageNum}`,
            data: params
        })
    },
    editEquipment(params) {
        return axios({
            method: 'put',
            url: `${baseUrl}/am/compateEquipment/edit`,
            data: params
        })
    },
}