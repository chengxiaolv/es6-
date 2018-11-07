<template>
	<div class="editform">
		<Form ref="cInfo" :model="cInfo" :rules="ruleValidate" :label-width="120">
			<Row>	
				<Col span="24">
					<FormItem label="资产类型：" prop="flowAssetsType">
						<Select v-model="cInfo.flowAssetsType" @on-change="changeType">
							<Option v-for="(item, index) in flowAssetsTypeList" :value="item.id" :key="index">{{item.text}}</Option>
						</Select>	
					</FormItem>
				</Col>
			</Row>
			<!-- <Row v-if="showCashModal">	
				<Col span="24">
					<FormItem label="存款银行：">
						<Input v-model="cInfo.accountNumber" placeholder="银行" :maxlength="128"></Input>
					</FormItem>
				</Col>
			</Row> -->
			<Row v-if="showCashModal">	
				<Col span="24">
					<FormItem label="账户类型：" prop="accountType">
						<Select v-model="cInfo.accountType">
							<Option v-for="(item, index) in cstTypeList" :value="item.id" :key="index">{{item.text}}</Option>
						</Select>
					</FormItem>
				</Col>
			</Row>
			<Row v-if="showCashModal">	
				<Col span="24">
					<FormItem label="账号：" prop="accountNumber">
						<Input v-model="cInfo.accountNumber" placeholder="账号" :maxlength="32"></Input>
					</FormItem>
				</Col>
			</Row>	
			<Row v-if="showCashModal">	
				<Col span="24">
					<FormItem label="余额：" prop="balance">
						<input-number v-model="cInfo.balance" placeholder="余额" :allowNegative="false" :maxlength="32">
		                    <span slot="append">元</span> 
		                </input-number>
					</FormItem>
				</Col>
			</Row>	
			

			<Row v-if="showReviceModal">	
				<Col span="24">
					<FormItem label="应收客户对象：" prop="reviceCustomer">
						<Input v-model="cInfo.reviceCustomer" placeholder="应收客户对象" :maxlength="32"></Input>
					</FormItem>
				</Col>
			</Row>	
			<Row v-if="showReviceModal">	
				<Col span="24">
					<FormItem label="账龄(月)：" prop="longTime">
						<input-number v-model="cInfo.longTime" placeholder="账龄(月)" :allowNegative="false" 
     						:allowDecimal="false" :includeThousandsSeparator="false" :maxlength="16">
     						<span slot="append">月</span>
    					</input-number>
					</FormItem>
				</Col>
			</Row>	
			
			
			<Row v-if="showPayModal">	
				<Col span="24">
					<FormItem label="预付款对象：" prop="borrower">
						<Input v-model="cInfo.borrower" placeholder="预付款对象" :maxlength="32"></Input>
					</FormItem>
				</Col>
			</Row>	
			<Row v-if="showPayModal">	
				<Col span="24">
					<FormItem label="预付款日期：" prop="PayDate">
						<DatePicker v-model="PayDateMask" type="date" placeholder=""></DatePicker>
					</FormItem>
				</Col>
			</Row>	
			
			<Row v-if="showStockModal">	
				<Col span="24">
					<FormItem label="存货分类：" prop="stockType">
						<Input v-model="cInfo.stockType" placeholder="存货分类" :maxlength="32"></Input>
					</FormItem>
				</Col>
			</Row>	
			<Row v-if="showStockModal">	
				<Col span="24">
					<FormItem label="购入价：" prop="buyPrice">
						<input-number v-model="cInfo.buyPrice" placeholder="购入价" :allowNegative="false" :maxlength="16">
		                    <span slot="append">元</span> 
		                </input-number>
					</FormItem>
				</Col>
			</Row>	
			<Row v-if="showStockModal">	
				<Col span="24">
					<FormItem label="现价：" prop="currPrice">
						<input-number v-model="cInfo.currPrice" placeholder="现价" :allowNegative="false" :maxlength="16">
		                    <span slot="append">元</span> 
		                </input-number>
					</FormItem>
				</Col>
			</Row>
					

			<Row v-if="showReviceModal||showPayModal">	
				<Col span="24">
					<FormItem label="金额：" prop="amount">
						<input-number v-model="cInfo.amount" placeholder="金额" :allowNegative="false" :maxlength="16">
		                    <span slot="append">元</span> 
		                </input-number>
					</FormItem>
				</Col>
			</Row>	

			<Row v-if="showReviceModal">	
				<Col span="24">
					<FormItem label="现值：" prop="currPrice">
						<input-number v-model="cInfo.currPrice" placeholder="现值" :allowNegative="false" :maxlength="16">
		                    <span slot="append">元</span> 
		                </input-number>
					</FormItem>
				</Col>
			</Row>	
			<Row v-if="showReviceModal||showPayModal">	
				<Col span="24">
					<FormItem label="备注：" prop="remark">
						<Input v-model="cInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="100字以内" :maxlength="512"></Input>
					</FormItem>	
				</Col>
			</Row>		
		</Form>
	</div>
