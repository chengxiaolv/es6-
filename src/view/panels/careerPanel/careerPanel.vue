<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
		<div class="svu-detail-panel-title" slot="header">
			<span>职业信息</span>
			<Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small" @click.stop="showCareer">
				新增
			</Button>
		</div>
		<Table class="svu-detail-inner-table" :height='300'
			:columns="careerColumns"
			:data="career.list"
			:loading="careerLoading">
		</Table>
		<smart-modal v-if="customerId" title="职业信息" 
			:value="modals[modalName]" @input="toggleModal(modalName)"
			:height="580" 
			@close-by-confirm='fetchCareer({ customerId: customerId })'>
			<career-form v-if="modals[modalName]" :id="curCareerId" :customerId='customerId'></career-form>
		</smart-modal>
	</svu-panel>
</template>
<script>
	import { panelable, Panel as svuPanel } from '@/components/container/panel'
	import smartModal from '@/components/smartModal'
	import careerForm from './careerForm'

	import Dict from '@/components/global/dict'
	import { mapCell } from '@/components/grid/renderCell'
	import { createNamespacedHelpers } from 'vuex'
	import { careerDelete } from '@/api/customer'

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/career')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		mixins: [panelable],
		components: {
			svuPanel,
			smartModal,
			careerForm
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
				modalName: "career"
			}
		},
		computed: {
			...mapState({
				career: "career",
				careerLoading: "careerLoading"
			}),
			...mapDetailState({
				modals: "modals",
				curCareerId: "curCareerId"
			}),
			careerColumns() {
				return [
					{ type: 'index', width: 60, align: 'center', title: '序号' },
					{ title: '工作单位', key: 'corpName' },
					{ title: '职业', key: 'career' },
					{ title: '担任职务', key: 'position' },
					{ title: '单位电话', key: 'corpTel' },
					{ title: '操作', key: 'action', align: 'center', render: this.careerAction }
				]
			}
		},
		methods: {
			...mapActions([
				"fetchCareer"
			]),
			...mapDetailMutations([
				"toggleModal",
				"showModal",
				"setCurCareerId"
			]),
			careerAction(h, data) {
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
								this.setCurCareerId(row.id)
								this.showModal(this.modalName)
							}
						}
					}, '修改'),
					h('ActionDelButton', {
                		props: {
                			ok: () => {
                                careerDelete(row.id).then((res) => {
									this.fetchCareer({customerId: this.customerId})
								})
                			}
                		}
                	})
				])
			},
			showCareer() {
				this.showModal(this.modalName)
				this.setCurCareerId('')
			}
		}
	}
</script>
