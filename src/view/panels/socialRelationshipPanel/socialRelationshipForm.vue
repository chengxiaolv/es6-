<template>
	<div class="editform">
		<Form ref="sInfo" :model="sInfo" :rules="ruleValidate" :label-width="120">
			<Row>
				<Col span="12">
					<FormItem label="与客户关系：" prop="relationType">
						<Select v-model="sInfo.relationType">
							<Option v-for="(item, index) in relationTypeList" :value="item.id" :key="index">{{item.text}}</Option>
						</Select>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="姓名:" prop="userName">
						<Input v-model="sInfo.userName" placeholder="用户姓名" :maxlength="64"></Input>
					</FormItem>
				</Col>
			</Row>	
			<Row>
				<Col span="12">
				<FormItem label="证件类型：" prop="credType">
					<Select v-model="sInfo.credType">
						<Option v-for="(item, index) in credTypePersonalList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="12">
				<FormItem label="证件号码：" prop="credCode">
					<Input v-model="sInfo.credCode" placeholder="证件号码" :maxlength="32"></Input>
				</FormItem>
				</Col>
			</Row>
			<Row>	
				<Col span="12">
				<FormItem label="客户性别：" prop="sex">
					<Select v-model="sInfo.sex">
						<Option v-for="(item, index) in sexList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="12">
				<FormItem label="联系电话：" prop="mobile">
					<input-number v-model="sInfo.mobile" placeholder="联系电话" :allowNegative="false" 
     						:allowDecimal="false" :includeThousandsSeparator="false" :maxlength="32">
    					</input-number>
				</FormItem>
				</Col>
			</Row>
			<Row>	
				<Col span="20">
					<FormItem label="工作单位：">
						<Input v-model="sInfo.corpName" placeholder="工作单位" :maxlength="128"></Input>
					</FormItem>
				</Col>
			</Row>	
			<Row>	
				<Col span="20">
					<FormItem label="联系地址：">
						<Input v-model="sInfo.contactAddr" placeholder="联系地址" :maxlength="255"></Input>
					</FormItem>
				</Col>
			</Row>
			<Row>	
				<Col span="20">
					<FormItem label="备注：" prop="remark">
		                <Input v-model="sInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="备注" :maxlength="512"></Input>
		            </FormItem>
				</Col>
			</Row>
		</Form>
	</div>
</template>
<script>
import { getsocialRelationInfo,socialRelationSave,socialRelationUpdate } from '@/api/customer'
import Dict from '@/components/global/dict'
import {tel,createPersonCredNumber} from '@/components/global/validate'

export default {
	name:'SocialRelationshipForm',
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
		var data = {
			sInfo:{
				id:'',
				customerId:'',
				relationType:'',
				userName:'',
				credType:'',
				credCode:'',
				sex:'',
				mobile:'',
				corpName:'',
				contactAddr:'',
				remark:''
			},
			relationTypeList:{},
			credTypePersonalList:{},
			sexList: [{
					id: 0,
					text: '女'
				},
				{
					id: 1,
					text: '男'
				}
			],
			//校验规则
			
		}
		data.ruleValidate = {
			relationType: [
				{ required: true, message: '与客户关系必填'}
			],
			userName: [
				{ required: true, message: '用户名必填' }
			],
			credType: [
				{ required: true, message: '证件类型必填'}
			],
			credCode: [
				{ required: true, message: '证件号码必填'},
				{ validator: createPersonCredNumber(data.sInfo), trigger: 'blur'}
			],
			sex: [
				{ required: true, message: '性别必填'}
			],
			mobile: [
                { validator: tel, trigger: 'blur'}
            ],
		}	
		return data
	},
	methods:{
		fetch(){
            return Promise.resolve()
                .then(res => {
                    if(this.id){
                        return getsocialRelationInfo(this.id).then(res => {
                            Object.keys(this.sInfo).forEach(name => this.sInfo[name] = res.data.cstPersonalSocialRelationship[name])
                        })
                    }else{
                        this.sInfo.customerId = this.customerId
                        delete this.sInfo.id
                    }
                })
        }
	},
    mounted(){
        var $sInfo = this.$refs.sInfo

        this.$modal.onBtnClick("confirm", (next, options) => {
			$sInfo.validate(valid => {
				if (valid) {
					Promise.resolve()
						.then(() => {
							return this.id ? socialRelationUpdate(this.sInfo) : socialRelationSave(this.sInfo)
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
                Dict.get(["relationType", "credTypePersonal"]), 
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