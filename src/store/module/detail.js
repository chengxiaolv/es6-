// 个人客户详情状态

export default {
    namespaced: true,

    state: {
        modals: {
            // 客户
            funcs: false,
            material: false,
            relation: false,
            cstTrack: false,
            cstType: false,
            material: false,
            relation: false,
            cstTrack: false,
            cstType: false,
            finance: false,
            certificationReport:false,
            // 进件
            riskControl: false,
            caseInfo: false,
            partener: false,
            fee: false,
            approval: false,
            specCase: false,
            // 签约
            sign: false,
            signApproval: false,
            //个人客户
            personalInfo: false,
            career: false,
            income: false,
            socialRelationship: false,
            account: false,
            credit: false,
            assets: false,
            currentAssets: false,
            personalDebt: false,
            personalCorp: false,
            // 企业客户
            corpInfo: false,
            shareholder: false,
            executive: false,
            listedInfo: false,
            guarantee: false,
            investabroad: false,
            storeManage: false,
            majorChange:false,
            productCapacity:false
        },
        curCustomerId: '',
        curCareerId: '',
        curSocialRelationshipId: '',
        curAccountId: '',
        curAssetsId: '',
        curCurrentAssetsId: '',
        curPersonalDebtId: '',
        curPersonalCorpId: '',
        curShareholderId: '',
        curExecutiveId: '',
        curListedInfoId: '',
        curGuaranteeId: '',
        curInvestabroadId: '',
        curStoreManageId: '',
        curPartenerId: '',
        curFeeId: '',
        currStage: '',
        curMajorChangeId:'',
        curProductCapacityId:''
    },
    mutations: {
        hideAllModal(state){
            Object.keys(state.modals).forEach(k => state.modals[k] = false)
        },
        showModal(state, name){
            if(typeof state.modals[name] != "undefined"){
                state.modals[name] = true
            }
        },
        hideModal(state, name){
            if(typeof state.modals[name] != "undefined"){
                state.modals[name] = false
            }
        },
        toggleModal(state, name){
            if(typeof state.modals[name] != "undefined"){
                state.modals[name] = !state.modals[name]
            }
        },
        setCurCustomerId(state, id){
            state.curCustomerId = id
        },
        setCurCareerId(state, id){
            state.curCareerId = id
        },
        setCurSocialRelationshipId(state, id){
            state.curSocialRelationshipId = id
        },
        setCurAccountId(state, id){
            state.curAccountId = id
        },
        setCurAssetsId(state, id){
            state.curAssetsId = id
        },
        setCurCurrentAssetsId(state, id){
            state.curCurrentAssetsId = id
        },
        setCurPersonalDebtId(state, id){
            state.curPersonalDebtId = id
        },
        setCurPersonalCorpId(state, id){
            state.curPersonalCorpId = id
        },
        setCurShareholderId(state, id){
            state.curShareholderId = id
        },
        setCurExecutiveId(state, id){
            state.curExecutiveId = id
        },
        setCurListedInfoId(state, id){
            state.curListedInfoId = id
        },
        setCurGuaranteeId(state, id){
            state.curGuaranteeId = id
        },
        setCurInvestabroadId(state, id){
            state.curInvestabroadId = id
        },
        setCurStoreManageId(state, id){
            state.curStoreManageId = id
        },
        setCurPartenerId(state, id){
            state.curPartenerId = id
        },
        setCurFeeId(state, id){
            state.curFeeId = id
        },
        setCurrStage(state, stage){
            state.currStage = stage
        },
        setCurMajorChangeId(state,id){
            state.curMajorChangeId = id
        },
        setCurProductCapacityId(state,id){
            state.curProductCapacityId = id
        }
    }
}
