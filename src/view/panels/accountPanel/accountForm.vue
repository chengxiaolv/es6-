<template>
	<div class="editform">
		<Form ref="aInfo" :model="aInfo" :rules="ruleValidate" :label-width="120">
			<Row>	
				<Col span="20">
					<FormItem label="账户名称：" prop="accountName">
						<Input v-model="aInfo.accountName" placeholder="账户名称" :maxlength="32"></Input>
					</FormItem>
				</Col>
				<Col span="20">
					<FormItem label="账户用途：">
						<Select v-model="aInfo.accountUse">
							<Option v-for="(item, index) in accountUseList" :value="item.id" :key="index">{{item.text}}</Option>
						</Select>
					</FormItem>
				</Col>
				<Col span="20">
					<FormItem label="卡号/折号：" prop="cardNumber">
						<input-number v-model="aInfo.cardNumber" placeholder="卡号/折号" :allowNegative="false" 
     						:allowDecimal="false" :includeThousandsSeparator="false" :maxlength="32">
    					</input-number>
					</FormItem>
				</Col> 	
				<Col span="20">
					<FormItem label="开户行号：" prop="cardId">
						<input-number v-model="aInfo.cardId" placeholder="开户行号" :allowNegative="false" 
     						:allowDecimal="false" :includeThousandsSeparator="false" :maxlength="32">
    					</input-number>
					</FormItem>
				</Col> 	
				<Col span="20">
					<FormItem label="开户行：" prop="cardType">
						<Input v-model="aInfo.cardType" placeholder="开户行" :maxlength="32"></Input>
					</FormItem>
				</Col> 	
				<Col span="20">
					<FormItem label="单笔扣款限额：" prop="limitAmount">
						<input-number v-model="aInfo.limitAmount" placeholder="单笔扣款限额" :allowNegative="false" :maxlength="32">
		                    <span slot="append">元</span> 
		                </input-number>
					</FormItem>
				</Col> 
				<Col span="20">
					<FormItem label="启用状态：" prop="enableStat">
						<RadioGroup v-model="aInfo.enableStat">
					        <Radio label="1">启用</Radio>
					        <Radio label="0">禁用</Radio>
					    </RadioGroup>
					</FormItem>
				</Col> 
			</Row>	
			<Row>	
				<Col span="20">
					<FormItem label="备注：" prop="remark">
		                <Input v-model="aInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="备注" :maxlength="255"></Input>
		            </FormItem>
				</Col>
			</Row>
		</Form>
	</div>	
</template>
<script>
import { getAccountInfo,accountSave,accountUpdate } from '@/api/common'
import {bankNumber} from '@/components/global/validate'
import Dict from '@/components/global/dict'

export default {
	name:'AccountForm',
	props: {
		id: String,
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
			aInfo:{
				id:'',
				customerId:'',
				accountName:'',
				accountUse:'',
				cardNumber:'',
				cardId:'',
				cardType:'',
				limitAmount:'',
				enableStat:'',
				remark:''	
			},
			accountUseList:{},
			//校验规则
			ruleValidate: {
				accountName: [
					{ required: true, message: '账户名称必填'}
				],
				cardNumber: [
					{ required: true, message: '卡号/折号必填' },
					{ validator:bankNumber,trigger:'blur'}
				],
				cardId: [
					{ required: true, message: '开户行号必填'}
				],

			}
		}
	},
	methods:{
		fetch(){
            return Promise.resolve()
                .then(res => {
                    if(this.id){
                        return getAccountInfo(this.id).then(res => {
                            Object.keys(this.aInfo).forEach(name => this.aInfo[name] = res.data.cstAccount[name])
                        })
                    }else{
                        this.aInfo.customerId = this.customerId
                        delete this.aInfo.id
                    }
                })
        }
	},
    mounted(){
        var $aInfo = this.$refs.aInfo

        this.$modal.onBtnClick("confirm", (next, options) => {
			$aInfo.validate(valid => {
				if (valid) {
					Promise.resolve()
						.then(() => {
							return this.id ? accountUpdate(this.aInfo) : accountSave(this.aInfo)
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
                Dict.get("accountUse"), 
                this.fetch()
            ])
            .then(args => {
                var [groups] = args
                this.accountUseList = groups.val()
                next()
            })
        })
    }
}

</script>			