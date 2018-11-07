<template>
	<div class="editform">
		<Form ref="mInfo" :model="mInfo" :rules="ruleValidate" :label-width="120">
			<Row>
				<Col span="12">
					<FormItem label="客户姓名:" prop="customerId">
						<lookup v-model="customerIdMask" placeholder="客户姓名" title="客户查询" :modalHeight="480">
							<select-customer></select-customer>
						</lookup>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="产品名称:" prop="productType">
						<Select v-model="mInfo.productType">
							<Option v-for="(item, index) in productTypeList" :value="item.id" :key="index">{{item.text}}</Option>
						</Select>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="申请金额:" prop="applyAmount">
						<input-number v-model="mInfo.applyAmount" placeholder="申请金额" :allowNegative="false">
							<span slot="append">元</span>
						</input-number>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="申请期限:" prop="applyTerm">
						<input-number v-model="mInfo.applyTerm" placeholder="申请期限" :allowNegative="false" 
							:allowDecimal="false" :includeThousandsSeparator="false">
							<span slot="append">月</span>
						</input-number>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="申请利率:" prop="applyRate">
						<Input v-model="mInfo.applyRate" placeholder="申请利率" :maxlength="16">
							<span slot="append">%</span>
						</Input>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="逾期利率:" prop="overdueRate">
						<Input v-model="mInfo.overdueRate" placeholder="逾期利率" :maxlength="16">
							<span slot="append">%</span>
						</Input>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="逾期利率上浮:" prop="overdueRateFlow">
						<Input v-model="mInfo.overdueRateFlow" placeholder="逾期利率上浮" :maxlength="16">
							<span slot="append">%</span>
						</Input>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="复利利率上浮:" prop="repeatRateFlow">
						<Input v-model="mInfo.repeatRateFlow" placeholder="复利利率上浮" :maxlength="16">
							<span slot="append">%</span>
						</Input>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="还款方式:" prop="paybackType">
						<Select v-model="mInfo.paybackType">
							<Option v-for="(item, index) in paybackTypeList" :value="item.id" :key="index">{{item.text}}</Option>
						</Select>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="计息方式:" prop="rateType">
						<Select v-model="mInfo.rateType">
							<Option v-for="(item, index) in rateTypeList" :value="item.id" :key="index">{{item.text}}</Option>
						</Select>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="担保方式:" prop="guaranteeType">
						<Select v-model="mInfo.guaranteeType">
							<Option v-for="(item, index) in guaranteeTypeList" :value="item.id" :key="index">{{item.text}}</Option>
						</Select>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="贷款意向:" prop="loanInvest">
						<Select v-model="mInfo.loanInvest">
							<Option v-for="(item, index) in loanInvestList" :value="item.id" :key="index">{{item.text}}</Option>
						</Select>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="24">
					<FormItem label="贷款用途:" prop="loanUse">
						<Input type="textarea" v-model="mInfo.loanUse" placeholder="贷款用途" :maxlength="64"></Input>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="24">
					<FormItem label="项目说明:" prop="remark">
						<Input type="textarea" v-model="mInfo.remark" placeholder="项目说明" :maxlength="512"></Input>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="办理人员	：" prop="optrUserId">
						<lookup v-model="optrUserIdMask" placeholder="办理人员" title="选择业务员" :modalHeight="480">
							<select-user></select-user>
						</lookup>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="登记时间:" prop="regDate">
						<DatePicker v-model="mInfo.regDate" type="date" placeholder="登记时间" @on-change="onRegDateChg"></DatePicker>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="业务模式:" prop="busMode">
						<Select v-model="mInfo.busMode" placement="top">
							<Option v-for="(item, index) in busModeList" :value="item.id" :key="index">{{item.text}}</Option>
						</Select>
					</FormItem>
				</Col>
			</Row>
		</Form>
	</div>
</template>
<script>
import { materialsSave } from '@/api/materials'
import Dict from '@/components/global/dict'
import lookup from '@/components/form/lookup'
import selectCustomer from "@/view/modals/customer/selectCustomer"
import selectUser from "@/view/modals/selectUser"
import loanInvestJson from "@/assets/loanInvest"

