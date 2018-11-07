<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
        <div class="svu-detail-panel-title" slot="header">
            <span>审批记录</span>
        </div>
        <Table :columns="approvalColumns" :data="approval.list" :loading="approvalLoading" class="svu-detail-inner-table"></Table>
    </svu-panel>
</template>
<script>
	import {panelable, Panel as svuPanel} from '@/components/container/panel'
	
	import Dict from '@/components/global/dict'
	import Constant from '@/components/global/constant'
	import { mapCell, pipeCell } from '@/components/grid/renderCell'
	import { createNamespacedHelpers } from 'vuex'

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('credit/approval')

	export default{
		mixins:[panelable],
		components:{
			svuPanel
		},
		props:{
			name:{
				type: String
			}
		},
		data(){
			return {
				// 业务相关
				showApprovalModal: false,
				curApprovalId: '',
				processAction: Constant.get("process.action"),
			}
		},
		computed:{
			...mapState({
				approval: "approval",
				approvalLoading: "approvalLoading"
			}),
			approvalColumns(){
                return [
                    { type: 'index', width: 60, align: 'center', title: '序号' },
                    { title: '环节', key: 'taskName' },
                    { title: '提交/审批人', key: 'createUserName'},
                    { title: '提交/审批结果', key: 'action', render: mapCell(this.processAction.toList()) },
                    { title: '提交/审批时间', key: 'createTime', render: pipeCell("ymd")},
                    { title: '提交/审批意见', key: 'remark'}
                ]
			}
		},
		methods:{
			...mapActions([
				"fetchApproval"
			])
		}
	}
</script>