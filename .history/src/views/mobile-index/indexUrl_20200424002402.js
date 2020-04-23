import axios from 'axios'
const baseUrl = "/api"

export default {
    checkLogin(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/login`,
            data: params
        })
    },
    outLogin() {
        return axios({
            method: 'GET',
            url: `${baseUrl}/loginout`
        })
    },
    userRegister(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/studentRegistered/add`,
            data: params
        })
    },
    adminRegister(params) {
        return axios({
            method: 'post',
            url: `${baseUrl}/login`,
            data: params
        })
    },
    getSchoolList() {
        return axios({
            method: 'post',
            url: `${baseUrl}/school/list`,
            data: {}
        })
    },
    getSchoolCompateList(params) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/schoolCompate/list`,
            data: params
        })
    },
    getCompateStudentList(params) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/sm/compateStudent/list`,
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
    getSchoolCompatePageList(params,pageNum) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/schoolCompate/page/${pageNum}`,
            data: params
        })
    },
    getCompateDetail(id) {
        return axios({
            method: 'get',
            url: `${baseUrl}/schoolCompate/${id}`
        })
    },
    toSignUp(params) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/sm/compateStudent/add`,
            data: params
        }) 
    },
    toSignUpReferee(params) {
        return axios({
            method: 'POST',
            url: `${baseUrl}/sm/compateStudent/addReferee`,
            data: params
        }) 
    }
}