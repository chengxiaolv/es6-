<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
		<div class="svu-detail-panel-title" slot="header">
			<span>社会关系</span>
			<Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small" @click.stop="showSocialRelationship">
				新增
			</Button>
		</div>
		<Table class="svu-detail-inner-table" :height='300'
			:loading="socialRelationshipLoading"
			:columns="socialRelationshipColumns" 
			:data="socialRelationship.list">
		</Table>
		<smart-modal v-if="customerId" title="社会关系" 
			:value="modals[modalName]" 
			@input="toggleModal(modalName)" :height="580" 
			@close-by-confirm='fetchSocialRelationship({customerId})'>
			<social-relationship-form v-if="modals[modalName]" :id="curSocialRelationshipId" :customerId='customerId'></social-relationship-form>
		</smart-modal>
	</svu-panel>
</template>
<script>
import { panelable, Panel as svuPanel } from '@/components/container/panel'
import smartModal from '@/components/smartModal'
import socialRelationshipForm from './socialRelationshipForm'

import Dict from '@/components/global/dict'
import { mapCell } from '@/components/grid/renderCell'
import { createNamespacedHelpers } from 'vuex'
import { socialRelationDelete } from '@/api/customer'

const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/socialRelationship')
const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

export default {
	mixins: [panelable],
	components: {
		svuPanel,
		smartModal,
		socialRelationshipForm
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
			modalName: 'socialRelationship',
			relationType: Dict.NULL
		}
	},
	computed: {
		...mapState({
			socialRelationship: "socialRelationship",
			socialRelationshipLoading: "socialRelationshipLoading"
		}),
		...mapDetailState({
			modals: "modals",
			curSocialRelationshipId: "curSocialRelationshipId"
		}),
		socialRelationshipColumns() {
			return [
				{ type: 'index', width: 60, align: 'center', title: '序号' },
				{ title: '姓名', key: 'userName' },
				{ title: '与客户关系', key: 'relationType',render: mapCell(this.relationType.val())},
				{ title: '联系电话', key: 'mobile' },
				{ title: '工作单位', key: 'corpName' },
				{ title: '操作', key: 'action', align: 'center', render: this.socialRelationshipAction}
			]
		}
	},
	methods: {
		...mapActions([
			"fetchSocialRelationship"
		]),
		...mapDetailMutations([
			"toggleModal",
			"showModal",
			"setCurSocialRelationshipId"
		]),
		socialRelationshipAction(h, data){
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
                            this.setCurSocialRelationshipId(row.id)
                            this.showModal(this.modalName)
                        }
                    }
                }, '修改'),
                h('ActionDelButton', {
            		props: {
            			ok: () => {
            				socialRelationDelete(row.id).then((res) => {
                                this.fetchSocialRelationship({customerId: this.customerId})
                            })
            			}
            		}
            	})
            ])
        },
		showSocialRelationship() {
			this.setCurSocialRelationshipId('')
            this.showModal(this.modalName)
		}
	},
	mounted() {
		// Dict有缓存，在路由组件已统一取过，所以可以直接get
		Dict.get("relationType").then(relationType => this.relationType = relationType)
	}
}

</script>
