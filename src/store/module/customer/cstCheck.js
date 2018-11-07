import { cstCheck } from '@/api/common'

export default {
    namespaced: true,

    state: {
        // 客户资料完整度
        "count": 0,
        "list": {
          "executive": 0,
          "corp": 0,
          "depot": 0,
          "production": 0,
          "corpInvest": 0,
          "personInvest": 0,
          "change": 0,
          "report": 0,
          "shareholder": 0,
          "account": 0
        }
    },
    mutations: {
        // 客户跟进
        setCheckData(state, data) {
            state.count = data.count
            state.list = data.list
        }
    },
    actions: {
        // 客户跟进
        fetchCstCheck({ commit, state }, customerId) {
            return cstCheck(customerId)
                .then(res => {
                    commit("setCheckData", res.data)
                })
        }
    }
}
