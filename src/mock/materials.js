import Mock from './mock'

// 进件相关
Mock.mock(/materials\/list/, ({ body }) => {
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
                    "customerId": "@uuid",
                    "productType": "@dict('productType')",
                    "busMode": "@dict('busMode')",
                    "applyAmount": "@money",
                    "applyTerm": "@dict('applyTerm')",
                    "applyRate": "@money",
                    "overdueRate": "@money",
                    "overdueRateFlow": "@money",
                    "repeatRateFlow": "@money",
                    "rateType": "@dict('rateType')",
                    "paybackType": "@dict('paybackType')",
                    "applyDate": "@datetime",
                    "currStage": "@cword(4, 5)",
                    "guaranteeType": "@dict('guaranteeType')",
                    "loanInvest": "@dict('loanInvest')",
                    "loanUse": "@cparagraph",
                    "partener": "@uuid",
                    "optrUserId": "@uuid",
                    "managerUserId": "@uuid",
                    "regDate": "@datetime",
                    "remark": "@cparagraph"
                }]
            }
        },
        "msg": "ok",
        "msgs": null
    }
})
