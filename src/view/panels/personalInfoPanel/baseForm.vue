<template>
	<div class="editform">
		<Form ref="pInfo" :model="pInfo" :rules="ruleValidate" :label-width="120">
			<Row>
				<Col span="12">
					<FormItem label="用户姓名:" prop="userName">
						<Input v-model="pInfo.userName" placeholder="用户姓名" :maxlength="32"></Input>
					</FormItem>
				</Col>
				<Col span="12">
				<FormItem label="性别：" prop="sex">
					<Select v-model="pInfo.sex">
						<Option v-for="(item, index) in sexList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
				<FormItem label="证件类型：" prop="credType" >
					<Select v-model="pInfo.credType" label-in-value>
						<Option v-for="(item, index) in credTypePersonalList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="12">
				<FormItem label="证件号码：" prop="credNumber">
					<Input v-model="pInfo.credNumber" placeholder="证件号码" :maxlength="32"></Input>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
				<FormItem label="出生日期：">
					<DatePicker v-model="birthdayMask" type="date" placeholder="出生日期"></DatePicker>
				</FormItem>
				</Col>
				<Col span="12">
				<FormItem label="客户分类：" prop="cstSort">
					<Select v-model="pInfo.cstSort">
						<Option v-for="(item, index) in cstSortList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
				<FormItem label="民族：" prop="nation">
					<Select v-model="pInfo.nation">
						<Option v-for="(item, index) in nationList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="12">
				<FormItem label="婚姻状况：">
					<Select v-model="pInfo.maritalStat">
						<Option v-for="(item, index) in maritalStatList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="24">
				<FormItem label="客户所属区域：">
					<al-selector level="2" v-model="cityIdMask" data-type="all" class="overflow-hidden"/>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="24">
				<FormItem label="户籍地址：" prop="birthAddr">
					<Input v-model="pInfo.birthAddr" placeholder="户籍地址" :maxlength="255"></Input>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="24">
				<FormItem label="现住址：" prop="currAddr">
					<Input v-model="pInfo.currAddr" placeholder="户籍地址" :maxlength="255"></Input>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
				<FormItem label="最高学历：" prop="educationLevel">
					<Select v-model="pInfo.educationLevel">
						<Option v-for="(item, index) in educationLevelList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="12">
				<FormItem label="居住状况：" prop="livingStat">
					<Select v-model="pInfo.livingStat">
						<Option v-for="(item, index) in livingStatList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
				<FormItem label="手机号码：">
   					<input-number v-model="pInfo.mobile" placeholder="手机号码" :allowNegative="false" 
     						:allowDecimal="false" :includeThousandsSeparator="false" :maxlength="11">
    					</input-number>
				</FormItem>
				</Col>
				<Col span="12">
				<FormItem label="QQ号码：">
					<input-number v-model="pInfo.qq" placeholder="QQ号码" :allowNegative="false" 
     						:allowDecimal="false" :includeThousandsSeparator="false" :maxlength="16">
    					</input-number>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="微信：">
						<Input v-model="pInfo.wechat" placeholder="微信号码" :maxlength="128"></Input>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="邮箱：" prop="email">
						<Input v-model="pInfo.email" placeholder="邮箱" :maxlength="128"></Input>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
				<FormItem label="邮政编码：">
					<input-number v-model="pInfo.postcode" placeholder="邮政编码" :allowNegative="false" 
     						:allowDecimal="false" :includeThousandsSeparator="false" :maxlength="16">
    					</input-number>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="24">
				<FormItem label="通讯地址：" prop="contactAddr">
					<Input v-model="pInfo.contactAddr" placeholder="通讯地址" :maxlength="255"></Input>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
				<FormItem label="紧急联系人：" prop="contactPerson">
					<Input v-model="pInfo.contactPerson" placeholder="紧急联系人" :maxlength="32"></Input>
				</FormItem>
				</Col>
				<Col span="12">
				<FormItem label="紧急联系人电话：" prop="contactMobile">
					<input-number v-model="pInfo.contactMobile" placeholder="紧急联系人电话" :allowNegative="false" 
     						:allowDecimal="false" :includeThousandsSeparator="false" :maxlength="32">
    					</input-number>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
				<FormItem label="信息来源：" prop="sourceFrom">
					<Select v-model="pInfo.sourceFrom">
						<Option v-for="(item, index) in sourceFromList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="12">
				<FormItem label="客户经理：">
					<lookup v-model="managerUserMask" placeholder="请选择办理人员" title="选择业务员" :modalHeight="480">
                        <select-user></select-user>
                    </lookup>
				</FormItem>
				</Col>
			</Row>
		</Form>
	</div>
