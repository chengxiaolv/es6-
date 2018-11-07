<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
        <div class="svu-detail-panel-title" slot="header">
            <span>费用标准</span>
            <Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small"
                @click.stop="showFee">
                新增
            </Button>
        </div>
        <Table :columns="feeColumns" :data="fee.list" :loading="feeLoading" class="svu-detail-inner-table"></Table>
        <smart-modal title="费用标准" 
        	:value="modals[modalName]"
        	@input="toggleModal(modalName)" 
        	:height="640"
            @close-by-confirm="fetchFee({dataId})">
            <fee-form v-if="modals[modalName]" 
                :id="curFeeId"
                :dataId="dataId"
                :customerId="customerId">
            </fee-form>
        </smart-modal>
    </svu-panel>
</template>
<script>
	import {panelable, Panel as svuPanel} from '@/components/container/panel'
	import smartModal from '@/components/smartModal'
	import feeForm from './feeForm'

	import Dict from '@/components/global/dict'
	import {mapCell} from '@/components/grid/renderCell'
	import { createNamespacedHelpers } from 'vuex'
	import { feeStandardDelete } from '@/api/common'

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('credit/fee')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default{
		mixins:[panelable],
		components:{
			svuPanel,
			smartModal,
			feeForm
		},
		props:{
			dataId:{
				type: String,
				required: true
			},
			customerId:{
				type: String,
				required: true
			},
			name:{
				type: String
			}
		},
		data(){
			return {
				// 业务相关
				modalName: 'fee',
				reciveNode: Dict.NULL,
				feeBase: Dict.NULL,
				feeRateType: Dict.NULL
			}
		},
		computed:{
			...mapState({
				fee: "fee",
				feeLoading: "feeLoading"
			}),
			...mapDetailState({
				modals: "modals",
				curFeeId: "curFeeId"
			}),
			feeColumns(){
                return [
                    { type: 'index', width: 60, align: 'center', title: '序号' },
                    { title: '费用名称', key: 'itemName' },
                    { title: '收取环节', key: 'reciveNode', render: mapCell(this.reciveNode.val())},
                    { title: '费用基数', key: 'feeBase', render: mapCell(this.feeBase.val())},
                    { title: '费用类型', key: 'feeRateType', render: mapCell(this.feeRateType.val())},
                    { title: '费率值', key: 'feeRate' },
                    { title: '操作', key: 'action', align: 'center', render: this.feeAction}
                ]
			}
		},
		methods:{
			...mapActions([
				"fetchFee"
			]),
			...mapDetailMutations([
				"toggleModal",
				"showModal",
				"setCurFeeId"
			]),
			feeAction(h, data){
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
                                this.setCurFeeId(row.id)
								this.showModal(this.modalName)
                            }
                        }
                    }, '修改'),
                    h('ActionDelButton', {
                		props: {
                			ok: () => {
                				feeStandardDelete(row.id)
                                    .then(() => this.fetchFee({dataId: this.dataId}))
                			}
                		}
                	})
                ])
            },
            showFee() {
				this.setCurFeeId('')
				this.showModal(this.modalName)
			}
		},
		mounted(){
			// Dict有缓存，在路由组件已统一取过，所以可以直接get
			Dict.get(["reciveNode", "feeBase", "feeRateType"])
				.then(groups => Object.assign(this, groups))
		}
	}
</script>