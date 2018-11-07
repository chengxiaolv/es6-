<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
		<div class="svu-detail-panel-title" slot="header">
            <span>上市信息</span>
            <Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small"
                @click.stop="showListedInfo">
                新增
            </Button>
        </div>
       <Table class="svu-detail-inner-table" 
       		:loading="listedInfoLoading" :columns="listedInfoColumns" :data="listedInfo.list" :height='300'></Table>
        <smart-modal title="上市信息" 
        	:value="modals[modalName]" 
			@input="toggleModal(modalName)"
        	:height="640"
        	@close-by-confirm="fetchListedInfoList({customerId})">
            <listed-info-form v-if="modals[modalName]" :id="curListedInfoId" :customerId="customerId"></listed-info-form>
        </smart-modal>
	</svu-panel>
</template>
<script>
	import { panelable, Panel as svuPanel } from '@/components/container/panel'
	import smartModal from '@/components/smartModal'
	import listedInfoForm from './listedInfoForm'

	import Dict from '@/components/global/dict'
	import Constant from '@/components/global/constant'
	import { mapCell } from '@/components/grid/renderCell'
	import { createNamespacedHelpers } from 'vuex'
	import { listedInfoDelete} from '@/api/customer'
    import {pipeCell} from '@/components/grid/renderCell'
	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/listedInfo')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		mixins: [panelable],
		components: {
			svuPanel,
			smartModal,
			listedInfoForm
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
				modalName: 'listedInfo',
				educationLevel: Dict.NULL
			}
		},
		computed: {
			...mapState({
				listedInfo: "listedInfo",
				listedInfoLoading: "listedInfoLoading"
			}),
			...mapDetailState({
				modals: "modals",
				curListedInfoId: "curListedInfoId"
			}),
			listedInfoColumns(){
                 return [
                    { type: 'index', width: 60, align: 'center', title: '序号' },
                    { title: '股票名称', key: 'stockName' },
                    { title: '上市时间', key: 'listedDate' },
                    {
						 title: '发行价格(元)',
						  key: 'releasePrice',
						 render: pipeCell("currency")
					},
                    { 
						title: '现行市值(元)', 
						key: 'currPrice',
						render: pipeCell("currency")
					},
                    { title: '操作', key: 'action', align: 'center', render: this.listedInfoAction}
                ]
            }
		},
		methods: {
			...mapActions([
				"fetchListedInfoList"
			]),
			...mapDetailMutations([
				"toggleModal",
				"showModal",
				"setCurListedInfoId"
			]),
			listedInfoAction(h, data){
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
                                this.setCurListedInfoId(row.id)
								this.showModal(this.modalName)
                            }
                        }
                    }, '修改'),
                    h('ActionDelButton', {
                		props: {
                			ok: () => {
                				listedInfoDelete(row.id)
                                    .then(() => this.fetchListedInfoList({customerId: this.customerId}))
                			}
                		}
                	})
                ])
            },
			showListedInfo() {
				this.setCurListedInfoId('')
				this.showModal(this.modalName)			
			}
		},
		mounted(){
			Dict.get(["educationLevel"]).then(dicts => Object.assign(this, dicts))
		}
	}
</script>
