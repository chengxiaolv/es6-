<template>
	<div class="editform">
		<Form ref="relationInfo" :model="relationInfo" :rules="ruleValidate" :label-width="120">
			<FormItem label="主体客户:" prop="userName">
				<Input v-model="userName" :readonly="true"></Input>
			</FormItem>
			<FormItem label="关联客户" prop="relationCustomerId">
				<lookup v-model="relationCustomerIdMask" title="客户查询" :modalHeight="480">
					<select-customer></select-customer>
				</lookup>
			</FormItem>
			<FormItem label="关联关系" prop="socialRelationType">
				<Select v-model="relationInfo.socialRelationType">
					<Option v-for="(item, index) in socialRelationTypeList" :value="item.id" :key="index">{{item.text}}</Option>
				</Select>
			</FormItem>
			<FormItem label="关系描述" prop="remark">
				<Input v-model="relationInfo.remark" type="textarea" placeholder="200字以内"
					:autosize="{minRows: 2,maxRows: 5}" >
				</Input>
			</FormItem>
		</Form>
	</div>		
</template>
<script>
	import { cstRelationSave, getCstRelationInfo} from '@/api/customer'
	import Dict from '@/components/global/dict'
	import lookup from '@/components/form/lookup'
	import selectCustomer from "@/view/modals/customer/selectCustomer"

	export default{	
		name:"cstRelationForm",
		components: {
			lookup,
			selectCustomer
		},
		props: {
			customerId: {
				type: String,
				required: true
			},
			userName: {
				type: String,
				required: true
			}
		},
		inject:{
			$modal:{default: null}
		},
		data() {
			return {
				// 表单对象
				relationInfo:{
					// id: '',
					customerId: this.customerId,
					relationCustomerId:'',
					socialRelationType:'',
					remark:''
				},

				// 字典对象
				socialRelationType: Dict.NULL,

				//校验规则
				ruleValidate: {
					relationCustomerId: [
						{ required: true, message: '关联客户必填' }
					],
					socialRelationType: [
						{ required: true, message: '关联关系必填' }
					]
				},

				// 其它数据对象
				relationCustomerVal: []
			}
		},
		computed:{
			socialRelationTypeList(){
				return this.socialRelationType.val()
			},
			relationCustomerIdMask:{
				get(){
					return this.relationCustomerVal
				},
				set(val){
					this.relationCustomerVal = val
					this.relationInfo.relationCustomerId = val[0].value
				}
			}
		},
		created(){
			Promise.all([Dict.get(["socialRelationType"])])
	            .then(args => {
	                var [groups] = args
	                
	                Object.assign(this, groups)
	            })
		},
		methods:{
			
		},
		mounted(){
			var $relationInfo = this.$refs.relationInfo

			this.$modal.onBtnClick("confirm", (next, options) => {
			    $relationInfo.validate(valid => {
			        if (valid) {
			            cstRelationSave(this.relationInfo)
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