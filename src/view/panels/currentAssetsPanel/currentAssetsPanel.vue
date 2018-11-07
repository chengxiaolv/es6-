<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
		<div class="svu-detail-panel-title" slot="header">
            <span>流动资产</span>
            <Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small"
                @click.stop="showCurrentAssets">
                新增
            </Button>
        </div>
        <Table class="svu-detail-inner-table" 
        	:loading="currentAssetsLoading" :columns="currentAssetsColumns" :data="currentAssets.list" :height='300'></Table>
        <smart-modal v-if="customerId" title="流动资产" 
        	:value="modals[modalName]"
        	@input="toggleModal(modalName)" :height="580" :width="500"
            @close-by-confirm='fetchCurrentAssetsList({customerId})'>
            <current-assets-form v-if="modals[modalName]" :id="curCurrentAssetsId" :customerId='customerId'></current-assets-form>
        </smart-modal>
	</svu-panel>
</template>
<script>
	import { panelable, Panel as svuPanel } from '@/components/container/panel'
	import smartModal from '@/components/smartModal'
	import currentAssetsForm from './currentAssetsForm'

	import Dict from '@/components/global/dict'
	import Constant from '@/components/global/constant'
	import { mapCell } from '@/components/grid/renderCell'
	import { createNamespacedHelpers } from 'vuex'
	import { currentAssetsDelete} from '@/api/customer'

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/currentAssets')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		mixins: [panelable],
		components: {
			svuPanel,
			smartModal,
			currentAssetsForm
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
				modalName: 'currentAssets',
				flowAssetsType: Dict.NULL
			}
		},
		computed: {
			...mapState({
				currentAssets: "currentAssets",
				currentAssetsLoading: "currentAssetsLoading"
			}),
			...mapDetailState({
				modals: "modals",
				curCurrentAssetsId: "curCurrentAssetsId"
			}),
			currentAssetsColumns(){
                return [
                    { type: 'index', width: 60, align: 'center', title: '序号' },
                    { title: '资产类型', key: 'flowAssetsType',render: mapCell(this.flowAssetsType.val()) },
                    { title: '资产名称', key: 'assetsName' },
                    { title: '市值（元）', key: 'currPrice' },
                    { title: '操作', key: 'action', align: 'center', render: this.currentAssetsAction}
                ]
            }
		},
		methods: {
			...mapActions([
				"fetchCurrentAssetsList"
			]),
			...mapDetailMutations([
				"toggleModal",
				"showModal",
				"setCurCurrentAssetsId"
			]),
			currentAssetsAction(h, data){
                var {row, column, index} = data
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
                                this.setCurCurrentAssetsId(row.id)
								this.showModal(this.modalName)
                            }
                        }
                    }, '修改'),
                    h('ActionDelButton', {
                		props: {
                			ok: () => {
                				currentAssetsDelete(row.id)
                                    .then(() => this.fetchCurrentAssetsList({customerId: this.customerId}))
                			}
                		}
                	})
                ])
            },
			showCurrentAssets() {
				this.setCurCurrentAssetsId('')
				this.showModal(this.modalName)
			}
		},
		mounted(){
			Dict.get(["flowAssetsType"]).then(dicts => Object.assign(this, dicts))
		}
	}
</script>
