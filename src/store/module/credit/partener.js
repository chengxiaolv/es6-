// 共借人
import { partenerList } from '@/api/common'

export default {
    namespaced: true,

    state: {
        partenerLoading: false,
        partener: {
            pageNo: 1,
            pageSize: 99999,
            total: 0,
            list: []
        }
    },
    mutations: {
        switchPartenerLoading(state, status) {
            state.partenerLoading = status
        },
        setPartenerData(state, data) {
            var pageData = data.page

            state.partener.total = parseInt(pageData.totalCount)
            state.partener.list = pageData.list
        }
    },
    actions: {
        fetchPartener({ commit, state }, filter) {
            commit('switchPartenerLoading', true)

            return partenerList(state.partener.pageNo, state.partener.pageSize, null, filter)
                .then(res => {
                    commit("setPartenerData", res.data)
                    commit('switchPartenerLoading', false)

                    return res
                })
        }
    }
}
