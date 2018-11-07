// 职业信息
import {getCurrentAssetsList} from '@/api/customer'

export default {
    namespaced: true,
    
    state: {
        currentAssetsLoading: false,
        currentAssets: {
            pageNo: 1,
            pageSize: 99999,
            total: 0,
            list: []
        }
    },
    mutations: {
        switchCurrentAssetsLoading(state, status) {
            state.currentAssetsLoading = status
        },
        setCurrentAssetsData(state, data) {
            var pageData = data.page

            state.currentAssets.total = parseInt(pageData.totalCount)
            state.currentAssets.list = pageData.list
        }
    },
    actions: {
        fetchCurrentAssetsList({ commit, state }, filter) {
            commit('switchCurrentAssetsLoading', true)

            return getCurrentAssetsList(state.currentAssets.pageNo, state.currentAssets.pageSize, filter)
                .then(res => {
                    commit("setCurrentAssetsData", res.data)
                    commit('switchCurrentAssetsLoading', false)

                    return res
                })
        }
    }
}
