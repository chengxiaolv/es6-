<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
        <div class="svu-detail-panel-title" slot="header">
            <span>共借人信息</span>
            <Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small"
                @click.stop="showPartener">
                新增
            </Button>
        </div>
        <Table :columns="partenerColumns" :data="partener.list" :loading="partenerLoading" class="svu-detail-inner-table"></Table>
        <smart-modal title="共借人信息" 
        	:value="modals[modalName]"
        	@input="toggleModal(modalName)" 
        	:height="640"
            @close-by-confirm="fetchPartener({caseId: materialId})">
            <partener-form v-if="modals[modalName]" 
                :id="curPartenerId"
                :materialId="materialId"
                :customerId="customerId">
            </partener-form>
        </smart-modal>
    </svu-panel>
</template>
<script>
	import {panelable, Panel as svuPanel} from '@/components/container/panel'
	import smartModal from '@/components/smartModal'
	import partenerForm from './partenerForm'

	import Dict from '@/components/global/dict'
	import {mapCell} from '@/components/grid/renderCell'
	import { createNamespacedHelpers } from 'vuex'
	import { partenerDelete } from '@/api/common'

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('credit/partener')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default{
		mixins:[panelable],
		components:{
			svuPanel,
			smartModal,
			partenerForm
		},
		props:{
			materialId:{
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
				modalName: 'partener',
				cstType: Dict.NULL
			}
		},
		computed:{
			...mapState({
				partener: "partener",
				partenerLoading: "partenerLoading"
			}),
			...mapDetailState({
				modals: "modals",
				curPartenerId: "curPartenerId"
			}),
			partenerColumns(){
				return [
                    { type: 'index', width: 60, align: 'center', title: '序号' },
                    { title: '客户名称', key: 'userName' },
                    { title: '客户类型', key: 'cstType', render: mapCell(this.cstType.val())},
                    { title: '证件号码', key: 'credNumber' },
                    { title: '联系电话', key: 'mobile' },
                    { title: '操作', key: 'action', align: 'center', render: this.partenerAction}
                ]
			}
		},
		methods:{
			...mapActions([
				"fetchPartener"
			]),
			...mapDetailMutations([
				"toggleModal",
				"showModal",
				"setCurPartenerId"
			]),
			partenerAction(h, data){
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
                                this.setCurPartenerId(row.id)
								this.showModal(this.modalName)
                            }
                        }
                    }, '修改'),
                    h('ActionDelButton', {
                		props: {
                			ok: () => {
                                partenerDelete(row.id)
                                    .then(() => this.fetchPartener({caseId: this.materialId}))
                			}
                		}
                	})
                ])
            },
            showPartener() {
				this.setCurPartenerId('')
				this.showModal(this.modalName)
			}
		},
		mounted(){
			// Dict有缓存，在路由组件已统一取过，所以可以直接get
			Dict.get("cstType").then(cstType => this.cstType = cstType)
		}
	}
</script>