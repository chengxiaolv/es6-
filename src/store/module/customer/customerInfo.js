import { customerInfo } from '@/api/customer'

export default {
    namespaced: true,

    state: {
        customerInfo: {}
    },
    getters: {
        
    },
    mutations: {
        // 客户信息
        setCustomerInfo(state, data) {
            state.customerInfo = data.cstCustomer
        }
    },
    actions: {
        // 客户信息
        fetchCustomerInfo({ commit, state }, customerId) {
            return customerInfo(customerId)
                .then(res => {
                    commit("setCustomerInfo", res.data)
                })
        }
    }
}
