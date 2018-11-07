<template>
	<div class="editform">
		<Form ref="mInfo" :model="aInfo" :rules="ruleValidate" :label-width="120">
			<Row>
				<Col span="12">
				<FormItem label="客户姓名:">
					<div>{{customerName}}</div>
				</FormItem>
				</Col>
				<Col span="12">
				<FormItem label="产品名称:">
					<div>{{productType.val(mInfo.productType)}}</div>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
				<FormItem label="项目名称:" prop="projectName">
					<div>{{projectName}}</div>
				</FormItem>
				</Col>
				<Col span="12">
				<FormItem label="担保方式:">
					<div>{{guaranteeType.val(mInfo.guaranteeType)}}</div>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
				<FormItem label="还款方式:">
					<div>{{paybackType.val(mInfo.paybackType)}}</div>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
				<FormItem label="申请金额:">
					<div>{{mInfo.applyAmount | currency}}元</div>
				</FormItem>
				</Col>
				<Col span="12">
				<FormItem label="复批金额:" prop="allowAmount">
					<input-number v-model="aInfo.allowAmount" placeholder="复批金额" :allowNegative="false" :maxlength="32">
						<span slot="append">元</span>
					</input-number>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
				<FormItem label="申请期限:">
					<div>{{mInfo.applyTerm}} 月</div>
				</FormItem>
				</Col>
				<Col span="12">
				<FormItem label="复批期限:" prop="allowTerm">
					<Input v-model="aInfo.allowTerm" placeholder="复批期限" :maxlength="512">
						<span slot="append">月</span>
					</Input>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
				<FormItem label="申请利率:">
					<div>{{mInfo.applyRate | currency}}%</div>
				</FormItem>
				</Col>
				<Col span="12">
				<FormItem label="复批利率:" prop="allowRate">
					<input-number v-model="aInfo.allowRate" placeholder="复批利率" :allowNegative="false" :maxlength="32">
						<span slot="append">%</span>
					</input-number>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
				<FormItem label="逾期利率上浮:">
					<div>{{mInfo.overdueRateFlow | currency}}%</div>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
				<FormItem label="意见类型:" prop="auditStatType">
					<Select v-model="aInfo.auditStatType" @on-change="auditStatChange">
						<Option v-for="(item, index) in auditStatTypeList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="12" v-if="aInfo.auditStatType == 'SendBack'">
				<FormItem label="上一步骤:">
					<Select v-model="mInfo.backStep" @on-change="setBackStep">
						<Option v-for="(item, index) in historyTaskList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="12" v-if="aInfo.auditStatType == 'Transfer'">
				<FormItem label="转签步骤:">
					<Select v-model="mInfo.transfer" @on-change="setTransfer">
						<Option v-for="(item, index) in transferList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="24">
				<FormItem label="审批意见:" prop="remark">
					<Input type="textarea" v-model="aInfo.remark" placeholder="审批意见" :maxlength="512"></Input>
				</FormItem>
				</Col>
			</Row>
		</Form>
	</div>
</template>
<script>
import { materialsInfo } from '@/api/materials'
import { customerInfo } from '@/api/customer'
import { doAudit, findHisTaskName} from '@/api/flow'
import Constant from '@/components/global/constant'
import Dict from '@/components/global/dict'

