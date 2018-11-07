import axios from '@/libs/axios'
import md5 from 'md5'

export const login = ({ userName, password }) => {
    return axios.post(`api/sys/user/login`, {
        userName,
        password: md5(password)
    })
}

export const getUserInfo = (token) => {
    return axios.post('api/sys/user/info', {
    	token
    })
}

export const logout = () => {
    return axios.request({
        url: 'api/sys/user/logout',
        method: 'post'
    })
}

export const getUserList = (pageNo, pageSize, searchBy, filter) => {
    var body = {
        page: pageNo,
        limit: pageSize,
        searchBy
    }

    if(typeof filter == "object"){
        Object.assign(body, filter)
    }

    return axios.post('api/sys/user/list', body)
}