// 职业信息
import { getCareerList} from '@/api/customer'

export default {
    namespaced: true,

    state: {
        careerLoading: false,
        career: {
            pageNo: 1,
            pageSize: 99999,
            total: 0,
            list: []
        }
    },
    mutations: {
        switchCareerLoading(state, status) {
            state.careerLoading = status
        },
        setCareerData(state, data) {
            var pageData = data.page

            state.career.total = parseInt(pageData.totalCount)
            state.career.list = pageData.list
        }
    },
    actions: {
        fetchCareer({ commit, state }, filter) {
            commit('switchCareerLoading', true)

            return getCareerList(state.career.pageNo, state.career.pageSize, filter)
                .then(res => {
                    commit("setCareerData", res.data)
                    commit('switchCareerLoading', false)

                    return res
                })
        }
    }
}
