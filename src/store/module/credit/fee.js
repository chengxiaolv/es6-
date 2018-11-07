// 费用信息
import { feeStandardList} from '@/api/common'

export default {
    namespaced: true,

    state: {
        feeLoading: false,
        fee: {
            pageNo: 1,
            pageSize: 99999,
            total: 0,
            list: []
        }
    },
    mutations: {
        switchFeeLoading(state, status) {
            state.partenerLoading = status
        },
        setFeeData(state, data) {
            var pageData = data.page

            state.fee.total = parseInt(pageData.totalCount)
            state.fee.list = pageData.list
        }
    },
    actions: {
        fetchFee({ commit, state }, filter) {
            commit('switchFeeLoading', true)

            return feeStandardList(state.fee.pageNo, state.fee.pageSize, null, filter)
                .then(res => {
                    commit("setFeeData", res.data)
                    commit('switchFeeLoading', false)

                    return res
                })
        }
    }
}
