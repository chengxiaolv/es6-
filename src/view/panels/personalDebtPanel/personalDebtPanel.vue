<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
		<div class="svu-detail-panel-title" slot="header">
            <span>负债信息</span>
            <Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small"
                @click.stop="showPersonalDebt">
                新增
            </Button>
        </div>
        <Table class="svu-detail-inner-table" 
        	:loading="personalDebtLoading" 
        	:columns="PersonalDebtColumns" :data="personalDebt.list" :height='300'></Table>
        <smart-modal v-if="customerId" title="负债信息" 
        	:value="modals[modalName]"
        	@input="toggleModal(modalName)" 
        	:height="580" 
            @close-by-confirm='fetchPersonalDebtList({customerId})'>
            <personal-debt-form v-if="modals[modalName]" :id="curPersonalDebtId" :customerId='customerId'></personal-debt-form>
        </smart-modal>
	</svu-panel>
</template>
<script>
	import { panelable, Panel as svuPanel } from '@/components/container/panel'
	import smartModal from '@/components/smartModal'
	import personalDebtForm from './personalDebtForm'
	
	import Dict from '@/components/global/dict'
	import Constant from '@/components/global/constant'
	import { mapCell,pipeCell } from '@/components/grid/renderCell'
	import { createNamespacedHelpers } from 'vuex'
	import { personalDebtDelete} from '@/api/customer'

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/personalDebt')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		mixins: [panelable],
		components: {
			svuPanel,
			smartModal,
			personalDebtForm
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
				modalName: 'personalDebt',
				debtType: Dict.NULL
			}
		},
		computed: {
			...mapState({
				personalDebt: "personalDebt",
				personalDebtLoading: "personalDebtLoading"
			}),
			...mapDetailState({
				modals: "modals",
				curPersonalDebtId: "curPersonalDebtId"
			}),
			PersonalDebtColumns(){
                return [
                    { type: 'index', width: 60, align: 'center', title: '序号' },
                    { title: '借款机构', key: 'loanOrg' },
                    { title: '金额', key: 'amount',render: pipeCell("currency") },
                    { title: '负债类型', key: 'debtType',render: mapCell(this.debtType.val()) },
                    { title: '余额', key: 'balance' ,render: pipeCell("currency")},
                    { title: '操作', key: 'action', align: 'center', render: this.PersonalDebtAction}
                ]
            }
		},
		methods: {
			...mapActions([
				"fetchPersonalDebtList"
			]),
			...mapDetailMutations([
				"toggleModal",
				"showModal",
				"setCurPersonalDebtId"
			]),
			PersonalDebtAction(h, data){
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
                                this.setCurPersonalDebtId(row.id)
								this.showModal(this.modalName)
                            }
                        }
                    }, '修改'),
                    h('ActionDelButton', {
                		props: {
                			ok: () => {
                				personalDebtDelete(row.id)
                                    .then(() => this.fetchPersonalDebtList({customerId: this.customerId}))
                			}
                		}
                	})
                ])
            },  
			showPersonalDebt() {
				this.setCurPersonalDebtId('')
				this.showModal(this.modalName)
			}
		},
		mounted(){
			Dict.get(["debtType"]).then(dicts => Object.assign(this, dicts))
		}
	}
</script>
