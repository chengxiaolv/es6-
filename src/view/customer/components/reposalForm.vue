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
						<Input v-model="mInfo.applyAmount" placeholder="申请金额"></Input>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="申请期限:" prop="applyTerm">
						<Input v-model="mInfo.applyTerm" placeholder="申请期限">
							<span slot="append">月</span>
						</Input>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="申请利率:" prop="applyRate">
						<Input v-model="mInfo.applyRate" placeholder="申请利率"></Input>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="逾期利率:" prop="overdueRate">
						<Input v-model="mInfo.overdueRate" placeholder="逾期利率"></Input>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="逾期利率上浮:" prop="overdueRateFlow">
						<Input v-model="mInfo.overdueRateFlow" placeholder="逾期利率上浮"></Input>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="复利利率上浮:" prop="repeatRateFlow">
						<Input v-model="mInfo.repeatRateFlow" placeholder="复利利率上浮"></Input>
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
						<Input type="textarea" v-model="mInfo.loanUse" placeholder="贷款用途"></Input>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="24">
					<FormItem label="项目说明:" prop="remark">
						<Input type="textarea" v-model="mInfo.remark" placeholder="项目说明"></Input>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="办理人员:" prop="optrUserId">
						<Input v-model="mInfo.optrUserId" placeholder="办理人员"></Input>
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
import loanInvestJson from "@/assets/loanInvest"

export default {
	name: 'addMaterialForm',
	components:{
		lookup,
		selectCustomer
	},
    inject:{
	    $modal:{default: null}
	},
	data() {
		return {
			// 表单数据
			mInfo: {
				customerId: '',
				applyAmount: '',
				period: '',
				startDate: '',
				endDate: '',
				recyle: '',
				creditLoan: '',
				houseLoan: '',
				remark: ''
			},

			// 校验规则
			ruleValidate: {
				applyAmount: [
					{ required: true, message: '申请金额必填', trigger: 'blur' }
				],
				period: [
					{ required: true, message: '申请期限必填', trigger: 'blur' }
				],
				startDate: [
					{ required: true, message: '申请利率必填', trigger: 'blur' }
				],
				endDate: [
					{ required: true, message: '逾期利率必填', trigger: 'blur' }
				],
				recyle: [
					{ required: true, message: '逾期利率上浮', trigger: 'blur' }
				]
			},

			// 客户信息
			cstVal: [],

			// 字典对象
			busMode: null,
			productType: null,
			applyTerm: null,
			paybackType: null,
			rateType: null,
			guaranteeType: null,

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
		productTypeList(){
			return this.productType && this.productType.val() || []
		},
		busModeList(){
			return this.busMode && this.busMode.val() || []
		},
		applyTermList(){
			return this.applyTerm && this.applyTerm.val() || []
		},
		paybackTypeList(){
			return this.paybackType && this.paybackType.val() || []
		},
		rateTypeList(){
			return this.rateType && this.rateType.val() || []
		},
		guaranteeTypeList(){
			return this.guaranteeType && this.guaranteeType.val() || []
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
		Promise.all([Dict.get(["busMode", "productType","applyTerm", "paybackType", "rateType", "guaranteeType"]), 
				this.fetch()])
            .then(args => {
                var [groups] = args
                Object.keys(groups).forEach(name => this.$data[name] = groups[name])
            })
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
