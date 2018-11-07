// 职业信息
import {getStoreManageList} from '@/api/customer'

export default {
    namespaced: true,
    
    state: {
        storeManageLoading: false,
        storeManage: {
            pageNo: 1,
            pageSize: 99999,
            total: 0,
            list: []
        }
    },
    mutations: {
        switchStoreManageLoading(state, status) {
            state.storeManageLoading = status
        },
        setStoreManageData(state, data) {
            var pageData = data.page
            
            state.storeManage.total = parseInt(pageData.totalCount)
            state.storeManage.list = pageData.list
        }
    },
    actions: {
        fetchStoreManageList({ commit, state }, filter) {
            commit('switchStoreManageLoading', true)
            
            return getStoreManageList(state.storeManage.pageNo, state.storeManage.pageSize, filter)
                .then(res => {
                    commit("setStoreManageData", res.data)
                    commit('switchStoreManageLoading', false)

                    return res
                })
        }
    }
}
