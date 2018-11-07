// 职业信息
import {getGuaranteeList} from '@/api/customer'

export default {
    namespaced: true,
    
    state: {
        guaranteeLoading: false,
        guarantee: {
            pageNo: 1,
            pageSize: 99999,
            total: 0,
            list: []
        }
    },
    mutations: {
        switchGuaranteeLoading(state, status) {
            state.guaranteeLoading = status
        },
        setGuaranteeData(state, data) {
            var pageData = data.page
            
            state.guarantee.total = parseInt(pageData.totalCount)
            state.guarantee.list = pageData.list
        }
    },
    actions: {
        fetchGuaranteeList({ commit, state }, filter) {
            commit('switchGuaranteeLoading', true)
            
            return getGuaranteeList(state.guarantee.pageNo, state.guarantee.pageSize, filter)
                .then(res => {
                    commit("setGuaranteeData", res.data)
                    commit('switchGuaranteeLoading', false)

                    return res
                })
        }
    }
}
