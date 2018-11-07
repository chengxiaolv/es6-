import axios from '@/libs/axios'

export const auditAll = (body) => {
    return axios.post('api/flow/audit/auditAll', body)
}

export const doAudit = (body) => {
	return axios.post('api/flow/audit/doAudit', body)
}

export const findNode = (dataId) => {
	return axios.post('api/flow/audit/findNode', {
		dataId
	})
}

export const isCan = (dataId) => {
	return axios.post('api/flow/audit/isCan', {
		dataId
	})
}

export const findHisTaskName = (processId) => {
	return axios.post('api/flow/audit/findHisTaskName', {
		processId
	})
}
