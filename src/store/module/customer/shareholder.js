// 职业信息
import {getShareholderList} from '@/api/customer'

export default {
    namespaced: true,
    
    state: {
        shareholderLoading: false,
        shareholder: {
            pageNo: 1,
            pageSize: 99999,
            total: 0,
            list: []
        }
    },
    mutations: {
        switchShareholderLoading(state, status) {
            state.shareholderLoading = status
        },
        setShareholderData(state, data) {
            var pageData = data.page

            state.shareholder.total = parseInt(pageData.totalCount)
            state.shareholder.list = pageData.list
        }
    },
    actions: {
        fetchShareholderList({ commit, state }, filter) {
            commit('switchShareholderLoading', true)

            return getShareholderList(state.shareholder.pageNo, state.shareholder.pageSize, filter)
                .then(res => {
                    commit("setShareholderData", res.data)
                    commit('switchShareholderLoading', false)

                    return res
                })
        }
    }
}