export default {
	name: 'RiskControlApproval',
	inject: {
		$modal: { default: null }
	},
	props: {
		id: {
			type: String,
			required: true
		},
		customerId: {
			type: String,
			required: true
		},
		processId: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			// 静态展示数据
			mInfo: {
				id: '',
				customerId: '',
				productType: '',
				applyAmount: '',
				applyTerm: '',
				applyRate: '',
				overdueRate: '',
				overdueRateFlow: '',
				repeatRateFlow: '',
				paybackType: '',
				guaranteeType: '',

				backStep: '',
				transfer: ''
			},
			// 表单数据
			aInfo: {
				dataId: '',
				remark: '',
				auditStat: '',
				auditStatType: '',
				allowAmount: '',
				allowTerm: '',
				allowRate: ''
			},
			// 校验规则
			ruleValidate: {
				allowAmount: [
					{ required: true, message: '批复金额必填', trigger: 'blur' }
				],
				allowTerm: [
					{ required: true, message: '批复期限必填', trigger: 'blur' }
				],
				allowRate: [
					{ required: true, message: '批复利率必填', trigger: 'blur' }
				],
				auditStatType:[
					{ required: true, message: '意见类型必填', trigger: 'blur' }
				],
				remark: [
					{ required: true, message: '审批意见必填', trigger: 'blur' }
				]
			},

			// 客户信息
			cstVal: [],
			// 历史已审核的步骤
			historyTasks: [],

			// 字典对象
			productType: Dict.NULL,
			applyTerm: Dict.NULL,
			paybackType: Dict.NULL,
			guaranteeType: Dict.NULL
		}
	},
	computed: {
		customerIdMask: {
			get() {
				return this.cstVal
			},
			set(val) {
				this.cstVal = val
				this.mInfo.customerId = val[0].value
			}
		},
		productTypeList() {
			return this.productType.val()
		},
		applyTermList() {
			return this.applyTerm.val()
		},
		paybackTypeList() {
			return this.paybackType.val()
		},
		guaranteeTypeList() {
			return this.guaranteeType.val()
		},
		auditStatTypeList(){
			var list = Constant.get("process.auditStatType").toList()
			
			// 非风控主审步骤，去掉转签功能
			if(this.historyTaskList.length != 1){
				list.pop()
			}

			return list
		},
		historyTaskList(){
			var r = []
			
			if(this.historyTasks.indexOf("业务申请") >= 0){
				r.push({
					id: "业务申请",
					text: "业务申请"
				})
			}

			if(this.historyTasks.indexOf("风控主审") >= 0){
				r.push({
					id: "风控主审",
					text: "风控主审"
				})
			}

			return r
		},
		transferList(){
			return [{id: "审贷会", text: "审贷会"}]
		},
		projectName(){
			return this.customerName + "-" + this.productType.val(this.mInfo.productType)
		},
		customerName(){
			return this.cstVal[0] && this.cstVal[0].text
		}
	},
	methods: {
		fetch() {
			return materialsInfo(this.id).then(res => {
				Object.keys(this.mInfo).forEach(name => this.mInfo[name] = res.data.cstCase[name])
				// dataId
				this.aInfo.dataId = this.mInfo.id
				this.aInfo.allowAmount = this.mInfo.applyAmount
				this.aInfo.allowTerm = this.mInfo.applyTerm
				this.aInfo.allowRate = this.mInfo.applyRate
			})
		},
		getCustomerName() {
			return customerInfo(this.customerId).then(res => {
				this.cstVal = [{
					text: res.data.cstCustomer.userName,
					value: this.customerId
				}]
			})
		},
		auditStatChange(value){
			if(value == "Pass"){
				this.aInfo.auditStat = 1
			}

			if(value == "Reject"){
				this.aInfo.auditStat = 2
			}

			if(value == "SendBack"){
				this.setBackStep(this.mInfo.backStep)
			}

			if(value == "Transfer"){
				this.aInfo.auditStat = 3
			}
		},
		setTransfer(id){
			if(id == "审贷会"){
				this.aInfo.auditStat = 3
			}
		},
		setBackStep(id){
			if(id == "业务申请"){
				this.aInfo.auditStat = 4
			}

			if(id == "风控主审"){
				this.aInfo.auditStat = 3
			}
		}
	},
	mounted() {
		var $mInfo = this.$refs.mInfo

		this.$modal.onBtnClick("confirm", (next, options) => {
		    $mInfo.validate(valid => {
		        if (valid) {
		            doAudit(this.aInfo)
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
		this.$modal.beforeEnter((next) => {
			Promise.all([
					Dict.get(["productType", "applyTerm", "paybackType", "guaranteeType"]),
					findHisTaskName(this.processId),
					this.fetch(),
					this.getCustomerName()
				])
				.then(args => {
					var [groups, {data:{taskName: historyTasks}}] = args

					Object.assign(this, groups)
					this.historyTasks = historyTasks || []

					if(this.historyTaskList.length > 0){
						this.mInfo.backStep = this.historyTaskList[0].id
					}

					next()
				})
		})
	}
}

</script>
