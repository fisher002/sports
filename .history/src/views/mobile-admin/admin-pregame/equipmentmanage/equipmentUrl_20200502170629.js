import axios from 'axios'
const baseUrl = "/api"

export default {
    getEquipmentPageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/am/equipment/page/${pageNum}`,
            data: params
        })
    },
    addEquipment(params) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/am/equipment/add`,
            data: params
        })
    },
}