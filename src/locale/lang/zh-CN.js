export default {
	// 菜单
	"home": "首页",
	"workbench": "我的工作台",
	"todo": "我的待办",
	"dashboard": "仪表盘",
	"customer": "客户管理",
	"customer-list": "@:customer",
	"personal-detail": "客户详情",
	"corp-detail": "@:personal-detail",
	"materials": "进件管理",
	"materials-list": "@:materials",
	"materials-detail": "进件详情",
	"contract": "签约管理",
	"contract-list": "@:contract",
	"contract-detail":"签约详情",
	"loan": "贷后管理",
	"guarantee": "押品管理",
	"archives": "档案管理",
	"image": "影像材料",
	"document": "文档材料",
	"report": "报表查询",
	"order": "订单管理",
	"order1": "下户订单",
	"order2": "评估订单",
	
	// 常量
	"constant":{
		"process":{
			"stage":{
				"Initiate": "发起流程",
				"InProcess": "流程审批",
				"EndApproval": "审批结束"
			},
			"auditStatType":{
				"Pass": "通过",
				"Reject": "否决",
				"SendBack": "打回",
				"Transfer": "转签"
			},
			"action":{
				"Pass": "通过",
				"Reject": "否决",
				"SendBack": "打回"
			}
		},
		"sex":{
			'Male': "男",
			'Female': "女"
		},
		"choise":{
			"Yes":"是",
			"No":"否"
		},
		"yseOrNo":{
			"Yes":"是",
			"No":"否"
		}
	},

	// 个人客户信息
	personal: {
		// 基础信息
		"userName": "用户姓名",
		"credType": "证件类型",
		"credNumber": "证件号码",
		"birthday": "出生日期",
		"sex": "性别",
		"nation": "民族",
		"maritalStat": "婚姻状况",
		"cityId": "客户所属区域",
		"birthAddr": "户籍地址",
		"educationLevel": "最高学历",
		"livingStat": "居住状况",
		"mobile": "手机号码",
		"qq": "QQ号码",
		"wechat": "微信",
		"email": "邮箱",
		"postcode": "邮政编码",
		"contactAddr": "通讯地址",
		"contactMobile": "紧急联系人电话",
		"placeId": "信息来源",
		"managerUserName": "客户经理",

		// 收支信息
		"mainIncome": "主要经济来源",
		"otherIncome": "其它经济来源",
		"familyIncomeInMonth": "家庭月收入",
		"personalIncomeInMonth": "个人月收入",
		"familyMonthExpend": "家庭月支出",
		"personMonthExpend": "个人月支出",
		"familyMember": "家庭人口数",
		"supportMember": "供养人口数",

		//个人信用
		"creditStat": "商业资信状况",
		"guaranteeStat": "企业为他人担保的履约情况",
		"arrearsTax": "有无拖欠国家税款",
		"arrearsEmployee": "有无拖欠职工工资",
		"arrearsRent": "有无拖欠水电费、租金",
		"remark": "备注"
	},

	//企业用户
	corp: {
		base: {
			//基础信息
			"id": "数据编号",
			"customerId": "客户数据编号",
			"corpName": "客户姓名",
			"credNumber": "统一社会信用代码",
			"corpType": "企业性质*",
			"regType": "注册类型*",
			"regAddr": "注册地址*",
			"regCapital": "注册资本*",
			"openTime": "营业开始日期",
			"closeTime": "营业结束日期",
			"cityId": "行政区划",
			"legalName": "法人代表姓名",
			"legalCredType": "法人证件类型",
			"legalCredNumber": "法人证件号码",
			"category": "行业分类",
			"totalMoney": "资产总额",
			"yearIncome": "营业收入",
			"employeeMember": "员工人数",
			"corpAmount": "企业规模",
			"busiScope": "经营范围",
			"contactAddr": "通讯地址",
			"postcode": "邮政编码",
			"fax": "传真号码",
			"managerName": "客户经理",
			"contactPerson": "联系人",
			"contactMobile": "联系人电话",
			"placeId": "信息来源",
			"groupCustomer": "是否集团客户",
			"remark": "备注",
			"corpId": "企业数据编号",
			"createTime": "创建时间",
			"updateTime": "最后修改时间",
			"createUserId": "创建者编号",
			"updateUserId": "修改者编号"

		},

		shareholder: {
			//企业高管信息
			"id": "数据编号",
			"customerId": "客户数据编号",
			"userName": "高管人员",
			"position": "高管人员类别",
			"credType": "证件类型",
			"credNumber": "证件号码",
			"sex": "性别",
			"birthday": "出生日期",
			"educationLevel": "最高学历",
			"resume": "工作简历",
			"remark": "备注",
			"corpId": "企业数据编号",
			"createTime": "创建时间",
			"updateTime": "最后修改时间",
			"createUserId": "创建者编号",
			"updateUserId": "修改者编号"
		}
	},

	// 进件信息
	case: {
		base: {
			"productType": "产品类型",
			"busMode": "合作渠道",
			"projectName": "项目名称",
			"applyAmount": "申请金额",
			"applyTerm": "申请期限",
			"applyRate": "申请利率",
			"overdueRate": "逾期利率",
			"overdueRateFlow": "逾期利率上浮",
			"repeatRateFlow": "复利利率上浮",
			"rateType": "计息方式",
			"paybackType": "还款方式",
			"applyDate": "申请日期",
			"currStage": "办理阶段",
			"guaranteeType": "担保方式",
			"loanInvest": "贷款意向",
			"loanUse": "贷款用途",
			"partener": "共同借款人",
			"managerUserName": "业务经理",
			"regDate": "进件日期"
		}
	},

	sign: {
		base: {
			"projectName": '项目名称',
			"contractCode": '合同编号',
			"productType": '产品类型',
			"busMode": '业务模式',
			"amount": "合同金额",
			"rate": "利率",
			"extensionRate": '展期利率',
			"paybackType": "还款方式",
			"guaranteeType": '担保方式',
			"overdueRateFlow": '逾期利率上浮',
			"repeatRateFlow": '复利利率上浮',
			"rateType": '计息方式',
			"signDate": '合同签订日期',
			"term": "期限",
			"startDate": '合同开始期',
			"endDate": '合同结束日期',
			"recycle": '额度是否可循环',
			"loanInvest": '贷款投向',
			"graceDay": '宽限天数',
			"notice": '是否通知买方',
			"paymentCond": '付款条件',
			"contractStat": '合同状态',
			"paymentType": '支付方式',
			"loanAccount": '借款账号',
			"loanBank": '借款账号开户行',
			"loanName": '借款账号名称',
			"repaymentAccount": '还款账号',
			"repaymentBank": '还款账号开户行',
			"repaymentName": '还款账号名称',
			"receiveAccount": '收款账号',
			"receiveBank": '收款账号开户行',
			"receiveName": '收款账号名称',
			"optrUserName": '办理人员',
			"managerUserName": '客户经理',
			"remark": '备注'
		}
	}
}
