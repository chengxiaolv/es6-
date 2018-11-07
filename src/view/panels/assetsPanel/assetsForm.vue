<template>
	<div class="editform">
		<Form ref="aInfo" :model="aInfo" :rules="ruleValidate" :label-width="120">
		<Row>	
			<Col span="24">
				<FormItem label="资产类型：" prop="assetsType">
					<RadioGroup v-model="aInfo.assetsType" @on-change="changeType">
				        <Radio v-for="(item, index) in assetsTypeList" :label="item.id">{{item.text}}</Radio>
				    </RadioGroup>
				</FormItem>
			</Col>
		</Row>	
		<Row>
			<Col span="24">
				<FormItem label="所有权人：" prop="owner">
					<Input v-model="aInfo.owner" placeholder="所有权人" :maxlength="16"></Input>
				</FormItem>
			</Col>
		</Row>	
		<Row>
			<Col span="24">
				<FormItem label="资产名称：" prop="assetsName">
					<Input v-model="aInfo.assetsName" placeholder="资产名称" :maxlength="32"></Input>
				</FormItem>
			</Col>
		</Row>


		<Row v-show="showOtherModal">
			<Col span="24">
				<FormItem label="金额：" prop="currPrice">
					<input-number v-model="aInfo.currPrice" placeholder="金额" :allowNegative="false" :maxlength="16">
	                    <span slot="append">元</span> 
	                </input-number>	
				</FormItem>
			</Col>
		</Row>
		
		<Row v-show="showCarModal">
			<Col span="24">
				<FormItem label="品牌：" prop="brand">
					<Input v-model="aInfo.brand" placeholder="品牌" :maxlength="32"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row v-show="showCarModal">
			<Col span="24">
				<FormItem label="车牌号码：" prop="carNumber">
					<Input v-model="aInfo.carNumber" placeholder="车牌号码" :maxlength="16"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row v-show="showCarModal">
			<Col span="24">
				<FormItem label="使用年限：" prop="useTime">
					<input-number v-model="aInfo.useTime" placeholder="使用年限" :allowNegative="false" 
     						:allowDecimal="false" :includeThousandsSeparator="false" :maxlength="16">
     					<span slot="append">年</span>			
    				</input-number>
				</FormItem>
			</Col>
		</Row>

		<Row v-show="showLandModal">
			<Col span="24">
				<FormItem label="坐落：" prop="addr">
					<Input v-model="aInfo.addr" placeholder="坐落" :maxlength="255"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row v-show="showLandModal">
			<Col span="24">
				<FormItem label="面积：" prop="area">
					<Input v-model="aInfo.area" placeholder="面积" :maxlength="16">
						<span slot="append">m2</span>
					</Input>
				</FormItem>
			</Col>
		</Row>
		<Row v-show="showLandModal">
			<Col span="24">
				<FormItem label="租赁状况：" prop="leaseStat">
					<Input v-model="aInfo.leaseStat" placeholder="租赁状况" :maxlength="32"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row v-show="showLandModal">
			<Col span="24">
				<FormItem label="房产证号：" prop="deedId">
					<Input v-model="aInfo.deedId" placeholder="房产证号" :maxlength="64"></Input>
				</FormItem>
			</Col>
		</Row>
		<Row v-show="showLandModal">
			<Col span="24">
				<FormItem label="土地性质：" prop="landType">
					<Select v-model="aInfo.landType">
						<Option v-for="(item, index) in landTypeList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
			</Col>
		</Row>
		<Row v-show="showCarModal||showLandModal||showEquipModal">
			<Col span="24">
				<FormItem label="购置时间：" prop="buyTime">
					<DatePicker v-model="buyTimeMask" type="date" placeholder=""></DatePicker>
				</FormItem>
			</Col>
		</Row>
		<Row v-show="showCarModal||showLandModal||showEquipModal">
			<Col span="24">
				<FormItem label="购置价格：" prop="buyPrice">
					<input-number v-model="aInfo.buyPrice" placeholder="购置价格" :allowNegative="false" :maxlength="16">
	                    <span slot="append">元</span> 
	                </input-number>	
				</FormItem>
			</Col>
		</Row>
		<Row v-show="showCarModal||showLandModal||showEquipModal">
			<Col span="24">
				<FormItem label="现价：" prop="currPrice">
					<input-number v-model="aInfo.currPrice" placeholder="现价" :allowNegative="false" :maxlength="16">
	                    <span slot="append">元</span> 
	                </input-number>
				</FormItem>
			</Col>
		</Row>

		<Row>	
			<Col span="24">
				<FormItem label="资产描述：" prop="remark">
	                <Input v-model="aInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="资产描述" :maxlength="512"></Input>
	            </FormItem>
			</Col>
		</Row>
		</Form>
	</div>		
