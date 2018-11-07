<template>
	<div class="editform">
		<Form ref="fInfo" :model="fInfo" :rules="ruleValidate" :label-width="120">
			<Row>
				<Col span="24">
					<FormItem label="费用名称:" prop="customerId">
						<Input v-model="fInfo.itemName" placeholder="费用名称" :maxlength="32"></Input>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="收取节点:" prop="reciveNode">
						<Select v-model="fInfo.reciveNode">
							<Option v-for="(item, index) in reciveNodeList" :value="item.id" :key="index">{{item.text}}</Option>
						</Select>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="费用基数:" prop="feeBase">
						<Select v-model="fInfo.feeBase">
							<Option v-for="(item, index) in feeBaseList" :value="item.id" :key="index">{{item.text}}</Option>
						</Select>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="费率类型:" prop="feeRateType">
						<Select v-model="fInfo.feeRateType">
							<Option v-for="(item, index) in feeRateTypeList" :value="item.id" :key="index">{{item.text}}</Option>
						</Select>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="费率值:" prop="feeRate">
						<Input v-model="fInfo.feeRate" placeholder="费率值" :maxlength="16"></Input>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="24">
					<FormItem label="备注:" prop="remark">
						<Input type="textarea" v-model="fInfo.remark" placeholder="费用说明" :maxlength="512"></Input>
					</FormItem>
				</Col>
			</Row>
		</Form>
	</div>
</template>
<script>
import { feeStandardSave, feeStandardUpdate, feeStandardInfo} from '@/api/common'
import Dict from '@/components/global/dict'

export default {
	name: 'feeForm',
	props:{
		id:{
			type: String
		},
		dataId:{
			type: String,
			required: true
		}
	},
	inject:{
	    $modal:{default: null}
	},
	data() {
		return {
			// 表单数据
			fInfo: {
				id: '',
				dataId: this.dataId,
				itemName: '',
				reciveNode: '',
				feeBase: '',
				feeRateType: '',
				feeRate: '',
				remark: ''
			},

			// 校验规则	
			ruleValidate: {
				itemName: [
					{ required: true, message: '费用名称必填', trigger: 'blur' }
				],
				reciveNode: [
					{ required: true, message: '收取节点必填', trigger: 'blur' }
				],
				feeBase: [
					{ required: true, message: '费用基数必填', trigger: 'blur' }
				],
				feeRateType: [
					{ required: true, message: '费率类型必填', trigger: 'blur' }
				],
				feeRate: [
					{ required: true, message: '费率值必填', trigger: 'blur' }
				]
			},

			// 字典对象
			reciveNode: Dict.NULL,
			feeBase: Dict.NULL,
			feeRateType: Dict.NULL
		}
	},
	computed:{
		reciveNodeList(){
			return this.reciveNode.val()
		},
		feeBaseList(){
			return this.feeBase.val()
		},
		feeRateTypeList(){
			return this.feeRateType.val()
		}
	},
	methods: {
		fetch(){
			return Promise.resolve()
				.then(() => {
					if(this.id){
						// 修改模式取数据
						return feeStandardInfo(this.id).then(res => {
							Object.keys(this.fInfo).forEach(name =>this.fInfo[name] = res.data.comFeeStandard[name])
			   	     	})
					}else{
						// 新增模式去掉id
						delete this.fInfo.id
					}
				})
		}
	},
	created(){
		Promise.all([
				Dict.get(["reciveNode", "feeBase","feeRateType"]),
				this.fetch()
			])
            .then(args => {
                var [groups] = args

                Object.assign(this, groups)
            })
	},
	mounted(){
		var $fInfo = this.$refs.fInfo

		this.$modal.onBtnClick("confirm", (next, options) => {
			$fInfo.validate(valid => {
				if (valid) {
					Promise.resolve()
						.then(() => {
							return this.id ? feeStandardUpdate(this.fInfo) : feeStandardSave(this.fInfo)
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
	}
}

</script>
