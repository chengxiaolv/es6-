import axios from '@/libs/axios'

//个人用户基本信息
export const getPersonalInfo = (id) => {
    return axios.post('api/personal/cstpersonal/info', {
        id
    })
}

export const personalSave = (body) => {
    return axios.post('api/personal/cstpersonal/save', body)
}

export const personalUpdate = (body) => {
    return axios.post('api/personal/cstpersonal/update', body)
}

//客户基本信息
export const customerList = (pageNo, pageSize, searchBy, filter) => {
    var body = {
        page: pageNo,
        limit: pageSize,
        searchBy
    }

    if(typeof filter == "object"){
        Object.assign(body, filter)
    }

    return axios.post('api/comm/cstcustomer/list', body)
}

export const customerInfo = (id) => {
    return axios.post('api/comm/cstcustomer/info',{
        id
    })
}

export const customerUpdate = (body) => {
    return axios.post('api/comm/cstcustomer/update',body)
}


//个人用户用户职业信息
export const getCareerList = (pageNo, pageSize, filter) => {
    var body = {
        page: pageNo,
        limit: pageSize
    }
    
    if(typeof filter == "object"){
        Object.assign(body, filter)
    }
    
    return axios.post('api/personal/cstpersonalcareer/list', body)
}

export const getCareerInfo = (id) => {
    return axios.post('api/personal/cstpersonalcareer/info', {
        id
    })
}

export const careerSave = (body) => {
    return axios.post('api/personal/cstpersonalcareer/save', body)
}


export const careerUpdate = (body) => {
    return axios.post('api/personal/cstpersonalcareer/update', body)
}


export const careerDelete = (id) => {
    return axios.post('api/personal/cstpersonalcareer/delete', {
        id
    })
}


//个人用户收支明细
export const getIncomeInfo = (id) => {
    return axios.post('api/personal/cstpersonalincomeexpend/info', {
        id
    })
}

export const incomeInfoSave = (body) => {
    return axios.post('api/personal/cstpersonalincomeexpend/save',body)
}

export const incomeInfoUpdate = (body) => {
    return axios.post('api/personal/cstpersonalincomeexpend/update',body)
}

export const incomeDelete = (id) => {
    return axios.post('api/personal/cstpersonalincomeexpend/delete', {
        id
    })
}


//个人用户社会关系
export const getSocialRelationshipList = (pageNo, pageSize, filter) => {
    var body = {
        page: pageNo,
        limit: pageSize
    }
    
    if(typeof filter == "object"){
        Object.assign(body, filter)
    }
    
    return axios.post('api/personal/cstpersonalsocialrelationship/list', body)
}

export const getsocialRelationInfo = (id) => {
    return axios.post('api/personal/cstpersonalsocialrelationship/info', {
        id
    })
}

export const socialRelationSave = (body) => {
    return axios.post('api/personal/cstpersonalsocialrelationship/save',body)
}

export const socialRelationUpdate = (body) => {
    return axios.post('api/personal/cstpersonalsocialrelationship/update',body)
}

export const socialRelationDelete = (id) => {
    return axios.post('api/personal/cstpersonalsocialrelationship/delete', {
        id
    })
}

//个人信用信息
export const getCreditInfo = (id) => {
    return axios.post('api/personal/cstpersonalcredit/info', {
        id
    })
}

export const creditSave = (body) => {
    return axios.post('api/personal/cstpersonalcredit/save',body)
}

export const creditUpdate = (body) => {
    return axios.post('api/personal/cstpersonalcredit/update',body)
}

//个人资产信息
export const getAssetsList = (pageNo, pageSize, filter) => {
    var body = {
        page: pageNo,
        limit: pageSize
    }
    
    if(typeof filter == "object"){
        Object.assign(body, filter)
    }
    
    return axios.post('api/personal/cstpersonalassets/list', body)
}

export const getAssetsInfo = (id) => {
    return axios.post('api/personal/cstpersonalassets/info', {
        id
    })
}

