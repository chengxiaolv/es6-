// 进件信息
import { getCreditInfo } from '@/api/customer'

export default {
	namespaced: true,
	
    state: {
        creditInfo: {}
    },
    mutations: {
        setCreditData(state, data) {
            state.creditInfo = data.cstPersonalCredit || {}
            state.creditInfo.managerUserName = data.managerUserName || ''
        }
    },
    actions: {
        fetchCreditInfo({ commit, state }, customerId) {
            return getCreditInfo(customerId)
                .then(res => {
                    commit("setCreditData", res.data)
                    
                    return res
                })
        }
    }
}