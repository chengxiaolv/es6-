import { bushChangeList } from '@/api/customer'

export default {
    namespaced: true,

    state: {
        //操作记录
        records: []
    },
    mutations: {
        //操作记录
        setRecordData(state, data) {
            data.list.forEach(v => v.content = v.content.split(';'))
            state.records = data.list || []
        }
    },
    actions: {
        //操作记录
        fetchOpeRecord({ commit, state }, customerId) {
            return bushChangeList(customerId)
                .then(res => {
                    commit("setRecordData", res.data)
                })
        }
    }
}
