<template>
	<Form ref="pInfo" :model="pInfo" :rules="ruleValidate" :label-width="120">
		<Row>
			<Col span="12">
				<FormItem label="合同编号:" prop="contractCode">
					<Input v-model="pInfo.contractCode" placeholder="合同编号" :maxlength="32" :readonly="true"></Input>
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
					<Select v-model="pInfo.productType" :readonly="true">
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
				<FormItem label="合同金额:" prop="amount">
					<input-number v-model="pInfo.amount" placeholder="合同金额" :allowNegative="false"></input-number>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="业务模式:" prop="busMode">
					<Select v-model="pInfo.busMode" placement="top">
						<Option v-for="(item, index) in busModeList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="合同签订日期:" prop="signDate">
					<DatePicker v-model="signDateMask" type="date" placeholder="合同签订日期"></DatePicker>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="合同开始日期:" prop="startDate">
					<DatePicker v-model="startDateMask" type="date" placeholder="合同开始日期"></DatePicker>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="合同结束日期:" prop="endDate">
					<DatePicker v-model="endDateMask" type="date" placeholder="合同结束日期"></DatePicker>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="期限:" prop="term">
					<input-number v-model="pInfo.term" placeholder="期限" :allowNegative="false" 
						:allowDecimal="false" :includeThousandsSeparator="false">
						<span slot="append">月</span>
					</input-number>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="展期利率:" prop="extensionRate">
					<input-number v-model="pInfo.extensionRate" placeholder="展期利率" :allowNegative="false">
						<span slot="append">%</span>
					</input-number>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="利率:" prop="rate">
					<input-number v-model="pInfo.rate" placeholder="利率" :allowNegative="false">
						<span slot="append">%</span>
					</input-number>
				</FormItem>
			</Col>
			<Col span="12">
                <FormItem label="贷款投向">
                    <loan-invest-tree v-model="pInfo.loanInvest"></loan-invest-tree>
                </FormItem>
            </Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="逾期利率上浮:" prop="overdueRateFlow">
					<input-number v-model="pInfo.overdueRateFlow" placeholder="逾期利率上浮" :allowNegative="false">
						<span slot="append">%</span>
					</input-number>
				</FormItem>
			</Col>
			<Col span="12">
                <FormItem label="复利利率上浮:" prop="repeatRateFlow">
					<input-number v-model="pInfo.repeatRateFlow" placeholder="复利利率上浮" :allowNegative="false">
						<span slot="append">%</span>
					</input-number>
				</FormItem>
            </Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="还款方式:" prop="paybackType">
					<Select v-model="pInfo.paybackType">
						<Option v-for="(item, index) in paybackTypeList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="计息方式:" prop="rateType">
					<Select v-model="pInfo.rateType" :readonly="true">
						<Option v-for="(item, index) in rateTypeList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="担保方式:" prop="guaranteeType">
					<Select v-model="pInfo.guaranteeType">
						<Option v-for="(item, index) in guaranteeTypeList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="支付方式:" prop="paymentType">
					<Select v-model="pInfo.paymentType">
						<Option v-for="(item, index) in paymentTypeList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="24">
				<FormItem label="付款条件:" prop="paymentCond">
					<Input v-model="pInfo.paymentCond" placeholder="付款条件" :maxlength="32"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="借款账号:" prop="loanAccount">
					<Select v-model="pInfo.loanAccount"  @on-change="loanAccountChange" :clearable="true">
						<Option v-for="(item, index) in accountList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="借款帐号名称:" prop="loanName">
					<Input v-model="pInfo.loanName" placeholder="付款条件" :readonly="true"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="借款账号开户行:" prop="loanBank">
					<Input v-model="pInfo.loanBank" placeholder="借款账号开户行" :readonly="true"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="还款账号:" prop="repaymentAccount">
					<Select v-model="pInfo.repaymentAccount" @on-change="repaymentAccountChange" :clearable="true">
						<Option v-for="(item, index) in accountList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="还款帐号名称:" prop="repaymentName">
					<Input v-model="pInfo.repaymentName" placeholder="还款帐号名称" :readonly="true"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="还款账号开户行:" prop="repaymentBank">
					<Input v-model="pInfo.repaymentBank" placeholder="还款账号开户行" :readonly="true"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="收款账号:" prop="receiveAccount">
					<Select v-model="pInfo.receiveAccount" @on-change="receiveAccountChange" :clearable="true">
						<Option v-for="(item, index) in accountList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="收款账号名称:" prop="receiveName">
					<Input v-model="pInfo.receiveName" placeholder="收款账号名称" :readonly="true"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="收款账号开户行:" prop="receiveBank">
					<Input v-model="pInfo.receiveBank" placeholder="收款账号开户行" :readonly="true"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="额度是否可循环:" prop="recycle">
					<Select v-model="pInfo.recycle">
						<Option v-for="(item, index) in yseOrNoList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="是否通知买方:" prop="notice">
					<Select v-model="pInfo.notice">
						<Option v-for="(item, index) in yseOrNoList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="宽限天数:" prop="graceDay">
					<input-number v-model="pInfo.graceDay" placeholder="宽限天数" :allowNegative="false" 
						:allowDecimal="false" :includeThousandsSeparator="false">
						<span slot="append">天</span>
					</input-number>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
				<FormItem label="办理人员	：" prop="optrUserId">
					<lookup v-model="optrUserIdMask" placeholder="请选择办理人员" title="选择业务员" :modalHeight="480">
						<select-user></select-user>
					</lookup>
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="客户经理：" prop="managerUserId">
					<lookup v-model="managerUserIdMask" placeholder="请选择客户经理" title="选择业务员" :modalHeight="480">
						<select-user></select-user>
					</lookup>
				</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="24">
				<FormItem label="备注" prop="remark">
					<Input type="textarea" v-model="pInfo.remark" placeholder="备注" :maxlength="512"></Input>
				</FormItem>
			</Col>
		</Row>
	</Form>