export const assetsSave = (body) => {
    return axios.post('api/personal/cstpersonalassets/save',body)
}

export const assetsUpdate = (body) => {
    return axios.post('api/personal/cstpersonalassets/update',body)
}


export const assetsDelete = (id) => {
    return axios.post('api/personal/cstpersonalassets/delete', {
        id
    })
}
//个人流动资产
export const getCurrentAssetsList = (pageNo, pageSize, filter) => {
    var body = {
        page: pageNo,
        limit: pageSize
    }
    
    if(typeof filter == "object"){
        Object.assign(body, filter)
    }
    
    return axios.post('api/personal/cstpersonalcurrentassests/list', body)
}

export const getCurrentAssetsInfo = (id) => {
    return axios.post('api/personal/cstpersonalcurrentassests/info', {
        id
    })
}

export const currentAssetsSave = (body) => {
    return axios.post('api/personal/cstpersonalcurrentassests/save',body)
}

export const currentAssetsUpdate = (body) => {
    return axios.post('api/personal/cstpersonalcurrentassests/update',body)
}

export const currentAssetsDelete = (id) => {
    return axios.post('api/personal/cstpersonalcurrentassests/delete', {
        id
    })
}

//个人负债表
export const getPersonalDebtList = (pageNo, pageSize, filter) => {
    var body = {
        page: pageNo,
        limit: pageSize
    }
    
    if(typeof filter == "object"){
        Object.assign(body, filter)
    }
    
    return axios.post('api/personal/cstpersonaldebt/list', body)
}

export const getPersonalDebtInfo = (id) => {
    return axios.post('api/personal/cstpersonaldebt/info', {
        id
    })
}

export const personalDebtSave = (body) => {
    return axios.post('api/personal/cstpersonaldebt/save',body)
}

export const personalDebtUpdate = (body) => {
    return axios.post('api/personal/cstpersonaldebt/update',body)
}

export const personalDebtDelete = (id) => {
    return axios.post('api/personal/cstpersonaldebt/delete', {
        id
    })
}


//个人资产负债表
export const getAssestsDebtList = (pageNo, pageSize, filter) => {
    var body = {
        page: pageNo,
        limit: pageSize
    }
    
    if(typeof filter == "object"){
        Object.assign(body, filter)
    }
    
    return axios.post('api/personal/cstpersonalassestsdebt/list', body)
}

export const getAssestsDebtInfo = (id) => {
    return axios.post('api/personal/cstpersonalassestsdebt/info', {
        id
    })
}

export const assestsDebtSave = (body) => {
    return axios.post('api/personal/cstpersonalassestsdebt/save',body)
}

export const assestsDebtUpdate = (body) => {
    return axios.post('api/personal/cstpersonalassestsdebt/update',body)
}

export const assestsDebtDelete = (id) => {
    return axios.post('api/personal/cstpersonalassestsdebt/delete', {
        id
    })
}

//个人名下企业
export const getPersonalCorpList = (pageNo, pageSize, filter) => {
    var body = {
        page: pageNo,
        limit: pageSize
    }
    
    if(typeof filter == "object"){
        Object.assign(body, filter)
    }
    
    return axios.post('api/personal/cstpersonalcorp/list', body)
}

export const getPersonalCorpInfo = (id) => {
    return axios.post('api/personal/cstpersonalcorp/info', {
        id
    })
}

export const personalCorpSave = (body) => {
    return axios.post('api/personal/cstpersonalcorp/save',body)
}

export const personalCorpUpdate = (body) => {
    return axios.post('api/personal/cstpersonalcorp/update',body)
}

export const personalCorpDelete = (id) => {
    return axios.post('api/personal/cstpersonalcorp/delete', {
        id
    })
}




//企业客户信息
export const getCorpInfo = (id) => {
    return axios.post('api/corp/cstcorp/info', {
        customerId:id
    })
}

