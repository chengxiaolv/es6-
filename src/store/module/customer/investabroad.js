// 职业信息
import {getInvestabroadList} from '@/api/customer'

export default {
    namespaced: true,
    
    state: {
        investabroadLoading: false,
        investabroad: {
            pageNo: 1,
            pageSize: 99999,
            total: 0,
            list: []
        }
    },
    mutations: {
        switchInvestabroadLoading(state, status) {
            state.investabroadLoading = status
        },
        setInvestabroadData(state, data) {
            var pageData = data.page
            
            state.investabroad.total = parseInt(pageData.totalCount)
            state.investabroad.list = pageData.list
        }
    },
    actions: {
        fetchInvestabroadList({ commit, state }, filter) {
            commit('switchInvestabroadLoading', true)
            
            return getInvestabroadList(state.investabroad.pageNo, state.investabroad.pageSize, filter)
                .then(res => {
                    commit("setInvestabroadData", res.data)
                    commit('switchInvestabroadLoading', false)

                    return res
                })
        }
    }
}
