<template>
	<div class="editform">
		<Form ref="pInfo" :model="pInfo" :rules="ruleValidate" :label-width="120">
			<Row>
				<Col span="24">
					<FormItem label="客户名称:" prop="userName">
						<Input v-model="pInfo.userName" placeholder="客户名称" :maxlength="32"></Input>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="客户类型:" prop="cstType">
						<Select v-model="pInfo.cstType">
							<Option v-for="(item, index) in cstTypeList" :value="item.id" :key="index">{{item.text}}</Option>
						</Select>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="证件号码:" prop="credNumber">
						<Input v-model="pInfo.credNumber" placeholder="证件号码" :maxlength="32"></Input>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="联系电话:" prop="mobile">
						<Input v-model="pInfo.mobile" placeholder="联系电话" :maxlength="16"></Input>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="联系地址:" prop="addr">
						<Input v-model="pInfo.addr" placeholder="联系地址" :maxlength="255"></Input>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="24">
					<FormItem label="备注:" prop="remark">
						<Input type="textarea" v-model="pInfo.remark" :maxlength="512"></Input>
					</FormItem>
				</Col>
			</Row>
		</Form>
	</div>
</template>
<script>
import { partenerSave, partenerUpdate, partenerInfo} from '@/api/common'
import Dict from '@/components/global/dict'

export default {
	name: 'partenerForm',
	props:{
		id:{
			type: String
		},
		materialId:{
			type: String,
			required: true
		},
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
			// 表单数据
			pInfo: {
				id: '',
				caseId: this.materialId,
				customerId: this.customerId,
				userName: '',
				cstType: '',
				credNumber: '',
				mobile: '',
				addr: '',
				remark: ''
			},

			// 校验规则	
			ruleValidate: {
				userName: [
					{ required: true, message: '客户名称必填', trigger: 'blur' }
				],
				cstType: [
					{ required: true, message: '客户类型必填', trigger: 'blur' }
				],
				credNumber: [
					{ required: true, message: '证件号码必填', trigger: 'blur' }
				],
				mobile: [
					{ required: true, message: '联系电话必填', trigger: 'blur' }
				]
			},

			// 字典对象
			cstType: Dict.NULL,
		}
	},
	computed:{
		cstTypeList(){
			return this.cstType.val()
		}
	},
	methods: {
		fetch(){
			return Promise.resolve()
				.then(() => {
					if(this.id){
						// 修改模式取数据
						return partenerInfo(this.id).then(res => {
							Object.keys(this.pInfo).forEach(name =>this.pInfo[name] = res.data.cstPartener[name])
			   	     	})
					}else{
						// 新增模式去掉id
						delete this.pInfo.id
					}
				})
		}
	},
	created(){
		Promise.all([
				Dict.get(["cstType"]),
				this.fetch()
			])
            .then(args => {
                var [groups] = args
                Object.assign(this, groups)
            })
	},
	mounted(){
		var $pInfo = this.$refs.pInfo

		this.$modal.onBtnClick("confirm", (next, options) => {
			$pInfo.validate(valid => {
				if (valid) {
					Promise.resolve()
						.then(() => {
							return this.id ? partenerUpdate(this.pInfo) : partenerSave(this.pInfo)
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