</template>
<script>
	import { materialsInfo } from '@/api/materials'
	import { contractUpdate, getContractByCaseId } from '@/api/contract'
	import { getAccountList } from '@/api/common'
	import { ymd } from '@/libs/util'
	import loanInvestTree from '@/components/form/loanInvestTree'
	import Dict from '@/components/global/dict'
	import Constant from '@/components/global/constant'
	import lookup from '@/components/form/lookup'
	import selectUser from '@/view/modals/selectUser'

	export default {
		name: 'signForm',
		components:{
			lookup,
			selectUser,
			loanInvestTree
		},
		props: {
			caseId: {
				type: String,
				required: true
			},
			customerId: {
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
				pInfo: {
					id: '',
					caseId: this.caseId,
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
					contractCode: [
						{ required: true, message: '合同编号必填', trigger: 'blur' }
					],
					amount: [
						{ required: true, message: '合同金额必填', trigger: 'blur' }
					],
					rate: [
						{ required: true, message: '利率必填', trigger: 'blur' }
					],
					signDate: [
						{ required: true, message: '合同签订日期必填', trigger: 'blur' }
					],
					startDate: [
						{ required: true, message: '合同开始日期必填', trigger: 'blur' }
					],
					endDate: [
						{ required: true, message: '合同结束日期必填', trigger: 'blur' }
					],
					recycle: [
						{ required: true, message: '额度是否可循环必填', trigger: 'change', type: "number" }
					],
					loanAccount: [
						{ required: true, message: '借款账号必填', trigger: 'change' }
					],
					repaymentAccount: [
						{ required: true, message: '还款账号必填', trigger: 'change' }
					]
				}
			}
		},
		computed:{
			signDateMask: {
				get(){
					return this.pInfo.signDate ? new Date(this.pInfo.signDate) : ''
				},
				set(val){
					this.pInfo.signDate = ymd(val)
				}
			},
			startDateMask:{
				get(){
					return this.pInfo.startDate ? new Date(this.pInfo.startDate) : ''
				},
				set(val){
					this.pInfo.startDate = ymd(val)
				}
			},
			endDateMask:{
				get(){
					return this.pInfo.endDate ? new Date(this.pInfo.endDate) : ''
				},
				set(val){
					this.pInfo.endDate = ymd(val)
				}
			},
			optrUserIdMask:{
				get(){
					return this.optrUser
				},
				set(val){
					this.optrUser = val
					this.pInfo.optrUserId = val[0].value
				}
			},
			managerUserIdMask:{
				get(){
					return this.managerUser
				},
				set(val){
					this.managerUser = val
					this.pInfo.managerUserId = val[0].value
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
			}
		},
		methods: {
			fetch(){
	            return Promise.all([
	            		materialsInfo(this.caseId),
	            		getContractByCaseId(this.caseId)
	            	])
	            	.then(args => {
	            		var cstCase = args[0].data.cstCase

						Object.keys(this.pInfo).forEach(name => cstCase[name] && (this.pInfo[name] = cstCase[name]))
						this.caseInfo.userName = args[0].data.customerName
						this.caseInfo.projectName = cstCase.projectName

						var cnt = args[1].data
		        		Object.keys(this.pInfo).forEach(name => this.pInfo[name] = cnt[name])
		        		this.pInfo.id = cnt.contractId
	            	})
			},
			loanAccountChange(val){
				var account = this.accounts.find(v => v.id == val)

				if(account){
					Object.assign(this.pInfo, {
						loanName: account.accountName,
						loanBank: account.cardType
					})
				}
			},
			repaymentAccountChange(val){
				var account = this.accounts.find(v => v.id == val)

				if(account){
					Object.assign(this.pInfo, {
						repaymentName: account.accountName,
						repaymentBank: account.cardType
					})
				}
			},
			receiveAccountChange(val){
				var account = this.accounts.find(v => v.id == val)

				if(account){
					Object.assign(this.pInfo, {
						receiveName: account.accountName,
						receiveBank: account.cardType
					})
				}
			}
		},
		mounted(){
			var $pInfo = this.$refs.pInfo

			this.$modal.onBtnClick("confirm", (next, options) => {
				$pInfo.validate(valid => {
					if(valid == false){
						options.closeModal = false

						return next()
					}

					contractUpdate(this.pInfo)
						.then( res => this.$Message.success('Success!')
							, err => options.closeModal = false)
	                    .then( () => next() )
				})
			})
			
			// 在窗口显示前加载数据
			this.$modal.beforeEnter((next) => {
				Promise.all([
					Dict.get([
						"productType", "busMode", "paybackType", "guaranteeType", 
						"rateType", "contractStat", "paymentType"]), 
					getAccountList(1, 99999, {customerId: this.customerId}),
					this.fetch()
				])
	            .then(args => {
	                var [
	                	groups, 
	                	{data:{page:{list: accounts}}}
            		] = args
	                
	                Object.assign(this, groups)
	                this.accounts = accounts
	                next()
	            })
			})
		}
	}
</script>