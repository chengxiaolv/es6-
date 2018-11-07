// 进件信息
import { getIncomeInfo } from '@/api/customer'

export default {
    namespaced: true,
    
    state: {
        incomeInfo: {}
    },
    mutations: {
        setIncomeData(state, data) {
            state.incomeInfo = data.cstPersonalIncomeExpend || {}
        }
    },
    actions: {
        fetchIncomeInfo({ commit, state }, customerId) {
            return getIncomeInfo(customerId)
                .then(res => {
                    commit("setIncomeData", res.data)
                    
                    return res
                })
        }
    }
}