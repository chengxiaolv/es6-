// 进件信息
import { materialsInfo } from '@/api/materials'

export default {
	namespaced: true,
	
    state: {
        caseInfo: {}
    },
    mutations: {
        setCaseData(state, data) {
            state.caseInfo = data.cstCase || {}
            Object.assign(state.caseInfo, {
                customerName: data.customerName,
                managerUserName: data.managerUserName,
                optrUserName: data.optrUserName
            })
        }
    },
    actions: {
        fetchCaseInfo({ commit, state }, caseId) {
            return materialsInfo(caseId)
                .then(res => {
                    commit("setCaseData", res.data)
                    
                    return res
                })
        }
    }
}