</template>
<script>
import { getAssetsInfo,assetsSave,assetsUpdate } from '@/api/customer'
import Dict from '@/components/global/dict'
import {ymd} from '@/libs/util'

export default {
	name:"assetsForm",
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
			aInfo:{
				id:'',
				customerId:'',
				assetsType:'',
				owner:'',
				assetsName:'',
				currPrice:'',
				brand:'',
				carNumber:'',
				useTime:'',
				addr:'',
				area:'',
				leaseStat:'',
				deedId:'',
				landType:'',
				buyTime:'',
				buyPrice:'',
				currPrice:'',
				remark:''
			},
			ruleValidate: {
				assetsType: [
					{ required: true, message: '资产类型必填'},
				],
				owner: [
					{ required: true, message: '所有人必填'},
				],
				assetsName: [
					{ required: true, message: '资产名称必填'},
				],
			},	
			assetsTypeList:{},
			assetsTypeMap:{},
			landTypeList:{},
			showCarModal:false,
			showLandModal:false,
			showEquipModal:false,
			showOtherModal:false,
		}
	},
	computed: {
		buyTimeMask:{
			get(){
				return this.aInfo.buyTime ? new Date(this.aInfo.buyTime):''
			},
			set(val){
				this.aInfo.buyTime = ymd(val)	
			}
		}
	},
	methods:{
		fetch(){
            return Promise.resolve()
                .then(res => {
                    if(this.id){
                        return getAssetsInfo(this.id).then(res => {
                            Object.keys(this.aInfo).forEach(name => this.aInfo[name] = res.data.cstPersonalAssets[name])
                        })
                    }else{
                        this.aInfo.customerId = this.customerId
                        delete this.aInfo.id
                    }
                })
        },
        reset(){
        	this.showCarModal = false
        	this.showLandModal = false
        	this.showEquipModal = false
        	this.showOtherModal = false
        },
        changeType(v){
        	this.reset()
			if(v == this.$data['assetsTypeMap']['车辆']){
				this.showCarModal = true
			}else if(v == this.$data['assetsTypeMap']['房地产']){
				this.showLandModal = true
			}else if(v == this.$data['assetsTypeMap']['设备']){
				this.showEquipModal = true
			}else{
				this.showOtherModal = true
			}
        }
	},
    mounted(){
        var $aInfo = this.$refs.aInfo
        
        this.$modal.onBtnClick("confirm", (next, options) => {
			$aInfo.validate(valid => {
				if (valid) {
					Promise.resolve()
						.then(() => {
							return this.id ? assetsUpdate(this.aInfo) : assetsSave(this.aInfo)
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
                Dict.get(["assetsType","landType"]), 
                this.fetch()
            ])
            .then(args => {
                var [groups] = args
                Object.keys(groups).forEach(name => this.$data[name+'List'] = groups[name].val())
                Object.keys(this.$data['assetsTypeList']).forEach(name => {
                	this.$data['assetsTypeMap'][this.$data['assetsTypeList'][name].text] = this.$data['assetsTypeList'][name].id	
                })	
                
            	if(this.$data['aInfo'].assetsType == ""){
					this.$data['aInfo'].assetsType = this.$data['assetsTypeMap']['车辆']
					this.showCarModal = true
				}else{
					this.changeType(this.$data['aInfo'].assetsType)
				}
                next()
            })
        })
    }
}    
</script>