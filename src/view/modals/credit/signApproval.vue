<template>
	<Form ref="pInfo" :model="pInfo" :rules="ruleValidate" :label-width="120">
		<Row>
			<Col span="12">
				<FormItem label="合同编号:">
					<Input v-model="signInfo.contractCode" placeholder="合同编号" :maxlength="32" :readonly="true"></Input>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="客户名称:">
					<Input v-model="caseInfo.userName" placeholder="客户名称" :readonly="true"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="产品类型:">
					<Select v-model="signInfo.productType" :readonly="true">
						<Option v-for="(item, index) in productTypeList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="项目名称:">
					<Input v-model="caseInfo.projectName" placeholder="项目名称" :readonly="true"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="合同金额:">
					<input-number v-model="signInfo.amount" placeholder="合同金额" :allowNegative="false" :readonly="true"></input-number>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="业务模式:" prop="busMode" :readonly="true">
					<Select v-model="signInfo.busMode" placement="top">
						<Option v-for="(item, index) in busModeList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="合同签订日期:">
					<DatePicker v-model="signDateMask" type="date" placeholder="合同签订日期" :readonly="true"></DatePicker>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="合同开始日期:">
					<DatePicker v-model="startDateMask" type="date" placeholder="合同开始日期" :readonly="true"></DatePicker>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="合同结束日期:">
					<DatePicker v-model="endDateMask" type="date" placeholder="合同结束日期" :readonly="true"></DatePicker>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="期限:">
					<input-number v-model="signInfo.term" placeholder="期限" :allowNegative="false" 
						:allowDecimal="false" :includeThousandsSeparator="false" :readonly="true">
						<span slot="append">月</span>
					</input-number>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="展期利率:">
					<input-number v-model="signInfo.extensionRate" placeholder="展期利率" :allowNegative="false" :readonly="true"></input-number>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="利率:">
					<input-number v-model="signInfo.rate" placeholder="利率" :allowNegative="false" :readonly="true"></input-number>
				</FormItem>
			</Col>
			<Col span="12">
                <FormItem label="贷款投向">
                    <loan-invest-tree v-model="signInfo.loanInvest"></loan-invest-tree>
                </FormItem>
            </Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="逾期利率上浮:" prop="overdueRateFlow">
					<input-number v-model="signInfo.overdueRateFlow" placeholder="逾期利率上浮" :allowNegative="false" :readonly="true">
						<span slot="append">%</span>
					</input-number>
				</FormItem>
			</Col>
			<Col span="12">
                <FormItem label="复利利率上浮:" prop="repeatRateFlow">
					<input-number v-model="signInfo.repeatRateFlow" placeholder="复利利率上浮" :allowNegative="false" :readonly="true">
						<span slot="append">%</span>
					</input-number>
				</FormItem>
            </Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="还款方式:">
					<Select v-model="signInfo.paybackType" :readonly="true">
						<Option v-for="(item, index) in paybackTypeList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="计息方式:">
					<Select v-model="signInfo.rateType" :readonly="true">
						<Option v-for="(item, index) in rateTypeList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="担保方式:">
					<Select v-model="signInfo.guaranteeType" :readonly="true">
						<Option v-for="(item, index) in guaranteeTypeList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="支付方式:">
					<Select v-model="signInfo.paymentType" :readonly="true">
						<Option v-for="(item, index) in paymentTypeList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="24">
				<FormItem label="付款条件:">
					<Input v-model="signInfo.paymentCond" placeholder="付款条件" :maxlength="32" :readonly="true"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="借款账户:">
					<Select v-model="signInfo.loanAccount" :readonly="true">
						<Option v-for="(item, index) in accountList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="借款帐号名称:">
					<Input v-model="signInfo.loanName" placeholder="付款条件" :readonly="true"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="借款账号开户行:">
					<Input v-model="signInfo.loanBank" placeholder="借款账号开户行" :readonly="true"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="还款账户:">
					<Select v-model="signInfo.repaymentAccount" :readonly="true">
						<Option v-for="(item, index) in accountList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="还款帐号名称:">
					<Input v-model="signInfo.repaymentName" placeholder="还款帐号名称" :readonly="true"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="还款账号开户行:">
					<Input v-model="signInfo.repaymentBank" placeholder="还款账号开户行" :readonly="true"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="收款账号:" prop="receiveAccount">
					<Select v-model="signInfo.receiveAccount" :readonly="true">
						<Option v-for="(item, index) in accountList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="收款账号名称:" prop="receiveName">
					<Input v-model="signInfo.receiveName" placeholder="收款账号名称" :readonly="true"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="收款账号开户行:" prop="receiveBank">
					<Input v-model="signInfo.receiveBank" placeholder="收款账号开户行" :readonly="true"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="额度是否可循环:">
					<Select v-model="signInfo.recycle" :readonly="true">
						<Option v-for="(item, index) in yseOrNoList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="是否通知买方:">
					<Select v-model="signInfo.notice" :readonly="true">
						<Option v-for="(item, index) in yseOrNoList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="宽限天数:">
					<input-number v-model="signInfo.graceDay" placeholder="宽限天数" :allowNegative="false" 
						:allowDecimal="false" :includeThousandsSeparator="false" :readonly="true">
						<span slot="append">天</span>
					</input-number>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="办理人员	：">
					<lookup v-model="optrUserIdMask" placeholder="请选择办理人员" title="选择业务员" :modalHeight="480" :readonly="true">
						<!-- <select-user></select-user> -->
					</lookup>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="客户经理：">
					<lookup v-model="managerUserIdMask" placeholder="请选择客户经理" title="选择业务员" :modalHeight="480" :readonly="true">
						<!-- <select-user></select-user> -->
					</lookup>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="24">
				<FormItem label="备注">
					<Input type="textarea" v-model="signInfo.remark" placeholder="备注" :maxlength="512" :readonly="true"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="意见类型:" prop="auditStatType">
					<Select v-model="pInfo.auditStatType" @on-change="auditStatTypeChange">
						<Option v-for="(item, index) in auditStatList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="24">
				<FormItem label="审批意见:" prop="remark">
					<Input type="textarea" v-model="pInfo.remark" placeholder="审批意见" :maxlength="512"></Input>
				</FormItem>
			</Col>
		</Row>
	</Form>
