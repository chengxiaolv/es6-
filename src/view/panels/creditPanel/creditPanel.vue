<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
        <div class="svu-detail-panel-title" slot="header">
            <span>信用情况</span>
            <Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small"
                @click.stop="showModal(modalName)">
                {{creditInfo.id ? "修改" : "新增"}}
            </Button>
        </div>
        <silence-form v-if="creditInfo.id" :data="creditInfo" :prefix="'personal.'" :strategy="baseStrat"></silence-form>
		<div v-else class="text-center" style="margin: 20px 0;">
			暂无数据
		</div>
        <smart-modal v-if="customerId" title="信用情况" :height="600"
        	:value="modals[modalName]"
        	@input="toggleModal(modalName)"
        	@close-by-confirm='fetchCreditInfo(customerId)'>
            <credit-form v-if="modals[modalName]" :customerId="customerId"></credit-form>
        </smart-modal>
    </svu-panel>
</template>
<script>
	import { panelable, Panel as svuPanel } from '@/components/container/panel'
	import { silenceForm, Strategy } from '@/components/form/silenceForm'
	import { createNamespacedHelpers } from 'vuex'
	import Dict from '@/components/global/dict'
	import Constant from '@/components/global/constant'
	import smartModal from '@/components/smartModal'
	import creditForm from './creditForm'
	
	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/creditInfo')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		mixins:[panelable],
		components: {
			svuPanel,
			smartModal,
			silenceForm,
			creditForm
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
				modalName: 'credit',
				baseStrat: Strategy.NULL
			}
		},
		computed: {
			...mapState({
				creditInfo: "creditInfo"
			}),
			...mapDetailState({
				modals: "modals"
			})
		},
		methods: {
			...mapActions([
				"fetchCreditInfo"
			]),
			...mapDetailMutations([
				"toggleModal",
				"showModal"
			])
		},
		mounted() {
			Dict.get([
				"creditStat"
			]).then(dicts => {
				this.baseStrat = new Strategy([
					{ type: "Dict", dicts: dicts },
					{ type:"Constant",constant: Constant.get("choise"), rule: ["arrearsTax","arrearsEmployee","arrearsRent"]},
				])
			})
		}
	}
</script>
