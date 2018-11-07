// 进件信息
import { contractInfo, getContractByCaseId } from '@/api/contract'

export default {
    namespaced: true,

    state: {
        signInfo: {}
    }, 
    getters: {
        signInfoForShow(state) {
            var show = {
                "productType": '',
                "amount": '',
                "busMode": '',
                "contractCode": '',
                "contractStat": '',
                "endDate": '',
                "extensionRate": '',
                "graceDay": '',
                "guaranteeType": '',
                "loanInvest": '',
                "rate": '',
                "rateType": '',
                "overdueRateFlow": '',
                "repeatRateFlow": '',
                "paybackType": '',
                "paymentCond": '',
                "paymentType": '',
                "notice": '',
                "loanAccount": '',
                "loanBank": '',
                "loanName": '',
                "receiveAccount": '',
                "receiveBank": '',
                "receiveName": '',
                "recycle": '',
                "remark": '',
                "repaymentAccount": '',
                "repaymentBank": '',
                "repaymentName": '',
                "signDate": '',
                "startDate": '',
                "status": '',
                "term": '',
                "optrUserName": '',
                "managerUserName": ''
            }

            Object.keys(show).forEach(name => show[name] = state.signInfo[name])

            return show
        }
    },
    mutations: {
        setSignData(state, data) {
            data = data || {}
            state.signInfo = data
        }
    },
    actions: {
        fetchSignInfo({ commit, state }, id) {
            return contractInfo(id)
                .then(res => {
                    commit("setSignData", res.data.map)

                    return res
                })
        },
        fetchSignInfoByCaseId({ commit, state }, caseId) {
            return getContractByCaseId(caseId)
                .then(res => {
                    commit("setSignData", res.data)

                    return res
                })
        }
    }
}
