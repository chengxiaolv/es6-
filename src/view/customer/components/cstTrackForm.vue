<template>
	<div class="editform">
		<Form ref="cstTrackInfo" :model="cstTrackInfo" :rules="ruleValidate" :label-width="120" v-show="showForm">
			<Row>
				<Col span="18">
				<FormItem label="跟进类型：" prop="trackType">
					<Select v-model="cstTrackInfo.trackType">
						<Option v-for="(item, index) in trackTypeList" :value="item.id" :key="index">{{item.text}}</Option>
					</Select>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="18">
				<FormItem label="跟进内容：" prop="content">
					<Input v-model="cstTrackInfo.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="200字以内"></Input>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="24" style="text-align: center;">
					<Button style="margin:0 8px" type="primary" @click="savecstTrack">保存</Button>
					<Button style="margin:0 8px" type="primary" @click="showTrackPlanModal = true">跟进计划</Button>
					<Button style="margin:0 8px" @click="showForm=false">取消</Button>
				</Col>
			</Row>
			<Divider/>
		</Form>
		<smart-modal title="新增跟进计划" v-model="showTrackPlanModal" :width="375" :height="575" ref="trackPlan">
            <cst-track-plan-form v-if="showTrackPlanModal==true" :customerId="customerId"></cst-track-plan-form>
        </smart-modal>
		<div>
			<div class="svu-csttracl-list"
				v-if="cstTrackList.length > 0"
				v-for="(item, index) in cstTrackList">
				<Row style="padding:10px;">
					<Col span="4">
						【{{item.trackType}}】
					</Col>
					<Col span="16">
						<div>{{item.createTime|ymdL}}</div>  
						<div>{{item.content}}</div>
					</Col>
				</Row>
			</div>
			<no-data v-else></no-data>
		</div>
	</div>		
</template>
<style lang="scss">
	.svu-csttracl-list {
		border-width: 1px;
		border-style: solid;
		border-color: rgba(233, 234, 236, 1);
		width: 100%;
		min-height: 100px;
		padding-top: 10px;
		margin-top: 10px
	}
</style>
<script>
	import { csttrackShow, csttrackSave } from '@/api/customer'
	import smartModal from '@/components/smartModal'
	import Dict from '@/components/global/dict'
	import cstTrackPlanForm from './cstTrackPlanForm'
	import { createNamespacedHelpers } from 'vuex'

	const { mapActions : mapCstTrackActions } = createNamespacedHelpers('customer/cstTrack')
	
	export default{
		name:'CstTrackForm',
		components: {
			smartModal,
			cstTrackPlanForm
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
				cstTrackInfo:{
					customerId:'',
					trackType:'',
					content:'',
					//trackUserId:'',
					remark:'',
					//corpId:''
				},
				cstTrackList: [],
				trackType: Dict.NULL,
				//校验规则
				ruleValidate: {
					trackType: [
						{ required: true, message: '跟进类型必填' }
					],
					content: [
						{ required: true, message: '跟进内容必填' }
					],
				},
				showForm:false,
				showTrackPlanModal: false
			}
		},
		computed:{
			trackTypeList(){
				return this.trackType.val()
			}
		},
		methods:{
			...mapCstTrackActions([
				"fetchCstTrack"
			]),
			fetch(){
                return csttrackShow(this.customerId).then(res => {
					this.cstTrackList = res.data.TrackList
	        	})
			},
			savecstTrack(){
				var $cstTrackInfo = this.$refs.cstTrackInfo

				$cstTrackInfo.validate(valid => {
					if (valid) {
						csttrackSave(this.cstTrackInfo).then((res)=>{
	                        this.$Message.success('Success!');
	                    }).then(res=>{
	                        this.fetch()
	                        this.fetchCstTrack(this.customerId)
	                    })
					} else {
						this.$Message.error('Fail!');
					}
				})
			}
		},
		created(){
			this.cstTrackInfo.customerId = this.customerId
			Promise.all([
					Dict.get(["trackType"]),
					this.fetch()
				])
	            .then(args => {
	                var [groups] = args
	                
	                Object.assign(this, groups)
	            })
		},
		mounted(){
			var $cstTrackInfo = this.$refs.cstTrackInfo

			this.$modal.onBtnClick("addTrack", (next, options) => {
				this.showForm=true
				options.closeModal = false
				next()
			})
		}
	}
</script>