// 个人客户信息
import {getPersonalInfo} from '@/api/customer'

export default {
	namespaced: true,
	
    state: {
        personalInfo: {}
    },
    mutations: {
        setPersonalData(state, data) {
            state.personalInfo = data.cstPersonal || {}
            state.personalInfo.managerUserName = data.managerUserName || ''
        }
    },
    actions: {
        fetchPersonalInfo({ commit, state }, customerId) {
            return getPersonalInfo(customerId)
                .then(res => {
                    commit("setPersonalData", res.data)
                    
                    return res
                })
        }
    }
}