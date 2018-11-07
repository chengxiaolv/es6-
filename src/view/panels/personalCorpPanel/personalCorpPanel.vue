<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
		<div class="svu-detail-panel-title" slot="header">
            <span>个人名下企业</span>
            <Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small"
                @click.stop="showPersonalCorp">
                新增
            </Button>
        </div>
        <Table :columns="personalCorpColumns" :data="personalCorp.list" class="svu-detail-inner-table" :height='300'></Table>
        <smart-modal v-if="customerId" title="个人名下企业" 
        	:value="modals[modalName]" 
        	@input="toggleModal(modalName)"
        	:height="580" 
            @close-by-confirm='fetchPersonalCorpList({customerId})'>
            <personal-corp-form v-if="modals[modalName]" :id="curPersonalCorpId" :customerId='customerId'></personal-corp-form>
        </smart-modal>
	</svu-panel>
</template>
<script>
	import { panelable, Panel as svuPanel } from '@/components/container/panel'
	import smartModal from '@/components/smartModal'
	import personalCorpForm from './personalCorpForm'
	
	import Dict from '@/components/global/dict'
	import Constant from '@/components/global/constant'
	import { mapCell,pipeCell } from '@/components/grid/renderCell'
	import { createNamespacedHelpers } from 'vuex'
	import { personalCorpDelete} from '@/api/customer'

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/personalCorp')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		mixins: [panelable],
		components: {
			svuPanel,
			smartModal,
			personalCorpForm
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
				modalName: 'personalCorp',
				corpType: Dict.NULL
			}
		},
		computed: {
			...mapState({
				personalCorp: "personalCorp",
				personalCorpLoading: "personalCorpLoading"
			}),
			...mapDetailState({
				modals: "modals",
				curPersonalCorpId: "curPersonalCorpId"
			}),
			personalCorpColumns(){
                return [
                    { type: 'index', width: 60, align: 'center', title: '序号' },
                    { title: '企业名称', key: 'corpName' },
                    { title: '社会信用代码', key: 'socialCreditCode' },
                    { title: '企业性质', key: 'corpType',render: mapCell(this.corpType.val()) },
                    { title: '注册资本（元）', key: 'regCapital',render: pipeCell("currency") },
                    { title: '操作', key: 'action', align: 'center', render: this.personalCorpAction}
                ]
            }
		},
		methods: {
			...mapActions([
				"fetchPersonalCorpList"
			]),
			...mapDetailMutations([
				"toggleModal",
				"showModal",
				"setCurPersonalCorpId"
			]),
			personalCorpAction(h, data){
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
                                this.setCurPersonalCorpId(row.id)
								this.showModal(this.modalName)
                            }
                        }
                    }, '修改'),
                    h('ActionDelButton', {
                		props: {
                			ok: () => {
                				personalCorpDelete(row.id)
                                    .then(() => this.fetchPersonalCorpList({customerId: this.customerId}))
                			}
                		}
                	})
                ])
            },
			showPersonalCorp() {
				this.setCurPersonalCorpId('')
				this.showModal(this.modalName)
			}
		},
		mounted(){
			Dict.get(["corpType"]).then(dicts => Object.assign(this, dicts))
		}
	}
</script>
