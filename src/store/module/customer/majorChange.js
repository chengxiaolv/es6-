// 职业信息
import {getMajorChangeList} from '@/api/customer'

export default {
    namespaced: true,
    
    state: {
        majorChangeLoading: false,
        majorChange: {
            pageNo: 1,
            pageSize: 99999,
            total: 0,
            list: []
        }
    },
    mutations: {
        switchMajorChangeLoading(state, status) {
            state.majorChangeLoading = status
        },
        setMajorChangeData(state, data) {
            var pageData = data.page

            state.majorChange.total = parseInt(pageData.totalCount)
            state.majorChange.list = pageData.list
        }
    },
    actions: {
        fetchMajorChangeList({ commit, state }, filter) {
            commit('switchMajorChangeLoading', true)

            return getMajorChangeList(state.majorChange.pageNo, state.majorChange.pageSize, filter)
                .then(res => {
                    console.log(res);
                    commit("setMajorChangeData", res.data)
                    commit('switchMajorChangeLoading', false)

                    return res
                })
        }
    }
}
