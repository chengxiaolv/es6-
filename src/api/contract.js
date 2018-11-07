import axios from '@/libs/axios'

export const contractList = (pageNo, pageSize, searchBy, filter) => {
	var body = {
        page: pageNo,
        limit: pageSize,
        searchBy
    }

    if(typeof filter == "object"){
        Object.assign(body, filter)
    }
    
    return axios.post('api/sign/cstcontract/list', body)
}

export const getContractByCaseId = (caseId) => {
    return axios.post('api/sign/cstcontract/list', {
        page: 1,
        limit: 10,
        caseId
    }).then(res => {
        var list = res.data.page.list

        if(list.length > 0){
            res.data = list[0]
        }else{
            res.data = null
        }

        return res
    })
}

export const contractSave = (body) => {
	return axios.post('api/sign/cstcontract/save', body)
}

export const contractUpdate = (body) => {
    return axios.post('api/sign/cstcontract/update', body)
}

export const contractInfo = (id) => {
    return axios.post('api/sign/cstcontract/info', {
        contractId: id
    })
}