</template>
<script>
	import { materialsInfo } from '@/api/materials'
	import { getContractByCaseId, contractInfo } from '@/api/contract'
	import { getAccountList } from '@/api/common'
	import { doAudit } from '@/api/flow'
	import { ymd } from '@/libs/util'
	import loanInvestTree from '@/components/form/loanInvestTree'
	import Dict from '@/components/global/dict'
	import Constant from '@/components/global/constant'
	import lookup from '@/components/form/lookup'

	export default {
		name: 'SignApproval',
		components:{
			lookup,
			loanInvestTree
		},
		props: {
			caseId: {
				type: String,
				required: true
			}
		},
		inject:{
			$modal:{default: null}
		},
		data() {
			return {
				// 进件信息
				caseInfo:{
					userName: '',
					projectName: ''
				},
				// 签约信息
				signInfo: {
					caseId: '',
					customerId: '',
					contractCode: '',
					productType: '',
					busMode: '',
					amount: '',
					rate: '',
					extensionRate: '',
					paybackType: '',
					guaranteeType: '',
					overdueRateFlow: '',
					repeatRateFlow: '',
					rateType: '',
					signDate: '',
					term: '',
					startDate: '',
					endDate: '',
					recycle: '',
					loanInvest: '',
					partner: '',
					graceDay: '',
					notice: '',
					paymentCond: '',
					contractStat: '',
					paymentType: '',
					loanAccount: '',
					loanBank: '',
					loanName: '',
					repaymentAccount: '',
					repaymentBank: '',
					repaymentName: '',
					receiveAccount: '',
					receiveBank: '',
					receiveName: '',
					optrUserId: '',
					managerUserId: '',
					remark: ''
				},
				// 审批信息
				pInfo:{
					dataId: this.caseId,
					remark: '',
					auditStatType: '',
					auditStat: ''
				},
				// 业务员信息
				optrUser: [],
				managerUser: [],
				// 银行账户信息
				accounts: [],
				// 字典&常量
				productType: Dict.NULL,
				busMode: Dict.NULL,
				paybackType: Dict.NULL,
				guaranteeType: Dict.NULL,
				rateType: Dict.NULL,
				contractStat: Dict.NULL,
				paymentType: Dict.NULL,
				yseOrNo: Constant.get("yseOrNo"),

				//校验规则
				ruleValidate: {
					remark: [
						{ required: true, message: '审批意见必填', trigger: 'blur' }
					],
					auditStatType: [
						{ required: true, message: '意见类型必填', trigger: 'blur', type: 'number'}
					]
				}
			}
		},
		computed:{
			signDateMask: {
				get(){
					return this.signInfo.signDate ? new Date(this.signInfo.signDate) : ''
				},
				set(val){
					this.signInfo.signDate = ymd(val)
				}
			},
			startDateMask:{
				get(){
					return this.signInfo.startDate ? new Date(this.signInfo.startDate) : ''
				},
				set(val){
					this.signInfo.startDate = ymd(val)
				}
			},
			endDateMask:{
				get(){
					return this.signInfo.endDate ? new Date(this.signInfo.endDate) : ''
				},
				set(val){
					this.signInfo.endDate = ymd(val)
				}
			},
			optrUserIdMask:{
				get(){
					return this.optrUser
				},
				set(val){
					this.optrUser = val
					this.signInfo.optrUserId = val[0].value
				}
			},
			managerUserIdMask:{
				get(){
					return this.managerUser
				},
				set(val){
					this.managerUser = val
					this.signInfo.managerUserId = val[0].value
				}
			},
			productTypeList: function(){
				return this.productType.val()
			},
			busModeList: function(){
				return this.busMode.val()
			},
			paybackTypeList: function(){
				return this.paybackType.val()
			},
			guaranteeTypeList: function(){
				return this.guaranteeType.val()
			},
			rateTypeList: function(){
				return this.rateType.val()
			},
			contractStatList: function(){
				return this.contractStat.val()
			},
			paymentTypeList: function(){
				return this.paymentType.val()
			},
			yseOrNoList:function(){
				return this.yseOrNo.toList()
			},
			accountList(){
				return this.accounts.map(v => ({id: v.id, text: v.cardNumber}))
			},
			auditStatList(){
				var list = Constant.get("process.auditStatType").toList()

				return list.slice(0, 2)
			}
		},
		methods: {
			fetch(){
	            return getContractByCaseId(this.caseId)
		            .then(res => {
		            	// 合同id
		            	var contract = res.data
		            	this.signInfo.id = contract.contractId
		        	})
		        	.then(res => contractInfo(this.signInfo.id))
		        	.then(res => {
		        		var contract = res.data.map
		        		// 合同信息
		        		Object.keys(this.signInfo).forEach(name => this.signInfo[name] = contract[name])
		        		// 业务员信息
		        		this.managerUser = [{
		        			value: contract.managerUserId,
		        			text: contract.managerUserName
		        		}]
		        		this.optrUser = [{
		        			value: contract.optrUserId,
		        			text: contract.optrUserName
		        		}]
		        	})
	        	 	.then(res => getAccountList(1, 99999, {customerId: this.signInfo.customerId}))
	        	 	// 客户账户信息
	        	 	.then(res => this.accounts = res.data.page.list)
	        	 	.then(res => materialsInfo(this.signInfo.caseId))
	        	 	.then(res => {
	        	 		// 进件信息
	        	 		var cstCase = res.data.cstCase

	        	 		Object.keys(this.caseInfo).forEach(name => cstCase[name] && (this.caseInfo[name] = cstCase[name]))
	        	 		this.caseInfo.userName = res.data.customerName
	        	 	})
			},
			auditStatTypeChange(value){
				if(value == "Pass"){
					this.pInfo.auditStat = 1
				}
				
				if(value == "Reject"){
					this.pInfo.auditStat = 2
				}
			}
		},
		mounted(){
			var $pInfo = this.$refs.pInfo
			
			this.$modal.onBtnClick("confirm", (next, options) => {
			    $pInfo.validate(valid => {
			        if (valid) {
			            doAudit(this.pInfo)
			                .then( res => this.$Message.success('Success!')
			                    , err => options.closeModal = false)
			                .then(res => next())
			        }else{
			            options.closeModal = false
			            next()
			        }
			    })
			})
			
			// 在窗口显示前加载数据
			this.$modal.beforeEnter(next => {
				Promise.all([
					Dict.get([
						"productType", "busMode", "paybackType", "guaranteeType", 
						"rateType", "contractStat", "paymentType"]), 
					this.fetch()
				])
	            .then(args => {
	                var [groups] = args
	                
	                Object.assign(this, groups)
	                next()
	            })
			})
		}
	}
</script>