export const corpSave = (body) => {
    return axios.post('api/corp/cstcorp/save',body)
}


export const corpUpdate = (body) => {
    return axios.post('api/corp/cstcorp/update',body)
}

export const corpDelete = (id) => {
    return axios.post('api/corp/cstcorp/delete', {
        id
    })
}


//企业用户股东信息
export const getShareholderList = (pageNo, pageSize,filter) => {
    var body = {
        page: pageNo,
        limit: pageSize
    }

    if(typeof filter == "object"){
        Object.assign(body, filter)
    }

    return axios.post('api/corp/cstcorpshareholder/list', body)
}

export const getShareholderInfo = (id) => {
    return axios.post('api/corp/cstcorpshareholder/info', {
        id
    })
}

export const shareholderSave = (body) => {
    return axios.post('api/corp/cstcorpshareholder/save',body)
}


export const shareholderUpdate = (body) => {
    return axios.post('api/corp/cstcorpshareholder/update',body)
}

export const shareholderDelete = (id) => {
    return axios.post('api/corp/cstcorpshareholder/delete', {
        id
    })
}


//企业用户高管信息
export const getExecutiveList = (pageNo, pageSize,filter) => {
    var body = {
        page: pageNo,
        limit: pageSize
    }

    if(typeof filter == "object"){
        Object.assign(body, filter)
    }

    return axios.post('api/corp/cstcorpexecutive/list', body)
}

export const getExecutiveInfo = (id) => {
    return axios.post('api/corp/cstcorpexecutive/info', {
        id
    })
}

export const executiveSave = (body) => {
    return axios.post('api/corp/cstcorpexecutive/save',body)
}

export const executiveUpdate = (body) => {
    return axios.post('api/corp/cstcorpexecutive/update',body)
}

export const executiveDelete = (id) => {
    return axios.post('api/corp/cstcorpexecutive/delete', {
        id
    })
}

// 客户关联关系
export const getCstRelationInfo = (customerId) => {
    return axios.post('api/comm/cstrelation/info', {
        id: customerId
    })
}

export const cstRelationSave = (body) => {
    return axios.post('api/comm/cstrelation/save', body)
}

export const cstRelationList = (customerId) => {
    return axios.post('api/comm/cstrelation/list', {
        customerId
    })
}

export const cstRelationDelete= (id) => {
    return axios.post('api/comm/cstrelation/delete', {
        id
    })
}

//客户跟进
export const getCsttrackList = (pageNo, pageSize, filter) => {
    var body = {
        page: pageNo,
        limit: pageSize
    }

    if(typeof filter == "object"){
        Object.assign(body, filter)
    }

    return axios.post('api/comm/csttrack/list', body)
}


export const csttrackSave = (body) => {
    return axios.post('api/comm/csttrack/save',body)
}

export const csttrackShow = (customerId) => {
    return axios.post('api/comm/csttrack/show',{
        customerId
    })
}

export const csttrackPlanSave = (body) => {
    return axios.post('api/comm/csttrackplan/save',body)
}

//企业客户上市信息
export const getListedInfoList = (pageNo, pageSize,filter) => {
    var body = {
        page: pageNo,
        limit: pageSize
    }

    if(typeof filter == "object"){
        Object.assign(body, filter)
    }

    return axios.post('api/corp/cstcorplisted/list', body)
}
export const getlistedInfo = (id) => {
    return axios.post('api/corp/cstcorplisted/info', {
        id
    })
}
export const listedInfoSave = (body) => {
    return axios.post('api/corp/cstcorplisted/save',body)
}

export const listedInfoUpdate = (body) => {
    return axios.post('api/corp/cstcorplisted/update',body)
}
export const listedInfoDelete = (id) => {
    return axios.post('api/corp/cstcorplisted/delete', {
        id
    })
}

