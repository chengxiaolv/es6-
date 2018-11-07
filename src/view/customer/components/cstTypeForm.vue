<template>
	<div class="editform">
		<Form ref="cstTypeInfo" :model="cstTypeInfo" :rules="ruleValidate" :label-width="120">
			<Row>
				<Col span="20">
					<FormItem label="客户姓名:" prop="userName">
						<Input v-model="cstTypeInfo.userName" placeholder="用户姓名"></Input>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="20">
					<FormItem label="客户分类：" prop="cstSort">
						<Select v-model="cstTypeInfo.cstSort">
							<Option v-for="(item, index) in cstSortList" :value="item.id" :key="index">{{item.text}}</Option>
						</Select>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="20">
					<FormItem label="跟进内容：" prop="cstSortReason">
						<Input v-model="cstTypeInfo.cstSortReason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="200字以内"></Input>
					</FormItem>
				</Col>
			</Row>
		</Form>
	</div>		
</template>
<script>
	import { customerInfo,customerUpdate} from '@/api/customer'
	import Dict from '@/components/global/dict'
	import { createNamespacedHelpers } from 'vuex'

	const { mapActions : mapCusActions } = createNamespacedHelpers('customer/customerInfo')

	export default{
		name:"CstTypeForm",
		props: {
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
				cstTypeInfo:{
					id:'',
					userName:'',
					cstSort:'',
					cstSortReason:''
				},
				cstSortList:{},
				//校验规则
				ruleValidate: {
					userName: [
						{ required: true, message: '客户姓名必填' }
					],
					cstSort: [
						{ required: true, message: '客户分类必填' }
					],
				},
			}
		},
		methods:{
			...mapCusActions([
				"fetchCustomerInfo"
			]),
			fetch(){
                return customerInfo(this.customerId).then(res => {
					Object.keys(this.cstTypeInfo).forEach(name =>this.cstTypeInfo[name] = res.data.cstCustomer[name])
	        	})
			}
		},
		created(){
			
			Promise.all([Dict.get(["cstSort"]),this.fetch()])
            .then(args => {
                var [groups] = args
                this.cstSortList = groups.cstSort.val()
                this.cstTypeInfo.id = this.customerId
            })
		},
		mounted(){
			var $cstTypeInfo = this.$refs.cstTypeInfo

			this.$modal.onBtnClick("confirm", (next, options) => {
			    $cstTypeInfo.validate(valid => {
			        if (valid) {
			            customerUpdate(this.cstTypeInfo)
			                .then( res => this.fetchCustomerInfo(this.customerId))
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