import Mock from './mock'

// 签约相关
Mock.mock(/contract\/list/, ({ body }) => {
	var total = 40
	var { pageNo, pageSize } = body
	var maxNo = Math.ceil(total / pageSize)
	
	return {
		"code": 200,
		"data": {
			"pageDatas": {
				"total": 40,
				"size": pageSize,
				"pages": total,
				["records|" + (pageNo <= maxNo ? pageSize : 0)]: [{
					"userName": "@cword(2, 3)",
					"cstType": "@cword(2, 3)",
					"projName": "@cword(4, 6)",
					"contractCode": "@word(20)",
					"amount": "@money",
					"loanAmount": "@money",
					"startDate" : "@datetime",
					"contractStat": "@cword(2)",
					"operator": "@cword(2, 3)"
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