<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
		<div class="svu-detail-panel-title" slot="header">
			<span>对外担保情况</span>
			<Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small" 
				@click.stop="showGuarantee">
				新增
			</Button>
		</div>
		<Table class="svu-detail-inner-table" 
			:loading="guaranteeLoading" :columns="guaranteeColumns" :data="guarantee.list" :height='300'></Table>
		<smart-modal title="对外担保情况" 
			:value="modals[modalName]" 
			@input="toggleModal(modalName)"
			@close-by-confirm="fetchGuaranteeList({customerId})" :height="640">
			<guarantee-form v-if="modals[modalName]" :id="curGuaranteeId" :customerId="customerId"></guarantee-form>
		</smart-modal>
	</svu-panel>
</template>
<script>
	import { panelable, Panel as svuPanel } from '@/components/container/panel'
	import smartModal from '@/components/smartModal'
	import guaranteeForm from './guaranteeForm'

	import Dict from '@/components/global/dict'
	import Constant from '@/components/global/constant'
	import { mapCell } from '@/components/grid/renderCell'
	import { createNamespacedHelpers } from 'vuex'
	import { guaranteeDelete } from '@/api/customer'
    import {pipeCell} from '@/components/grid/renderCell'
	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/guarantee')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		mixins: [panelable],
		components: {
			svuPanel,
			smartModal,
			guaranteeForm
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
				modalName: 'guarantee',
				relationType: Dict.NULL
			}
		},
		computed: {
			...mapState({
				guarantee: "guarantee",
				guaranteeLoading: "guaranteeLoading"
			}),
			...mapDetailState({
				modals: "modals",
				curGuaranteeId: "curGuaranteeId"
			}),
			guaranteeColumns() {
				return [
					{ type: 'index', width: 60, align: 'center', title: '序号' },
					{ title: '被担保人', key: 'insuredPerson' },
					{ 
						title: '担保余额(元)',
						key: 'balance',
                        render: pipeCell("currency")
					 },
					{ title: '债务到期时间', key: 'expireDate' },
					{ title: '关联关系', key: 'relationType', render: mapCell(this.relationType.val()) },
					{ title: '操作', key: 'action', align: 'center', render: this.guaranteeAction }
				]
			}
		},
		methods: {
			...mapActions([
				"fetchGuaranteeList"
			]),
			...mapDetailMutations([
				"toggleModal",
				"showModal",
				"setCurGuaranteeId"
			]),
			guaranteeAction(h, data) {
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
								this.setCurGuaranteeId(row.id)
								this.showModal(this.modalName)
							}
						}
					}, '修改'),
					h('ActionDelButton', {
                		props: {
                			ok: () => {
                				guaranteeDelete(row.id)
                                    .then(() => this.fetchGuaranteeList({customerId: this.customerId}))
                			}
                		}
                	})
				])
			},
			showGuarantee() {
				this.setCurGuaranteeId('')
				this.showModal(this.modalName)
			}
		},
		mounted() {
			Dict.get(["relationType"]).then(dicts => Object.assign(this, dicts))
		}
	}

</script>
