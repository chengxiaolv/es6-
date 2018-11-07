<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
		<div class="svu-detail-panel-title" slot="header">
	        <span>资产信息</span>
	        <Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small"
	            @click.stop="showAssets">
	            新增
	        </Button>
	    </div>
	    <Table class="svu-detail-inner-table" :columns="assetsColumns" :data="assetsList" :loading="assetsLoading" :height='300'></Table>
	    <smart-modal v-if="customerId" title="资产信息" :height="580"
	    	:value="modals[modalName]"
	    	@input="toggleModal(modalName)"
	        @close-by-confirm='fetchAssetsList({customerId})'>
	        <assets-form v-if="modals[modalName]" :id="curAssetsId" :customerId='customerId'></assets-form>
	    </smart-modal>
	</svu-panel>
</template>
<script>
	import { panelable, Panel as svuPanel } from '@/components/container/panel'
	import smartModal from '@/components/smartModal'
	import assetsForm from './assetsForm'
	import { pipeCell } from '@/components/grid/renderCell'

	import Dict from '@/components/global/dict'
	import Constant from '@/components/global/constant'
	import { mapCell } from '@/components/grid/renderCell'
	import { createNamespacedHelpers } from 'vuex'
	import { assetsDelete} from '@/api/customer'

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/assets')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		mixins: [panelable],
		components: {
			svuPanel,
			smartModal,
			assetsForm
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
				modalName: 'assets',
				assetsType: Dict.NULL
			}
		},
		computed: {
			...mapState({
				assets: "assets",
				assetsLoading: "assetsLoading"
			}),
			...mapDetailState({
				modals: "modals",
				curAssetsId: "curAssetsId"
			}),
			...mapGetters({
				assetsList:"assetsList"
			}),
			assetsColumns(){
                return [
                    { type: 'index', width: 60, align: 'center', title: '序号' },
                    { title: '资产类型', key: 'assetsType' ,render: mapCell(this.assetsType.val())},
                    { title: '资产名称', key: 'assetsName' },
                    { title: '资产证号', key: 'assetsNumber' },
                    { title: '市值（元）', key: 'currPrice' ,render: pipeCell("currency")},
                    { title: '操作', key: 'action', align: 'center', render: this.assetsAction}
                ]
            }
		},
		methods: {
			...mapActions([
				"fetchAssetsList"
			]),
			...mapDetailMutations([
				"toggleModal",
				"showModal",
				"setCurAssetsId"
			]),
			assetsAction(h, data){
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
                            	this.setCurAssetsId(row.id)
								this.showModal(this.modalName)
                            }
                        }
                    }, '修改'),
                    h('ActionDelButton', {
                		props: {
                			ok: () => {
                				assetsDelete(row.id)
                                    .then(() => this.fetchAssetsList({customerId: this.customerId}))
                			}
                		}
                	})
                ])
            },
			showAssets() {
				this.setCurAssetsId('')
				this.showModal(this.modalName)
			}
		},
		mounted(){
			Dict.get(["assetsType"]).then(dicts => Object.assign(this, dicts))
		}
	}
</script>
