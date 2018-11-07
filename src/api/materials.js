import axios from '@/libs/axios'

export const materialsList = (pageNo, pageSize, searchBy, filter) => {
	var body = {
        page: pageNo,
        limit: pageSize,
        searchBy
    }

    if(typeof filter == "object"){
        Object.assign(body, filter)
    }

    return axios.post('api/entry/cstcase/list', body)
}

export const materialsSave = (body) => {
	return axios.post('api/entry/cstcase/save', body)
}

export const materialsUpdate = (body) => {
    return axios.post('api/entry/cstcase/update', body)
}

export const materialsInfo = (id) => {
    return axios.post('api/entry/cstcase/info', {
        id
    })
}

export const showCases = (customerId) => {
    return axios.post('api/entry/cstcase/show', {
        customerId
    })
}

export const findBy = (customerId, currStage) => {
    return axios.post('api/entry/cstcase/findBy', {
        customerId,
        currStage
    })
}