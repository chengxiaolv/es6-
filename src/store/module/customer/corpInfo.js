// 进件信息
import { getCorpInfo } from '@/api/customer'

export default {
    namespaced: true,
    state: {
        corpInfo: {}
    },
    getters:{
        corpInfoForShow(state){
            var show = {
                corpName: "",
                credNumber: "",
                corpType: "",
                regType: "",
                regAddr: "",
                regCapital: "",
                openTime: "",
                closeTime: "",
                cityId: "",
                legalName: "",
                legalCredType: "",
                legalCredNumber: "",
                category: "",
                totalMoney: "",
                yearIncome: "",
                employeeMember: "",
                corpScale: "",
                busiScope: "",
                contactAddr: "",
                postcode: "",
                fax: "",
                managerId: "",
                contactPerson: "",
                contactMobile: "",
                placeId: "",
                presenter: "",
                groupCustomer: "",
                remark: ""
            }

            Object.keys(show).forEach(name => show[name] = state.corpInfo[name])

            return show
        }
    },
    mutations: {
        setCorpData(state, data) {
           //if(JSON.stringify(data) != "{}"){
                state.corpInfo = data.cstCorp || {}
                state.corpInfo.managerName = data.managerName || ''
           // }
        }
    },
    actions: {
        fetchCorpInfo({ commit, state }, corpId) {
            return getCorpInfo(corpId)
                .then(res => {                 
                    commit("setCorpData", res.data)
                    return res
                })
        }
    }
}
