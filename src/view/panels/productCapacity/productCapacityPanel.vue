<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
		<div class="svu-detail-panel-title" slot="header">
            <span>产品产能情况</span>
            <Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small"
                @click.stop="showProductCapacity">
                新增
            </Button>
        </div>
       <Table class="svu-detail-inner-table" 
       		:loading="productCapacityLoading" :columns="productCapacityColumns" :data="productCapacity.list" :height='300'></Table>
        <smart-modal title="产品产能情况" 
        	:value="modals[modalName]" 
			@input="toggleModal(modalName)"
        	:height="640"
        	@close-by-confirm="fetchProductCapacityList({customerId})">
            <product-capacity-form v-if="modals[modalName]" :id="curProductCapacityId" :customerId="customerId"></product-capacity-form>
        </smart-modal>
	</svu-panel>
</template>
<script>
	import { panelable, Panel as svuPanel } from '@/components/container/panel'
	import smartModal from '@/components/smartModal'
	import productCapacityForm from './productCapacityForm'

	import Dict from '@/components/global/dict'
	import Constant from '@/components/global/constant'
	import { mapCell } from '@/components/grid/renderCell'
	import { createNamespacedHelpers } from 'vuex'
	import { productCapacityDelete} from '@/api/customer'
    import {pipeCell} from '@/components/grid/renderCell'
	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/productCapacity')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		mixins: [panelable],
		components: {
			svuPanel,
			smartModal,
			productCapacityForm
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
				modalName: 'productCapacity',
                saleArea: Dict.NULL,
                obeyRules:Dict.NULL,
				devCapacity:Dict.NULL
			}
		},
		computed: {
			...mapState({
				productCapacity: "productCapacity",
				productCapacityLoading: "productCapacityLoading"
			}),
			...mapDetailState({
				modals: "modals",
				curProductCapacityId: "curProductCapacityId"
			}),
			productCapacityColumns(){
                 return [
                    { type: 'index', width: 60, align: 'center', title: '序号' },
                    { title: '产品名称', key: 'productName' },
                    { 
						title: '销售区域', 
						key: 'saleArea',
						render: mapCell(this.saleArea.val())
					},
                    {
						 title: '产品遵守规则',
						  key: 'obeyRules',
						  render: mapCell(this.obeyRules.val())
					},
                    { 
						title: '正常交货周期', 
						key: 'deliverCycle'
					},
                    { title: '操作', key: 'action', align: 'center', render: this.productCapacityAction}
                ]
            }
		},
		methods: {
			...mapActions([
				"fetchProductCapacityList"
			]),
			...mapDetailMutations([
				"toggleModal",
				"showModal",
				"setCurProductCapacityId"
			]),
			productCapacityAction(h, data){
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

                                this.setCurProductCapacityId(row.id)
								this.showModal(this.modalName)
                            }
                        }
                    }, '修改'),
                    h('ActionDelButton', {
                		props: {
                			ok: () => {
                				productCapacityDelete(row.id)
                                    .then(() => this.fetchProductCapacityList({customerId: this.customerId}))
                			}
                		}
                	})
                ])
            },
			showProductCapacity() {
				this.setCurProductCapacityId('')
				this.showModal(this.modalName)			
			}
		},
		mounted(){
			Dict.get(["saleArea","obeyRules","devCapacity"]).then(dicts => Object.assign(this, dicts))
		}
	}
</script>