</template>
<script>
	import { getPersonalInfo,personalUpdate } from '@/api/customer'
	import Dict from '@/components/global/dict'
	import {ymd} from '@/libs/util'
	import {tel,createPersonCredNumber,postCode} from '@/components/global/validate'
	import lookup from '@/components/form/lookup'
	import selectUser from '@/view/modals/selectUser'

	export default {
		name: 'baseForm',
		props: {
			customerId: {
				type: String,
				required: true
			}
		},
		components: {
            lookup,
            selectUser
        },
		inject:{
			$modal:{default: null}
		},
		data() {
			var data = {
				pInfo: {
					id:'',
					customerId: '',
					userName:'',
					credType:'',
					credNumber:'',
					birthday:'',
					sex:'',
					cstSort:'',
					nation:'',
					maritalStat:'',
					cityId: '',
					birthAddr:'',
					currAddr:'',
					educationLevel:'',
					livingStat:'',
					mobile:'',
					email: '',
					qq:'',
					wechat:'',
					postcode:'',
					contactAddr:'',
					contactPerson:'',
					contactMobile:'',
					sourceFrom:'',
					managerUserId:''
				},
				credTypeName:'',
				credTypePersonalList: {},
				maritalStatList: {},
				sexList: [{
						id: 0,
						text: '女'
					},
					{
						id: 1,
						text: '男'
					}
				],
				nationList: {},
				educationLevelList: {},
				livingStatList: {},
				sourceFromList: {},
				cstSortList:{},
				managerUser: [],
			}
			data.ruleValidate = {
					userName: [
						{ required: true, message: '用户名必填', trigger: 'blur' }
					],
					credType: [
						{ required: true, message: '证件类型必填', trigger: 'blur' }
					],
					credNumber: [
						{ required: true, message: '证件号码必填', trigger: 'blur' },
						{ validator: createPersonCredNumber(data.pInfo), trigger: 'blur'}
					],
					nation: [
						{ required: true, message: '民族必填', trigger: 'blur' }
					],
					cityId: [
						{ required: true, message: '客户所属区域必填', trigger: 'blur' }
					],
					birthAddr: [
						{ required: true, message: '户籍地址必填', trigger: 'blur' }
					],
					currAddr: [
						{ required: true, message: '现住址必填', trigger: 'blur' }
					],
					educationLevel: [
						{ required: true, message: '最高学历必填', trigger: 'blur' }
					],
					livingStat: [
						{ required: true, message: '户籍地址必填', trigger: 'blur' }
					],
					contactAddr: [
						{ required: true, message: '居住状况必填', trigger: 'blur' }
					],
					contactPerson: [
						{ required: true, message: '通讯地址必填', trigger: 'blur' }
					],
					mobile: [
	                    { required: true, message: '手机号码必填', trigger: 'blur' },
	                    { validator: tel, trigger: 'blur'}
	                ],
					contactMobile: [
						{ required: true, message: '紧急联系人电话必填', trigger: 'blur' }
					],
					sourceFrom: [
						{ required: true, message: '信息来源必填', trigger: 'blur' }
					],
					cstSort: [
						{ required: true, message: '客户分类必填', trigger: 'blur' }
					],
					postcode:[
	                    { validator: postCode, trigger: 'blur' }
	                ],
	                email:[
	                	{ type: "email", message: '邮箱格式不正确', trigger: 'blur' }
	                ]
				}
			return data		
		},
		computed:{
			cityIdMask:{
				get(){
					var temp =  JSON.safeParse(this.pInfo.cityId) || []
					return temp.map(v=>v.code)
				},
				set(v){
					this.pInfo.cityId = JSON.stringify(v) || ''
				}
			},
			birthdayMask:{
				get(){
					return this.pInfo.birthday ? new Date(this.pInfo.birthday):''
				},
				set(val){
					this.pInfo.birthday = ymd(val)	
				}
			},
			managerUserMask:{
                    get(){
                        return this.managerUser
                    },
                    set(val){
                        this.managerUser = val
                        this.pInfo.managerUserId = val[0].value
                    }
            }
		},
		methods: {
			fetch(){
	            return getPersonalInfo(this.customerId).then(res => {
					Object.keys(this.pInfo).forEach(name =>this.pInfo[name] = res.data.cstPersonal[name])
					console.log(res.data.managerUserName)
					this.managerUser.push({text:res.data.managerUserName,value:this.pInfo.managerUserId})
	        	})
			},
		},
		mounted(){
			var $pInfo = this.$refs.pInfo
			
			this.$modal.onBtnClick("confirm", (next, options) => {
			    $pInfo.validate(valid => {
			        if (valid) {
			            personalUpdate(this.pInfo)
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
					Dict.get(["nation", "maritalStat","credTypePersonal","educationLevel","livingStat","sourceFrom","cstSort"]), 
					this.fetch()
				])
	            .then(args => {
	                var [groups] = args
	                Object.keys(groups).forEach(name => this.$data[name+'List'] = groups[name].val())
	                next()
	            })
			})
		}
	}

</script>
