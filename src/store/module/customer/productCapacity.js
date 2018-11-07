// 职业信息
import {getProductCapacityList} from '@/api/customer'

export default {
    namespaced: true,
    
    state: {
        productCapacityLoading: false,
        productCapacity: {
            pageNo: 1,
            pageSize: 99999,
            total: 0,
            list: []
        }
    },
    mutations: {
        switchProductCapacityLoading(state, status) {
            state.productCapacityLoading = status
        },
        setProductCapacityData(state, data) {
            var pageData = data.page
            state.productCapacity.total = parseInt(pageData.totalCount)
            state.productCapacity.list = pageData.list
        }
    },
    actions: {
        fetchProductCapacityList({ commit, state }, filter) {
            commit('switchProductCapacityLoading', true)

            return getProductCapacityList(state.productCapacity.pageNo, state.productCapacity.pageSize, filter)
                .then(res => {
                    console.log(res);
                    commit("setProductCapacityData", res.data)
                    commit('switchProductCapacityLoading', false)

                    return res
                })
        }
    }
}
