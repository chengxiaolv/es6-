// 账户信息
import {getAccountList} from '@/api/common'

export default {
    namespaced: true,
    
    state: {
        accountLoading: false,
        account: {
            pageNo: 1,
            pageSize: 99999,
            total: 0,
            list: []
        }
    },
    mutations: {
        switchAccountLoading(state, status) {
            state.accountLoading = status
        },
        setAccountData(state, data) {
            var pageData = data.page

            state.account.total = parseInt(pageData.totalCount)
            state.account.list = pageData.list
        }
    },
    actions: {
        fetchAccountList({ commit, state }, filter) {
            commit('switchAccountLoading', true)

            return getAccountList(state.account.pageNo, state.account.pageSize, filter)
                .then(res => {
                    commit("setAccountData", res.data)
                    commit('switchAccountLoading', false)

                    return res
                })
        }
    }
}
