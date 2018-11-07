// 社会关系
import { getSocialRelationshipList} from '@/api/customer'

export default {
    namespaced: true,

    state: {
        socialRelationshipLoading: false,
        socialRelationship: {
            pageNo: 1,
            pageSize: 99999,
            total: 0,
            list: []
        }
    },
    mutations: {
        switchSocialRelationshipLoading(state, status) {
            state.socialRelationshipLoading = status
        },
        setSocialRelationshipData(state, data) {
            var pageData = data.page

            state.socialRelationship.total = parseInt(pageData.totalCount)
            state.socialRelationship.list = pageData.list
        }
    },
    actions: {
        fetchSocialRelationship({ commit, state }, filter) {
            commit('switchSocialRelationshipLoading', true)

            return getSocialRelationshipList(state.socialRelationship.pageNo, state.socialRelationship.pageSize, filter)
                .then(res => {
                    commit("setSocialRelationshipData", res.data)
                    commit('switchSocialRelationshipLoading', false)

                    return res
                })
        }
    }
}
