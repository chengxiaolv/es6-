import axios from '@/libs/axios'

// 获取字典信息列表
export const dictList = (groupName) => {
    return axios.post('api/dict/list', {
        sortVal: groupName
    })
}

// 新增数据字典
export const dictSave = (groupName, text) => {
	return axios.post('api/dict/save', {
        sortType: text,
        pid: groupName
    })
}

// 资料完整度查询
export const cstCheck = (customerId) => {
    return axios.post('api/comm/cstcustomer/check', {
        customerId
    })
}

//个人账户管理
export const getAccountList = (pageNo, pageSize, filter) => {
    var body = {
        page: pageNo,
        limit: pageSize
    }
    
    if(typeof filter == "object"){
        Object.assign(body, filter)
    }
    
    return axios.post('api/comm/cstaccount/list', body)
}

export const getAccountInfo = (id) => {
    return axios.post('api/comm/cstaccount/info', {
        id
    })
}

export const accountSave = (body) => {
    return axios.post('api/comm/cstaccount/save',body)
}

export const accountUpdate = (body) => {
    return axios.post('api/comm/cstaccount/update',body)
}

export const accountDelete = (id) => {
    return axios.post('api/comm/cstaccount/delete', {
        id
    })
}

// 共借人
export const partenerList = (pageNo, pageSize, searchBy, filter) => {
    var body = {
        page: pageNo,
        limit: pageSize,
        searchBy
    }

    if(typeof filter == "object"){
        Object.assign(body, filter)
    }

    return axios.post('api/comm/cstpartener/list', body)
}

export const partenerInfo = (id) =>{
    return axios.post('api/comm/cstpartener/info', {
        id
    })
}

export const partenerUpdate = (body) =>{
    return axios.post('api/comm/cstpartener/update', body)
}

export const partenerSave = (body) =>{
    return axios.post('api/comm/cstpartener/save', body)
}

export const partenerDelete = (id) =>{
    return axios.post('api/comm/cstpartener/delete', {
        id
    })
}

// 费用标准
export const feeStandardList = (pageNo, pageSize, searchBy, filter) => {
    var body = {
        page: pageNo,
        limit: pageSize,
        searchBy
    }

    if(typeof filter == "object"){
        Object.assign(body, filter)
    }

    return axios.post('api/comm/comfeestandard/list', body)
}

export const feeStandardInfo = (id) =>{
	return axios.post('api/comm/comfeestandard/info', {
		id
	})
}

export const feeStandardUpdate = (body) =>{
	return axios.post('api/comm/comfeestandard/update', body)
}

export const feeStandardSave = (body) =>{
	return axios.post('api/comm/comfeestandard/save', body)
}

export const feeStandardDelete = (id) =>{
	return axios.post('api/comm/comfeestandard/delete', {
		id
	})
}

// 审批记录
export const busProcessList = (pageNo, pageSize, searchBy, filter) => {
    var body = {
        page: pageNo,
        limit: pageSize,
        searchBy
    }
    
    if(typeof filter == "object"){
        Object.assign(body, filter)
    }

    return axios.post('api/comm/busprocess/list', body)
}

export const busProcessInfo = (id) =>{
	return axios.post('api/comm/busprocess/info', {
		id
	})
}

export const busProcessUpdate = (body) =>{
	return axios.post('api/comm/busprocess/update', body)
}

export const busProcessSave = (body) =>{
	return axios.post('api/comm/busprocess/save', body)
}

export const busProcessDelete = (id) =>{
	return axios.post('api/comm/busprocess/delete', {
		id
	})
}