//企业客户对外担保情况
export const getGuaranteeList = (pageNo, pageSize,filter) => {
    var body = {
        page: pageNo,
        limit: pageSize
    }

    if(typeof filter == "object"){

        Object.assign(body, filter)
    }

    return axios.post('api/corp/cstcorppledgeexternal/list', body)
}
export const getGuaranteeInfo = (id) => {
    return axios.post('api/corp/cstcorppledgeexternal/info', {
        id
    })
}
export const guaranteeSave = (body) => {
    return axios.post('api/corp/cstcorppledgeexternal/save',body)
}

export const guaranteeUpdate = (body) => {
    return axios.post('api/corp/cstcorppledgeexternal/update',body)
}
export const guaranteeDelete = (id) => {
    return axios.post('api/corp/cstcorppledgeexternal/delete', {
        id
    })
}
//企业客户对外投资
export const getInvestabroadList = (pageNo, pageSize,filter) => {
    var body = {
        page: pageNo,
        limit: pageSize
    }

    if(typeof filter == "object"){

        Object.assign(body, filter)
    }

    return axios.post('api/corp/cstcorpinvest/list', body)
}
export const getInvestabroadInfo = (id) => {
    return axios.post('api/corp/cstcorpinvest/info', {
        id
    })
}
export const investabroadSave = (body) => {
    return axios.post('api/corp/cstcorpinvest/save',body)
}

export const investabroadUpdate = (body) => {
    return axios.post('api/corp/cstcorpinvest/update',body)
}
export const investabroadDelete = (id) => {
    return axios.post('api/corp/cstcorpinvest/delete', {
        id
    })
}
//仓库信息
export const getStoreManageList = (pageNo, pageSize,filter) => {
    var body = {
        page: pageNo,
        limit: pageSize
    }

    if(typeof filter == "object"){

        Object.assign(body, filter)
    }

    return axios.post('api/corp/cstcorpdepot/list', body)
}
export const getStoreManageInfo = (id) => {
    return axios.post('api/corp/cstcorpdepot/info', {
        id
    })
}
export const storeManageSave = (body) => {
    return axios.post('api/corp/cstcorpdepot/save',body)
}

export const storeManageUpdate = (body) => {
    return axios.post('api/corp/cstcorpdepot/update',body)
}
export const storeManageDelete = (id) => {
    return axios.post('api/corp/cstcorpdepot/delete', {
        id
    })
}

//信息变更列表
export const bushChangeList = (customerId)=>{
    return axios.post('api/comm/bushischange/list',{
        customerId
    })
}

//登记企业重大变更
export const getMajorChangeList = (pageNo, pageSize,filter) => {
    var body = {
        page: pageNo,
        limit: pageSize
    }

    if(typeof filter == "object"){

        Object.assign(body, filter)
    }

    return axios.post('api/corp/cstcorpchange/list', body)
}
export const getMajorChangeInfo = (id) => {
    return axios.post('api/corp/cstcorpchange/info', {
        id
    })
}
export const majorChangeSave = (body) => {
    return axios.post('api/corp/cstcorpchange/save',body)
}

export const majorChangeUpdate = (body) => {
    return axios.post('api/corp/cstcorpchange/update',body)
}
export const majorChangeDelete = (id) => {
    return axios.post('api/corp/cstcorpchange/delete', {
        id
    })
}
//产品产能情况
export const getProductCapacityList = (pageNo, pageSize,filter) => {
    var body = {
        page: pageNo,
        limit: pageSize
    }

    if(typeof filter == "object"){

        Object.assign(body, filter)
    }

    return axios.post('api/corp/cstcorpproduction/list', body)
}
export const getProductCapacityInfo = (id) => {
    return axios.post('api/corp/cstcorpproduction/info', {
        id
    })
}
export const productCapacitySave = (body) => {
    return axios.post('api/corp/cstcorpproduction/save',body)
}

export const productCapacityUpdate = (body) => {
    return axios.post('api/corp/cstcorpproduction/update',body)
}
export const productCapacityDelete = (id) => {
    return axios.post('api/corp/cstcorpproduction/delete', {
        id
    })
}