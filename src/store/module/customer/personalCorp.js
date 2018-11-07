// 职业信息
import {getPersonalCorpList} from '@/api/customer'

export default {
    namespaced: true,
    
    state: {
        personalCorpLoading: false,
        personalCorp: {
            pageNo: 1,
            pageSize: 99999,
            total: 0,
            list: []
        }
    },
    mutations: {
        switchPersonalCorpLoading(state, status) {
            state.personalCorpLoading = status
        },
        setPersonalCorpData(state, data) {
            var pageData = data.page

            state.personalCorp.total = parseInt(pageData.totalCount)
            state.personalCorp.list = pageData.list
        }
    },
    actions: {
        fetchPersonalCorpList({ commit, state }, filter) {
            commit('switchPersonalCorpLoading', true)

            return getPersonalCorpList(state.personalCorp.pageNo, state.personalCorp.pageSize, filter)
                .then(res => {
                    commit("setPersonalCorpData", res.data)
                    commit('switchPersonalCorpLoading', false)

                    return res
                })
        }
    }
}
