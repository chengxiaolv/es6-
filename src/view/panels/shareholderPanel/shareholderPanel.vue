<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
		<div class="svu-detail-panel-title" slot="header">
	        <span>股东信息</span>
	        <Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small" 
	        	@click.stop="showShareholder">
	            新增
	        </Button>
	    </div>
	    <Table class="svu-detail-inner-table" 
	    	:loading="shareholderLoading" :columns="shareholderColumns" :data="shareholder.list" :height='300'></Table>
	    <smart-modal title="股东信息" 
	    	:value="modals[modalName]"
	    	@input="toggleModal(modalName)" 
	    	@close-by-confirm="fetchShareholderList({customerId:customerId})" :height="640"> 
	        <shareholder-form v-if="modals[modalName]" :id="curShareholderId" :customerId="customerId"></shareholder-form>
	    </smart-modal>
	</svu-panel>
</template>
<script>
	import { panelable, Panel as svuPanel } from '@/components/container/panel'
	import smartModal from '@/components/smartModal'
	import shareholderForm from './shareholderForm'

	import Dict from '@/components/global/dict'
	import Constant from '@/components/global/constant'
	import { mapCell } from '@/components/grid/renderCell'
	import { createNamespacedHelpers } from 'vuex'
	import { shareholderDelete} from '@/api/customer'

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/shareholder')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		mixins: [panelable],
		components: {
			svuPanel,
			smartModal,
			shareholderForm
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
				modalName: 'shareholder',
				shareholderUse: Dict.NULL
			}
		},
		computed: {
			...mapState({
				shareholder: "shareholder",
				shareholderLoading: "shareholderLoading"
			}),
			...mapDetailState({
				modals: "modals",
				curShareholderId: "curShareholderId"
			}),
			shareholderColumns(){
                return [
                    { type: 'index', width: 60, align: 'center', title: '序号' },
                    { title: '股东名称', key: 'userName' },
                    { title: '出资金额(元)', key: 'investAmount' },
                    { title: '出资日期', key: 'investDate' },
                    { title: '股权比例（%）', key: 'percent' },
                    { title: '操作', key: 'action', align: 'center', render: this.shareholderAction }
                ]
            }
		},
		methods: {
			...mapActions([
				"fetchShareholderList"
			]),
			...mapDetailMutations([
				"toggleModal",
				"showModal",
				"setCurShareholderId"
			]),
			shareholderAction(h, data) {
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
                                this.setCurShareholderId(row.id)
								this.showModal(this.modalName)
                            }
                        }
                    }, '修改'),
                    h('ActionDelButton', {
                		props: {
                			ok: () => {
                				shareholderDelete(row.id)
                                    .then(() => this.fetchShareholderList({customerId: this.customerId}))
                			}
                		}
                	})
                ])
            },
			showShareholder() {
				this.setCurShareholderId('')
				this.showModal(this.modalName)
			}
		},
		mounted(){
			Dict.get(["shareholderUse"]).then(dicts => Object.assign(this, dicts))
		}
	}
</script>
