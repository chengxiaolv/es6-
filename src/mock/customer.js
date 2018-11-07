import Mock from './mock'

// 基础客户
Mock.mock(/comm\/cstcustomer\/list/, ({ body }) => {
    var total = 40
    var { page, limit } = body
    var maxNo = Math.ceil(total / limit)

    return {
        "code": 200,
        "data": {
            "page": {
                "totalCount": 40,
                "pageSize": limit,
                ["list|" + (page <= maxNo ? limit : 0)]: [{
                    "id": "@uuid",
                    "userName": "@cword(2, 3)",
                    "cstType": "@dict('cstType')",
                    "credType": "@dict('credTypePersonal')",
                    "credNumber": "@ID",
                    "contactPerson": "@cword(2, 3)",
                    "contactMobile": "@tel",
                    "cstSort": "@dict('cstSort')",
                    "cstSortReason": "@cword(4, 6)",
                    "credLevel": "@dict('credLevel')",
                    "managerUserName": "@cword(2, 3)",
                    "remark": "@cparagraph",
                    "corpId": "@uuid",
                    "sourceFrom": "@dict('sourceFrom')"
                    // "star": "@integer(1, 5)",
                    // "votedTime": "@datetime",
                    // "mobile": "@tel",
                    // "id": "@uuid",
                    // "customerName": "@cword(2, 3)",
                    // "evaluationMark": "@cword(100)",
                    // "msg": "@cword(100)"
                }]
            }
        },
        "msg": "ok",
        "msgs": null
    }
})

// 个人客户
Mock.mock(/api\/personal\/cstpersonal\/info/, ({ body, url, type }) => {
    var { id } = body

    return {
        code: 200,
        data: {
            "id": id,
            "customerId": "@word(10)",
            "userName": "@cname",
            "sex|0-1": 1,
            "credType": "@dict('credTypePersonal')",
            "credNumber": Mock.mock("@id"),
            "maritalStat": "@dict('maritalStat')",
            "birthday": "@datetime",
            "nation": "@dict('nation')",
            "mobile": "@tel",
            "mail": "@email",
            "livingStat": "@dict('livingStat')",
            "politicalStat": "@cword(3,10)",
            "healthStat": "@cword(3,10)",
            "educationLevel": "@dict('educationLevel')",
            "cityId": "@uuid",
            "birthAddr": "@county(true) 我家",
            "contactAddr": "@county(true) 我家",
            "currAddr": "@cword(3,10)",
            "weibo": "@email",
            "postcode": "@zip",
            "qq": "@zip",
            "wechat": "@email",
            "contactPerson": "@cname",
            "email": "@email",
            "sourceFrom": "@dict('sourceFrom')",
            "managerUserId": "@cname",
            "contactMobile": "@tel",
            "remark": "@cparagraph(50,200)",
            "corpId": "@uuid",
            "createTime": "@datetime",
            "updateTime": "@datetime",
            "createUserId": "@uuid",
            "updateUserId": "@uuid"
        }

    }
})

Mock.mock(/personal\/cstpersonalcareer\/list/, ({ body }) => {
    var total = 40
    var { page, limit } = body
    var maxNo = Math.ceil(total / limit)

    return {
        "code": 200,
        "data": {
            "page": {
                "totalCount": 40,
                "pageSize": limit,
                "totalPage": total,
                ["list|" + (page <= maxNo ? limit : 0)]: [{
                    "id": "@uuid",
                    "customerId": "@uuid",
                    "corpName": "@cword(4, 6)",
                    "corpType": "@dict('corpType')",
                    "corpTel": "@tel",
                    "workStartDate": "@datetime",
                    "workEndDate": "@datetime",
                    "career": "@cword(2, 3)",
                    "position": "@cword(2, 4)",
                    "corpAddr": "@county(true)",
                    "corpAmount": "@dict('corpAmount')",
                    "incomeInMonth": "@money",
                    "howLongWork": "@integer",
                    "remark": "@cword(10)",
                    "corpId": "@uuid"
                }]
            }
        },
        "msg": "ok",
        "msgs": null
    }
})

Mock.mock(/api\/personal\/cstpersonalcareer\/info/, ({ body, url, type }) => {
    var { id } = body

    return {
        code: 200,
        data: {
            "id": id,
            "customerId": "@word(10)",
            "corpName": "@city(true)民政局",
            "corpType": "@corpType",
            "corpTel": "@tel",
            "workStartDate": "string",
            "workEndDate": "string",
            "career": "@cword(2)大师",
            "position": "@cword(3)部长",
            "corpAddr": "@county(true) 不得了大厦",
            "corpScale": "@corpScale",
            "incomeInMonth|20000-30000": 1,
            "howLongWork|5-10": 1,
            "remark": "string",
            "corpId": "string",
            "createTime": "@datetime",
            "updateTime": "@datetime",
            "createUserId": "@uuid",
            "updateUserId": "@uuid"
        }

    }
})

Mock.mock(/api\/personal\/cstpersonalincomeexpend\/info/, ({ body, url, type }) => {
    var { id } = body

    return {
        code: 200,
        data: {
            "id": id,
            "customerId": "@uuid",
            "mainIncome": "以@cword(5)为生",
            "otherIncome": "兼职@cword(5)",
            "familyIncomeInMonth|20000-30000": 1,
            "personalIncomeInMonth|20000-30000": 1,
            "familyMonthExpend|20000-30000": 1,
            "personMonthExpend|20000-30000": 1,
            "familyMember|1-3": 1,
            "supportMember|1-3": 1,
            "remark": "@cparagraph(50,200)",
            "corpId": "@uuid",
            "createTime": "@datetime",
            "updateTime": "@datetime",
            "createUserId": "@uuid",
            "updateUserId": "@uuid"
        }
    }
})

