<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
		<div class="svu-detail-panel-title" slot="header">
			<span>仓库信息</span>
			<Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small"
				@click.stop="showStoreManage">
				新增
			</Button>
		</div>
		<Table class="svu-detail-inner-table" 
			:loading="storeManageLoading" :columns="storeManageColumns" :data="storeManage.list" :height='300'></Table>
		<smart-modal title="仓库信息" 
			:value="modals[modalName]" 
			@input="toggleModal(modalName)"
			:height="640"
			@close-by-confirm="fetchStoreManageList({customerId})">
			<store-manage-form v-if="modals[modalName]" :id="curStoreManageId" :customerId="customerId"></store-manage-form>
		</smart-modal>
	</svu-panel>
</template>
<script>
import { panelable, Panel as svuPanel } from '@/components/container/panel'
import smartModal from '@/components/smartModal'
import storeManageForm from './storeManageForm'

import Dict from '@/components/global/dict'
import Constant from '@/components/global/constant'
import { mapCell } from '@/components/grid/renderCell'
import { createNamespacedHelpers } from 'vuex'
import { storeManageDelete } from '@/api/customer'

const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/storeManage')
const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

export default {
	mixins: [panelable],
	components: {
		svuPanel,
		smartModal,
		storeManageForm
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
			modalName: 'storeManage',
			relationType: Dict.NULL
		}
	},
	computed: {
		...mapState({
			storeManage: "storeManage",
			storeManageLoading: "storeManageLoading"
		}),
		...mapDetailState({
			modals: "modals",
			curStoreManageId: "curStoreManageId"
		}),
		storeManageColumns() {
			return [
				{ type: 'index', width: 60, align: 'center', title: '序号' },
				{ title: '仓库名称', key: 'depotName' },
				{ title: '联系人', key: 'contactPerson' },
				{ title: '联系电话', key: 'contactMobile' },
				{ title: '仓库地址', key: 'addr' },
				{ title: '操作', key: 'action', align: 'center', render: this.storeManageAction }
			]
		}
	},
	methods: {
		...mapActions([
			"fetchStoreManageList"
		]),
		...mapDetailMutations([
			"toggleModal",
			"showModal",
			"setCurStoreManageId"
		]),
		storeManageAction(h, data) {
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
							this.setCurStoreManageId(row.id)
							this.showModal(this.modalName)
						}
					}
				}, '修改'),
				h('ActionDelButton', {
            		props: {
            			ok: () => {
            				storeManageDelete(row.id)
                                .then(() => this.fetchStoreManageList({customerId: this.customerId}))
            			}
            		}
            	})
			])
		},
		showStoreManage() {
			this.setCurStoreManageId('')
			this.showModal(this.modalName)
		}
	},
	
	mounted() {
		Dict.get(["relationType"]).then(dicts => Object.assign(this, dicts))
	}
}

</script>
