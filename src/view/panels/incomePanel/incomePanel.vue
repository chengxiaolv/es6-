<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
		<div class="svu-detail-panel-title" slot="header">
			<span>收支情况</span>
			<Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small" 
				@click.stop="showModal(modalName)">
				{{incomeInfo.id ? "修改" : "新增"}}
			</Button>
		</div>
		<silence-form v-if="incomeInfo.id" :data="incomeInfo" :prefix="'personal.'" :strategy="baseStrat"></silence-form>
		<div v-else class="text-center" style="margin: 20px 0;">
			暂无数据
		</div>
		<smart-modal v-if="customerId" title="收支情况" 
			:value="modals[modalName]" 
			@input="toggleModal(modalName)" 
			height="600" 
			@close-by-confirm='fetchIncomeInfo(customerId)'>
			<income-form v-if="modals[modalName]" :customerId="customerId"></income-form>
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
	import incomeForm from './incomeForm'

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/incomeInfo')
	const { mapState: mapDetailState, mapMutations: mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		mixins: [panelable],
		components: {
			svuPanel,
			smartModal,
			silenceForm,
			incomeForm
		},
		props: {
			name: {
				type: String
			},
			customerId: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				// 业务相关
				modalName: "income",
				baseStrat: Strategy.NULL
			}
		},
		computed: {
			...mapState({
				incomeInfo: "incomeInfo"
			}),
			...mapDetailState({
				modals: "modals"
			})
		},
		methods: {
			...mapActions([
				"fetchIncomeInfo"
			]),
			...mapDetailMutations([
				"toggleModal",
				"showModal"
			])
		},
		mounted() {
			Dict.get([
				"cstType", "relationType", "credTypePersonal", "maritalStat", "nation", "livingStat",
				"politicalStat", "healthStat", "educationLevel", "creditStat", "accountUse", "creditStat",
				"assetsType", "flowAssetsType", "debtType", "corpType"
			]).then(dicts => {
				var currencyKeys = ["familyIncomeInMonth","personalIncomeInMonth","familyMonthExpend","personMonthExpend"],
					humanUnitKeys = ["familyMember", "supportMember"]

				this.baseStrat = new Strategy([
					{ type: "Dict", dicts: dicts },
					{ type:"Currency", rule: currencyKeys},
					{ execute: value => value + " 元", rule: currencyKeys},
					{ execute: value => value + " 人", rule: humanUnitKeys}
				])
			})
		}
	}

</script>