export default {
	name: 'addMaterialForm',
	components:{
		lookup,
		selectCustomer,
		selectUser
	},
	inject:{
	    $modal:{default: null}
	},
	data() {
		return {
			// 表单数据
			mInfo: {
				customerId: '',
				busMode: '',
				productType: '',
				applyAmount: '',
				applyTerm: '',
				applyRate: '',
				overdueRate: '',
				overdueRateFlow: '',
				repeatRateFlow: '',
				paybackType: '',
				rateType: '',
				guaranteeType: '',
				loanInvest: '',
				loanUse: '',
				remark: '',
				optrUserId: '',
				regDate: ''
			},

			// 校验规则
			ruleValidate: {
				customerId: [
					{ required: true, message: '客户姓名必填', trigger: 'blur' }
				],
				busMode: [
					{ required: true, message: '业务模式必填', trigger: 'blur' }
				],
				productType: [
					{ required: true, message: '产品名称必填', trigger: 'blur' }
				],
				applyAmount: [
					{ required: true, message: '申请金额必填', trigger: 'blur' }
				],
				applyTerm: [
					{ required: true, message: '申请期限必填', trigger: 'blur' }
				],
				applyRate: [
					{ required: true, message: '申请利率必填', trigger: 'blur' }
				],
				overdueRate: [
					{ required: true, message: '逾期利率必填', trigger: 'blur' }
				],
				overdueRateFlow: [
					{ required: true, message: '逾期利率上浮', trigger: 'blur' }
				],
				repeatRateFlow: [
					{ required: true, message: '复利利率上浮', trigger: 'blur' }
				],
				paybackType: [
					{ required: true, message: '还款方式必填', trigger: 'blur' }
				],
				rateType: [
					{ required: true, message: '计息方式必填', trigger: 'blur' }
				],
				guaranteeType: [
					{ required: true, message: '担保方式必填', trigger: 'blur' }
				],
				loanInvest: [
					{ required: true, message: '贷款投向必填', trigger: 'blur' }
				],
				loanUse: [
					{ required: true, message: '贷款用途必填', trigger: 'blur' }
				],
				remark: [
					{ required: true, message: '项目说明必填', trigger: 'blur' }
				],
				optrUserId: [
					{ required: true, message: '办理人员必填', trigger: 'blur' }
				],
				regDate:[
					{ required: true, message: '登记日期必填', trigger: 'blur' }
				]
			},

			// 客户信息
			cstVal: [],
			// 办理人员
			optrUser: [],

			// 字典对象
			busMode: Dict.NULL,
			productType: Dict.NULL,
			applyTerm: Dict.NULL,
			paybackType: Dict.NULL,
			rateType: Dict.NULL,
			guaranteeType: Dict.NULL,

			// 数据分类
			loanInvestJson: loanInvestJson
		}
	},
	computed:{
		customerIdMask:{
			get(){
				return this.cstVal
			},
			set(val){
				this.cstVal = val
				this.mInfo.customerId = val[0].value
			}
		},
		optrUserIdMask:{
			get(){
				return this.optrUser
			},
			set(val){
				this.optrUser = val
				this.mInfo.optrUserId = val[0].value
			}
		},
		productTypeList(){
			return this.productType.val()
		},
		busModeList(){
			return this.busMode.val()
		},
		applyTermList(){
			return this.applyTerm.val()
		},
		paybackTypeList(){
			return this.paybackType.val()
		},
		rateTypeList(){
			return this.rateType.val()
		},
		guaranteeTypeList(){
			return this.guaranteeType.val()
		},
		loanInvestList(){
			return this.loanInvestJson.loanUse.filter(v => v.pId == "0")
				.map(v => ({
					id: v.id,
					text: v.name
				}))
		}
	},
	methods: {
		fetch(){
			
		},
        onRegDateChg(val){
        	this.mInfo.regDate = val
        }
	},
	created(){
		Promise.all([
				Dict.get(["busMode", "productType","applyTerm", "paybackType", "rateType", "guaranteeType"]), 
				this.fetch()])
            .then(args => {
                var [groups] = args

                Object.assign(this, groups)
            })
            
        this.mInfo.optrUserId = this.$store.state.user.userId
        this.optrUser = [{
        	value: this.mInfo.optrUserId,
        	text: this.$store.state.user.userName
        }]
	},
	mounted(){
		var $mInfo = this.$refs.mInfo
		
		this.$modal.onBtnClick("confirm", (next, options) => {
		    $mInfo.validate(valid => {
		        if (valid) {
		            materialsSave(this.mInfo)
		                .then( res => this.$Message.success('Success!')
		                    , err => options.closeModal = false)
		                .then(res => next())
		        }else{
		            options.closeModal = false
		            next()
		        }
		    })
		})
	}
}

</script>
