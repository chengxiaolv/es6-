// 职业信息
import {getAssetsList} from '@/api/customer'

export default {
    namespaced: true,
    
    state: {
        assetsLoading: false,
        assets: {
            pageNo: 1,
            pageSize: 99999,
            total: 0,
            list: []
        }
    },
    getters :{
        assetsList: state=>{ 
            return state.assets.list.map(
                v => {
                    var temp = Object.assign({},v)
                    if(temp.carNumber){
                        temp.assetsNumber = temp.carNumber
                    }else if(temp.deedId){
                        temp.assetsNumber = temp.deedId
                    }else{
                        temp.assetsNumber = '-'
                    }
                    return temp
                }
            )
        }
    },
    mutations: {
        switchAssetsLoading(state, status) {
            state.assetsLoading = status
        },
        setAssetsData(state, data) {
            var pageData = data.page

            state.assets.total = parseInt(pageData.totalCount)
            state.assets.list = pageData.list
        }
    },
    actions: {
        fetchAssetsList({ commit, state }, filter) {
            commit('switchAssetsLoading', true)

            return getAssetsList(state.assets.pageNo, state.assets.pageSize, filter)
                .then(res => {
                    commit("setAssetsData", res.data)
                    commit('switchAssetsLoading', false)

                    return res
                })
        }
    }
}