Mock.mock(/api\/personal\/cstpersonal\/save/, ({ body, url, type }) => {
    return { "code": 200 }
})

// 企业用户
Mock.mock(/api\/corp\/cstcorp\/info/, ({ body, url, type }) => {
    var { id } = body

    return {
        code: 200,
        data: {
            cstCorp: {
                "id": id,
                "customerId": "@uuid",
                "corpName": "@cname 家族企业",
                "credNumber": "@uuid",
                "corpType": "@cword(2, 4)",
                "regType": "",
                "regAddr": "@city(true) 我家",
                "regCapital|2000000-3000000": 1,
                "openTime": "@datetime",
                "closeTime": "@datetime",
                "cityId": "",
                "legalName": "@cname",
                "legalCredType": "@credType",
                "legalCredNumber": Mock.mock("@id"),
                "catalog": "cword(10)",
                "totalMoney|2000000-3000000": 1,
                "yearIncome|2000000-3000000": 1,
                "employeeMember|200-300": 1,
                "corpAmount": "",
                "busiScope": "@cword(120)",
                "contactAddr": "@city(true) 我家",
                "postcode": "@zip",
                "fax": "@tel",
                "managerId": "@uuid",
                "contactPerson": "@cname",
                "contactMobile": "@tel",
                "placeId": "",
                "groupCustomer|0-1": 1,
                "remark": "@cword(80)",
                "corpId": "@uuid",
                "createTime": "@datetime",
                "updateTime": "@datetime",
                "createUserId": "@uuid",
                "updateUserId": "@uuid"
            }
        }
    }
})

Mock.mock(/corp\/cstcorpshareholder\/list/, ({ body }) => {
    var total = 40
    var { page, limit } = body
    var maxNo = Math.ceil(total / limit)

    return {
        "code": 200,
        "data": {
            "page": {
                "totalCount": 40,
                "pageSize": limit,
                "totalPage": total,
                ["list|" + (page <= maxNo ? limit : 0)]: [{
                    "id": "@uuid",
                    "customerId": "@uuid",
                    "userName": "@cname",
                    "shareholderType": "string",
                    "credType": "string",
                    "credNumber": "string",
                    "investType": "string",
                    "investAmount|2000000-3000000": 1,
                    "percent|1-100": 1,
                    "investDate": "@datetime",
                    "remark": "string",
                    "corpId": "string",
                    "createTime": "@datetime",
                    "updateTime": "@datetime",
                    "createUserId": "@uuid",
                    "updateUserId": "@uuid"
                }]
            }
        },
        "msg": "ok",
        "msgs": null
    }
})

Mock.mock(/corp\/cstcorpexecutive\/list/, ({ body }) => {
    var total = 40
    var { page, limit } = body

    var maxNo = Math.ceil(total / limit)

    return {
        "code": 200,
        "data": {
            "page": {
                "totalCount": 40,
                "pageSize": limit,
                "totalPage": total,
                ["list|" + (page <= maxNo ? limit : 0)]: [{
                    "id": "@uuid",
                    "customerId": "@uuid",
                    "userName": "@cname",
                    "position": "@cword(3)",
                    "credType": "@dict('credTypePersonal')",
                    "credNumber": Mock.mock("@id"),
                    "sex|0-1": 1,
                    "birthday": "string",
                    "educationLevel": "@dict('educationLevel')",
                    "resume": "@cparagraph(100)",
                    "remark": "@cparagraph(100)",
                    "corpId": "@uuid",
                    "createTime": "@datetime",
                    "updateTime": "@datetime",
                    "createUserId": "@uuid",
                    "updateUserId": "@uuid"
                }]
            }
        },
        "msg": "ok",
        "msgs": null
    }
})

Mock.mock(/api\/corp\/cstcorp\/save/, ({ body }) => {
    return {
        code: 200,
        data: {

        }
    }
})

Mock.mock(/api\/corp\/cstcorpshareholder\/info/, ({ body, url, type }) => {
    var { id } = body

    return {
        code: 200,
        data: {
            "id": "@uuid",
            "customerId": "@uuid",
            "userName": "@cname",
            "shareholderType": "string",
            "credType": "string",
            "credNumber": "string",
            "investType": "string",
            "investAmount|2000000-3000000": 1,
            "percent|1-100": 1,
            "investDate": "@datetime",
            "remark": "string",
            "corpId": "string",
            "createTime": "@datetime",
            "updateTime": "@datetime",
            "createUserId": "@uuid",
            "updateUserId": "@uuid"
        }
    }
})

Mock.mock(/api\/corp\/cstcorpexecutive\/info/, ({ body, url, type }) => {
    var { id } = body

    return {
        code: 200,
        data: {
            "id": "@uuid",
            "customerId": "@uuid",
            "userName": "@cname",
            "position": "@cword(3)",
            "credType": "@dict('credTypePersonal')",
            "credNumber": Mock.mock("@id"),
            "sex|0-1": 1,
            "birthday": "string",
            "educationLevel": "@dict('educationLevel')",
            "resume": "@cparagraph(100)",
            "remark": "@cparagraph(100)",
            "corpId": "@uuid",
            "createTime": "@datetime",
            "updateTime": "@datetime",
            "createUserId": "@uuid",
            "updateUserId": "@uuid"
        }
    }
})

export default Mock
