// 职业信息
import {getExecutiveList} from '@/api/customer'

export default {
    namespaced: true,
    
    state: {
        executiveLoading: false,
        executive: {
            pageNo: 1,
            pageSize: 99999,
            total: 0,
            list: []
        }
    },
    mutations: {
        switchExecutiveLoading(state, status) {
            state.executiveLoading = status
        },
        setExecutiveData(state, data) {
            var pageData = data.page

            state.executive.total = parseInt(pageData.totalCount)
            state.executive.list = pageData.list
        }
    },
    actions: {
        fetchExecutiveList({ commit, state }, filter) {
            commit('switchExecutiveLoading', true)

            return getExecutiveList(state.executive.pageNo, state.executive.pageSize, filter)
                .then(res => {
                    commit("setExecutiveData", res.data)
                    commit('switchExecutiveLoading', false)

                    return res
                })
        }
    }
}