</template>
<script>
	import { getCurrentAssetsInfo,currentAssetsSave,currentAssetsUpdate } from '@/api/customer'
	import Dict from '@/components/global/dict'
	import {ymd} from '@/libs/util'

	export default {
		name:"currentAssetsForm",
	    props:{
	        id: String,
	        customerId:{
	            type: String,
	            required: true
	        }
	    },
	    inject:{
            $modal:{default: null}
        },
	    data() {
			return {
				cInfo:{
					id:'',
					customerId:'',
					flowAssetsType:'',
					accountType:'',
					accountNumber:'',
					balance:'',
					reviceCustomer:'',
					longTime:'',
					borrower:'',
					PayDate:'',
					stockType:'',
					buyPrice:'',
					currPrice:'',
					amount:'',
					currPrice:'',
					remark:''
				},
				flowAssetsType: Dict.NULL,
				cstType: Dict.NULL,
				ruleValidate: {
					flowAssetsType: [
						{ required: true, message: '资产类型必填'},
					],
				},
				showCashModal:false,
	        	showReviceModal:false,
	        	showPayModal:false,
	        	showStockModal:false,
			}	
		},
		computed: {
			PayDateMask:{
				get(){
					return this.cInfo.PayDate ? new Date(this.cInfo.PayDate):''
				},
				set(val){
					this.cInfo.PayDate = ymd(val)	
				}
			},
			flowAssetsTypeList(){
				return this.flowAssetsType.val()
			},
			cstTypeList(){
				return this.cstType.val()
			},
			flowAssetsTypeMap(){
				var map = {}

				this.flowAssetsTypeList.forEach(t => {
					map[t.text] = t.id
				})

				return map
			}
		},
		methods:{
			fetch(){
	            return Promise.resolve()
	                .then(res => {
	                    if(this.id){
	                        return getCurrentAssetsInfo(this.id).then(res => {
	                            Object.keys(this.cInfo).forEach(name => this.cInfo[name] = res.data.cstPersonalCurrentAssests[name])
	                        })
	                    }else{
	                        this.cInfo.customerId = this.customerId
	                        delete this.cInfo.id
	                    }
	                })
	        },
	        reset(){
	        	this.showCashModal = false
	        	this.showReviceModal = false
	        	this.showPayModal = false
	        	this.showStockModal = false
	        },
	        changeType(v){
	        	this.reset()
				if(v == this.flowAssetsTypeMap['现金及银行存款']){
					this.showCashModal = true
				}else if(v == this.flowAssetsTypeMap['应收帐款']){
					this.showReviceModal = true
				}else if(v == this.flowAssetsTypeMap['预付账款']){
					this.showPayModal = true
				}else if(v == this.flowAssetsTypeMap['存货']){
					this.showStockModal = true
				}
	        }
		},
	    mounted(){
	        var $cInfo = this.$refs.cInfo

	        this.$modal.onBtnClick("confirm", (next, options) => {
				$cInfo.validate(valid => {
					if (valid) {
						Promise.resolve()
							.then(() => {
								return this.id ? currentAssetsUpdate(this.cInfo) : currentAssetsSave(this.cInfo)
							})
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
	                Dict.get(["flowAssetsType","cstType"]), 
	                this.fetch()
	            ])
	            .then(args => {
	                var [groups] = args
	                Object.assign(this, groups)

	            	if(this.$data['cInfo'].flowAssetsType == ""){
						this.$data['cInfo'].flowAssetsType = this.flowAssetsTypeMap['现金及银行存款']
						this.showCashModal = true
					}else{
						this.changeType(this.$data['cInfo'].flowAssetsType)
					}
	                next()
	            })
	        })
	    }
	}		
</script>			