<template>
	<div class="editform">
		<Form ref="cstTrackPlanInfo" :model="cstTrackPlanInfo" :rules="ruleValidate" :label-width="85">
			<FormItem label="内容：" prop="content">
				<Input v-model="cstTrackPlanInfo.content" type="textarea" :autosize="{minRows: 3, maxRows: 5}" 
					placeholder="请输入日程内容">
				</Input>
			</FormItem>
			<FormItem label="类型：" prop="trackType">
				<Select v-model="cstTrackPlanInfo.trackType">
					<Option v-for="(item, index) in trackTypeList" :value="item.id" :key="index">{{item.text}}</Option>
				</Select>
			</FormItem>
			<FormItem label="开始：" prop="startTime">
				<DatePicker v-model="cstTrackPlanInfo.startTime" type="date" placeholder="开始日期" 
					@on-change='date => this.cstTrackPlanInfo.startTime = date'>
				</DatePicker>
			</FormItem>
			<FormItem label="结束：" prop="endTime">
				<DatePicker v-model="cstTrackPlanInfo.endTime" type="date" placeholder="结束日期" 
					@on-change='date => this.cstTrackPlanInfo.endTime = date'>
				</DatePicker>
			</FormItem>
			<FormItem label="重复周期：" prop="repeatType">
				<Select v-model="cstTrackPlanInfo.repeatType">
					<Option v-for="(item, index) in repeatTypeList" :value="item.id" :key="index">{{item.text}}</Option>
				</Select>
			</FormItem>
			<FormItem label="提醒时间：" prop="noticeTime">
				<Input v-model="cstTrackPlanInfo.noticeTime" placeholder="距离日程开始时间">
					<span slot="append">小时</span>
				</Input>
			</FormItem>
			<FormItem label="共享人：" prop="shareUserId">
				<lookup v-model="shareUserIdMask" placeholder="请选择共享人" title="业务员查询" :modalHeight="480">
					<select-user></select-user>
				</lookup>
			</FormItem>
		</Form>
	</div>		
</template>
<script>
	import {csttrackPlanSave} from '@/api/customer'
	import Dict from '@/components/global/dict'
	import lookup from '@/components/form/lookup'
	import selectUser from '@/view/modals/selectUser'
	
	export default{
		name:'CstTrackForm',
		components: {
			lookup,
			selectUser
		},
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
				// 表单对象
				cstTrackPlanInfo:{
					customerId:'',
					content:'',
					trackType:'',
					startTime:'',
					endTime:'',
					repeatType:'',
					noticeTime: '',
					remark: '',
					shareUserId: ''
				},
				// 校验规则
				ruleValidate: {
					trackType: [
						{ required: true, message: '跟进类型必填' }
					],
					content: [
						{ required: true, message: '日程内容必填' }
					],
					startTime: [
						{ required: true, message: '开始时间必填' }
					],
					endTime: [
						{ required: true, message: '结束时间必填' }
					],
					repeatType: [
						{ required: true, message: '重复周期必填' }
					]
				},
				// 字典对象
				trackType: Dict.NULL,
				repeatType: Dict.NULL,
				// 数据对象
				shareUserVal: []
			}
		},
		computed:{
			shareUserIdMask:{
				get(){
					return this.shareUserVal
				},
				set(val){
					this.shareUserVal = val
					this.cstTrackPlanInfo.shareUserId = val[0].value
				}
			},
			trackTypeList(){
				return this.trackType.val()
			},
			repeatTypeList(){
				return this.repeatType.val()
			}
		},
		methods:{
			onUserSelected(){
				var $cstSelector = this.$refs.cstSelector

				this.cstList = [$cstSelector.value]
				this.mInfo.shareUserId = this.cstList[0].value
			}
		},
		created(){
			this.cstTrackPlanInfo.customerId = this.customerId

			Promise.all([Dict.get(["trackType", "repeatType"])])
	            .then(args => {
	                var [groups] = args
	                
	                Object.keys(groups).forEach(name => this[name] = groups[name])
	            })
		},
		mounted(){
			var $cstTrackPlanInfo = this.$refs.cstTrackPlanInfo

			this.$modal.onBtnClick("confirm", (next, options) => {
			    $cstTrackPlanInfo.validate(valid => {
			        if (valid) {
			            csttrackPlanSave(this.cstTrackPlanInfo)
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