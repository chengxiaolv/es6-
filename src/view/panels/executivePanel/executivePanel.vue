<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
		<div class="svu-detail-panel-title" slot="header">
	        <span>高管信息</span>
	        <Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small" 
	        	@click.stop="showExecutive">
	            新增
	        </Button>
	    </div>
	    <Table class="svu-detail-inner-table"
	    	:loading="executiveLoading" :columns="executiveColumns" :data="executive.list" :height='300'></Table>
	    <smart-modal title="高管信息" 
	    	:value="modals[modalName]" 
	    	@input="toggleModal(modalName)"
	    	:height='640'
	    	@close-by-confirm="fetchExecutiveList({customerId:customerId})">
	        <executive-form v-if="modals[modalName]" :id="curExecutiveId" :customerId="customerId"></executive-form>
	    </smart-modal>
	</svu-panel>
</template>
<script>
	import { panelable, Panel as svuPanel } from '@/components/container/panel'
	import smartModal from '@/components/smartModal'
	import executiveForm from './executiveForm'

	import Dict from '@/components/global/dict'
	import Constant from '@/components/global/constant'
	import { mapCell } from '@/components/grid/renderCell'
	import { createNamespacedHelpers } from 'vuex'
	import { executiveDelete} from '@/api/customer'

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/executive')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		mixins: [panelable],
		components: {
			svuPanel,
			smartModal,
			executiveForm
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
				modalName: 'executive',
				educationLevel: Dict.NULL
			}
		},
		computed: {
			...mapState({
				executive: "executive",
				executiveLoading: "executiveLoading"
			}),
			...mapDetailState({
				modals: "modals",
				curExecutiveId: "curExecutiveId"
			}),
			executiveColumns(){
                return [
                    { type: 'index', width: 60, align: 'center', title: '序号' },
                    { title: '高管名称', key: 'userName' },
                    { title: '高管人员级别', key: 'position' },
                    { title: '证件号码', key: 'credNumber' },
                   
                    { title: '最高学历', key: 'educationLevel', render: mapCell(this.educationLevel.val()) },
                    { title: '操作', key: 'action', align: 'center', render: this.executiveAction }
                ]
            }
		},
		methods: {
			...mapActions([
				"fetchExecutiveList"
			]),
			...mapDetailMutations([
				"toggleModal",
				"showModal",
				"setCurExecutiveId"
			]),
			executiveAction(h, data) {
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
                                this.setCurExecutiveId(row.id)
								this.showModal(this.modalName)
                            }
                        }
                    }, '修改'),
                    h('ActionDelButton', {
                		props: {
                			ok: () => {
                				executiveDelete(row.id)
                                    .then(() => this.fetchExecutiveList({customerId: this.customerId}))
                			}
                		}
                	})
                ])
            },
			showExecutive() {
				this.setCurExecutiveId('')
				this.showModal(this.modalName)
			}
		},
		mounted(){
			Dict.get(["educationLevel"]).then(dicts => Object.assign(this, dicts))
		}
	}
</script>
