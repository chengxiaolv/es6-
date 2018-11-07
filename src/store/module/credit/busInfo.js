import {showCases} from '@/api/materials'

export default {
    namespaced: true,

    state: {
        // 业务信息
        busInfo:{
            applyCount: 0,
            loanCount: 0,
            signCount: 0,
            list: []
        }
    },
    getters: {
        // 当前业务信息
        currentBusInfo(state){
            return state.busInfo.list[0]
        }
    },
    mutations: {
        // 业务信息
        setBusInfo(state, data){
            state.busInfo.applyCount = data.applyCount || 0
            state.busInfo.loanCount = data.loanCount || 0
            state.busInfo.signCount = data.signCount || 0
            state.busInfo.list = data.list || []
        }
    },
    actions: {
        // 业务信息
        fetchBusInfo({commit, state}, customerId){
            return showCases(customerId)
                .then(res => {
                    commit("setBusInfo", res.data)
                })
        }
    }
}
