import { csttrackShow } from '@/api/customer'

export default {
    namespaced: true,

    state: {
        // 客户跟进
        tracks: {
            pageNo: 1,
            pageSize: 99999,
            total: 0,
            list: []
        }
    },
    mutations: {
        // 客户跟进
        setTrackData(state, data) {
            state.tracks.list = data.TrackList || []
        }
    },
    actions: {
        // 客户跟进
        fetchCstTrack({ commit, state }, customerId) {
            return csttrackShow(customerId)
                .then(res => {
                    commit("setTrackData", res.data)
                })
        }
    }
}
