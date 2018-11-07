<template>
	<div class="svu-approval-bar">
		<div class="svu-approval-step" v-for="(item, index) in steps" :key="index"
			:class="{active: index < nextIndex}">
			{{item}}
			<div class="svu-approval-arrow"></div>
		</div>
		<div class="approval-msg" v-if="approval.stage != '3'">
            <span>
        		{{ isAnchor ? '点击进入' : '下一步'}}
            	<span :class="{'approval-name':isAnchor}" 
            		@click="approvalHandle">【{{nextTask}}】
            	</span>
            	{{ isAnchor ? '环节，' : ''}}
            </span>
            处理人：{{approval.userName}}
        </div>
        <div v-else class="approval-msg">
    		<span v-if="approval.action == '1'">申请成功</span>
    		<span v-if="approval.action == '2'">申请已被否决，业务结束</span>
    	</div>
	</div>
</template>
<style lang="scss">
	$arrow-width: 14px;
	$arrow-height: 50px;
	
	.svu-approval-bar{
		position: relative;
	
		.svu-approval-step{
			position: relative;
			display: inline-block;
			width: 80px;
			height: $arrow-height;
			line-height: $arrow-height;
			margin-right: $arrow-width + 12;
			text-align: center;
			color: black;
			background-color: $c-gray-bg;
		}
		.svu-approval-step.active{
			background-color: $c-primary;
			color: white;
		}
		.svu-approval-arrow{
			position: absolute;
			top: 0;
			right: -$arrow-width;
			display: inline-block;
			width: 0;
			height: 0;
			border-left: $arrow-width solid;
			border-top: $arrow-height / 2 solid transparent;
			border-bottom: $arrow-height / 2 solid transparent;
			border-left-color: $c-gray-bg;
		}
		.active .svu-approval-arrow{
			border-left-color: $c-primary;
		}
		.approval-name{
			cursor: pointer;
		}
	}
</style>
<script>
	import { createNamespacedHelpers } from 'vuex'

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('approvalProgress')
	const { mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		computed:{
			...mapState([
				"approval"
			]),
			...mapGetters([
				'canApproval'
			]),
			steps(){
				return ["业务申请", "风控审批", "合同签约", "合同审批", "放款执行", "放款确认"]
			},
			isContractExist(){
				return this.approval.isContractExist
			},
			nextTask(){
				var task = this.approval.nextTask

				if(!task){
					return "null"
				}
				
				// 后台步骤： 进件申请 进件初审 审贷会 进件复审 合同签约 合同审批 放款确认
				if(task == "进件初审" || task == "审贷会" || task == "进件复审"){
					// 这3个流程节点合并为风控审批
					return "风控审批"
				}

				return task
			},
			nextIndex(){
				return this.steps.indexOf(this.nextTask)
			},
			isAnchor(){
				return this.canApproval
			}
		},
		methods:{
			...mapDetailMutations([
                "showModal"
            ]),
			approvalHandle(){
				var nextTask = this.nextTask

				if(nextTask == "风控审批"){
                    this.showModal('riskControl')
                }
                if(nextTask == "合同签约"){
                    this.showModal('sign')
                }
                if(nextTask == "合同审批"){
                    this.showModal('signApproval')
                }
			}
		}
	}
</script>