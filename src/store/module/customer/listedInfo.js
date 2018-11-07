// 职业信息
import {getListedInfoList} from '@/api/customer'

export default {
    namespaced: true,
    
    state: {
        listedInfoLoading: false,
        listedInfo: {
            pageNo: 1,
            pageSize: 99999,
            total: 0,
            list: []
        }
    },
    mutations: {
        switchListedInfoLoading(state, status) {
            state.listedInfoLoading = status
        },
        setListedInfoData(state, data) {
            var pageData = data.page

            state.listedInfo.total = parseInt(pageData.totalCount)
            state.listedInfo.list = pageData.list
        }
    },
    actions: {
        fetchListedInfoList({ commit, state }, filter) {
            commit('switchListedInfoLoading', true)

            return getListedInfoList(state.listedInfo.pageNo, state.listedInfo.pageSize, filter)
                .then(res => {
                    commit("setListedInfoData", res.data)
                    commit('switchListedInfoLoading', false)

                    return res
                })
        }
    }
}
