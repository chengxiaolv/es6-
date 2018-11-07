<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
		<div class="svu-detail-panel-title" slot="header">
	        <span>账户管理</span>
	        <Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small"
	            @click.stop="showAccount">
	            新增
	        </Button>
	    </div>
	    <Table :columns="accountColumns" :loading="accountLoading" :data="account.list" class="svu-detail-inner-table" :height='300'></Table>
	    <smart-modal v-if="customerId" title="账户管理"
	    	:height="580" 
	    	:value="modals[modalName]"
	    	@input="toggleModal(modalName)"
	        @close-by-confirm='fetchAccountList({customerId})'>
	        <account-form v-if="modals[modalName]" :id="curAccountId" :customerId='customerId'></account-form>
	    </smart-modal>
	</svu-panel>
</template>
<script>
	import { panelable, Panel as svuPanel } from '@/components/container/panel'
	import smartModal from '@/components/smartModal'
	import accountForm from './accountForm'

	import Dict from '@/components/global/dict'
	import Constant from '@/components/global/constant'
	import { mapCell } from '@/components/grid/renderCell'
	import { createNamespacedHelpers } from 'vuex'
	import { accountDelete} from '@/api/common'

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/account')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		mixins: [panelable],
		components: {
			svuPanel,
			smartModal,
			accountForm
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
				modalName: 'account',
				accountUse: Dict.NULL
			}
		},
		computed: {
			...mapState({
				account: "account",
				accountLoading: "accountLoading"
			}),
			...mapDetailState({
				modals: "modals",
				curAccountId: "curAccountId"
			}),
			accountColumns() {
				return [
                    { type: 'index', width: 60, align: 'center', title: '序号' },
                    { title: '卡号', key: 'cardNumber' },
                    { title: '账户名称', key: 'accountName' },
                    { title: '账号用途', key: 'accountUse',render: mapCell(this.accountUse.val()) },
                    { title: '开户行', key: 'cardType' },
                    { title: '认证状态', key: 'enableStat' ,render: mapCell(Constant.get("choise").toList())},
                    { title: '操作', key: 'action', align: 'center', render: this.accountAction}
                ]
			}
		},
		methods: {
			...mapActions([
				"fetchAccountList"
			]),
			...mapDetailMutations([
				"toggleModal",
				"showModal",
				"setCurAccountId"
			]),
			accountAction(h, data){
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
                            	this.setCurAccountId(row.id)
								this.showModal(this.modalName)
                            }
                        }
                    }, '修改'),
                    h('ActionDelButton', {
                		props: {
                			ok: () => {
                				accountDelete(row.id)
                                    .then(() => this.fetchAccountList({customerId: this.customerId}))
                			}
                		}
                	})
                ])
            },
			showAccount() {
				this.setCurAccountId('')
				this.showModal(this.modalName)
			}
		},
		mounted(){
			Dict.get(["accountUse"]).then(dicts => Object.assign(this, dicts))
		}
	}
</script>
