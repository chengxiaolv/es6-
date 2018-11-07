<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
		<div class="svu-detail-panel-title" slot="header">
			<span>进件信息</span>
			<Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small" @click.stop="showModal('caseInfo')">
				修改
			</Button>
		</div>
		<silence-form :data="caseInfo" :prefix="'case.base.'" :strategy="baseStrat"></silence-form>
		<smart-modal title="进件信息"
			:value="modals[modalName]"
			@input="toggleModal(modalName)"
			:height="640"
			@close-by-confirm='fetchCaseInfo(caseInfo.id)'>
			<base-material-form v-if="modals[modalName]" :customerId="caseInfo.customerId" :id="caseInfo.id">
			</base-material-form>
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
	import baseMaterialForm from './baseMaterialForm'
	import {translate as tLoanInvest} from "@/components/form/loanInvestTree"

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('credit/caseInfo')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		mixins:[panelable],
		components: {
			svuPanel,
			smartModal,
			silenceForm,
			baseMaterialForm
		},
		props: {
			name: {
				type: String
			}
		},
		data() {
			return {
				// 业务相关
				modalName: 'caseInfo',
				baseStrat: Strategy.NULL
			}
		},
		computed: {
			...mapState({
				caseInfo: "caseInfo"
			}),
			...mapDetailState({
				modals: "modals"
			})
		},
		methods: {
			...mapActions([
				"fetchCaseInfo"
			]),
			...mapDetailMutations([
				"showModal",
				"toggleModal"
			])
		},
		mounted() {
			var rateKeys = ["applyRate", "overdueRate", "overdueRateFlow", "repeatRateFlow", ""]

			Dict.get([
				"productType", "busMode", "rateType", "paybackType", "guaranteeType",
				"reciveNode", "feeBase", "feeRateType",
				"cstType"
			]).then(dicts => {
				this.baseStrat = new Strategy([
					{ type: "Dict", dicts: dicts },
					{ execute: value => value + " %", rule: rateKeys },
					{ execute: value => value + " 月", rule: "applyTerm" },
					{ execute: value => tLoanInvest(value), rule: "loanInvest" },
				])
			})
		}
	}
</script>
