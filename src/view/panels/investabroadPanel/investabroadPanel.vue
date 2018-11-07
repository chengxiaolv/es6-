<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
		<div class="svu-detail-panel-title" slot="header">
			<span>对外投资</span>
			<Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small" 
				@click.stop="showInvestabroad">
				新增
			</Button>
		</div>
		<Table  class="svu-detail-inner-table" 
			:loading="investabroadLoading" :columns="investabroadColumns" :data="investabroad.list":height='300'></Table>
		<smart-modal title="对外投资" 
			:value="modals[modalName]"
			@input="toggleModal(modalName)" 
			:height="640"
			@close-by-confirm="fetchInvestabroadList({customerId})">
			<investabroad-form v-if="modals[modalName]" :id="curInvestabroadId" :customerId="customerId"></investabroad-form>
		</smart-modal>
	</svu-panel>
</template>
<script>
	import { panelable, Panel as svuPanel } from '@/components/container/panel'
	import smartModal from '@/components/smartModal'
	import investabroadForm from './investabroadForm'

	import Dict from '@/components/global/dict'
	import Constant from '@/components/global/constant'
	import { mapCell } from '@/components/grid/renderCell'
	import { createNamespacedHelpers } from 'vuex'
	import { investabroadDelete } from '@/api/customer'
    import {pipeCell} from '@/components/grid/renderCell'
	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/investabroad')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		mixins: [panelable],
		components: {
			svuPanel,
			smartModal,
			investabroadForm
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
				modalName: 'investabroad',
				relationType: Dict.NULL
			}
		},
		computed: {
			...mapState({
				investabroad: "investabroad",
				investabroadLoading: "investabroadLoading"
			}),
			...mapDetailState({
				modals: "modals",
				curInvestabroadId: "curInvestabroadId"
			}),
			investabroadColumns() {
				return [
					{ type: 'index', width: 60, align: 'center', title: '序号' },
					{ title: '投向企业名称', key: 'corpName' },
					{ 
						title: '投资金额(元)', 
						key: 'investAmount',
						render: pipeCell("currency")
					},
					{ title: '股权比例(%)', key: 'percent' },
					{ title: '出资日期', key: 'investDate' },
					{ title: '操作', key: 'action', align: 'center', render: this.investabroadAction }
				]
			}
		},
		methods: {
			...mapActions([
				"fetchInvestabroadList"
			]),
			...mapDetailMutations([
				"toggleModal",
				"showModal",
				"setCurInvestabroadId"
			]),
			investabroadAction(h, data) {
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
								this.setCurInvestabroadId(row.id)
								this.showModal(this.modalName)
							}
						}
					}, '修改'),
					h('ActionDelButton', {
                		props: {
                			ok: () => {
                				investabroadDelete(row.id)
                                    .then(() => this.fetchInvestabroadList({customerId: this.customerId}))
                			}
                		}
                	})
				])
			},
			showInvestabroad() {
				this.setCurInvestabroadId('')
				this.showModal(this.modalName)
			}
		},

		mounted() {
			Dict.get(["relationType"]).then(dicts => Object.assign(this, dicts))
		}
	}

</script>
