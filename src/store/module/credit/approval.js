// 审批记录
import { busProcessList } from '@/api/common'

export default {
	namespaced: true,
	
    state: {
        approvalLoading: false,
        approval: {
            pageNo: 1,
            pageSize: 99999,
            total: 0,
            list: []
        }
    },
    mutations: {
        switchApprovalLoading(state, status) {
            state.approvalLoading = status
        },
        setApprovalData(state, data) {
            var pageData = data.page

            state.approval.total = parseInt(pageData.totalCount)
            state.approval.list = pageData.list
        }
    },
    actions: {
        fetchApproval({ commit, state }, filter) {
            commit('switchApprovalLoading', true)

            return busProcessList(state.approval.pageNo, state.approval.pageSize, null, filter)
                .then(res => {
                    commit("setApprovalData", res.data)
                    commit('switchApprovalLoading', false)

                    return res
                })
        }
    }
}