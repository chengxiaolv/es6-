// 职业信息
import {getPersonalDebtList} from '@/api/customer'

export default {
    namespaced: true,
    
    state: {
        personalDebtLoading: false,
        personalDebt: {
            pageNo: 1,
            pageSize: 99999,
            total: 0,
            list: []
        }
    },
    mutations: {
        switchPersonalDebtLoading(state, status) {
            state.personalDebtLoading = status
        },
        setPersonalDebtData(state, data) {
            var pageData = data.page

            state.personalDebt.total = parseInt(pageData.totalCount)
            state.personalDebt.list = pageData.list
        }
    },
    actions: {
        fetchPersonalDebtList({ commit, state }, filter) {
            commit('switchPersonalDebtLoading', true)

            return getPersonalDebtList(state.personalDebt.pageNo, state.personalDebt.pageSize, filter)
                .then(res => {
                    commit("setPersonalDebtData", res.data)
                    commit('switchPersonalDebtLoading', false)

                    return res
                })
        }
    }
}
