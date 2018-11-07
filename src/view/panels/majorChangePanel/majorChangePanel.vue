<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
		<div class="svu-detail-panel-title" slot="header">
			<span>企业重大变更</span>
			<Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small" 
				@click.stop="showMajorChange">
				新增
			</Button>
		</div>
		<Table :columns="majorChangeColumns" :data="majorChange.list" class="svu-detail-inner-table" :height='300'></Table>
		<smart-modal title="企业重大信息变更" 
			:value="modals[modalName]"
			@input="toggleModal(modalName)" 
			:height="640"
			@close-by-confirm="fetchMajorChangeList({customerId})">
			<major-change-form v-if="modals[modalName]" :id="curMajorChangeId" :customerId="customerId"></major-change-form>
		</smart-modal>
	</svu-panel>
</template>
<script>
	import { panelable, Panel as svuPanel } from '@/components/container/panel'
	import smartModal from '@/components/smartModal'
	import majorChangeForm from './majorChangeForm'

	import Dict from '@/components/global/dict'
	import Constant from '@/components/global/constant'
	import { mapCell } from '@/components/grid/renderCell'
	import { createNamespacedHelpers } from 'vuex'
	import { majorChangeDelete } from '@/api/customer'
    import {pipeCell} from '@/components/grid/renderCell'
	const { mapState, mapActions, mapMutations } = createNamespacedHelpers('customer/majorChange')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		mixins: [panelable],
		components: {
			svuPanel,
			smartModal,
			majorChangeForm
		},
		props: {
			customerId: {
				type: String,
				required: true
			},
			name: {
				type: String
			}
		},
		data() {
			return {
				// 业务相关
				modalName: 'majorChange',
				changeType: Dict.NULL,
			}
		},
		computed: {
			...mapState({
				majorChange: "majorChange",
				majorChangeLoading: "majorChangeLoading"
			}),
			...mapDetailState({
				modals: "modals",
				curMajorChangeId: "curMajorChangeId"
			}),
			majorChangeColumns() {
				return [
					{ type: 'index', width: 60, align: 'center', title: '序号' },
					{ title: '变更时间', key: 'changeDate' },
					{ 
						title: '变更类型', 
						key: 'changeType',
						render: mapCell(this.changeType.val())
					},
					{ title: '变更前内容', key: 'changeBefore' },
					{ title: '变更后内容', key: 'changeAfter' },
					{ title: '操作', key: 'action', align: 'center', render: this.majorChangeAction }
				]
			}
		},
		methods: {
			...mapActions([
				"fetchMajorChangeList"
			]),
			...mapDetailMutations([
				"toggleModal",
				"showModal",
				"setCurMajorChangeId"
			]),
			majorChangeAction(h, data) {
				var { row, column, index } = data
				return h('div', [
					h('Button', {
						props: {
							type: 'text',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {
								this.setCurMajorChangeId(row.id)
								this.showModal(this.modalName)
							}
						}
					}, '修改'),
					h('Button', {
						props: {
							type: 'text',
							size: 'small'
						},
						on: {
							click: () => {
								majorChangeDelete(row.id).then((res) => {
									this.fetchMajorChangeList({
										customerId: this.customerId
									})
								})
							}
						}
					}, '删除')
				])
			},
			showMajorChange() {
				this.setCurMajorChangeId('')
				this.showModal(this.modalName)
			}
		},

		mounted() {
			Dict.get(["changeType"]).then(dicts => Object.assign(this, dicts))
		}
	}

</script>
