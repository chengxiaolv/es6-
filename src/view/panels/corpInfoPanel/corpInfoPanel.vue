<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
        <div class="svu-detail-panel-title" slot="header">
            <span>企业基本信息</span>
            <Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small" 
            	@click.stop="showModal('corpInfo')">
                修改
            </Button>
        </div>
        <silence-form :data="corpInfoForShow" :prefix="'corp.base.'" :strategy="baseStrat"></silence-form>
        <smart-modal v-if="corpInfo.customerId" title="企业基本信息"
        	:value="modals[modalName]"
        	@input="toggleModal(modalName)"
        	@close-by-confirm='fetchCorpInfo(corpInfo.customerId)' :height="640">
            <corp-form v-if="modals[modalName]" :customerId="corpInfo.customerId"></corp-form>
        </smart-modal>
    </svu-panel>
</template>
<script>
	import { panelable, Panel as svuPanel } from '@/components/container/panel'
	import { silenceForm, Strategy} from '@/components/form/silenceForm'
	import { createNamespacedHelpers } from 'vuex'
	import Dict from '@/components/global/dict'
	import Constant from '@/components/global/constant'
	import smartModal from '@/components/smartModal'
	import {translate as tLoanInvest} from '@/components/form/loanInvestTree'
	import corpForm from './corpForm'

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/corpInfo')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		mixins:[panelable],
		components: {
			svuPanel,
			smartModal,
			silenceForm,
			corpForm
		},
		props: {
			name: {
				type: String
			}
		},
		data() {
			return {
				// 业务相关
				modalName: 'corpInfo',
				baseStrat: Strategy.NULL
			}
		},
		computed: {
			...mapState({
				corpInfo: "corpInfo"
			}),
			...mapGetters({
				corpInfoForShow: "corpInfoForShow"
			}),
			...mapDetailState({
				modals: "modals"
			})
		},
		methods: {
			...mapActions([
				"fetchCorpInfo"
			]),
			...mapDetailMutations([
				"showModal",
				"toggleModal"
			])
		},
		mounted() {
			Dict.get([
				"productType", "busMode", "rateType", "paybackType", "guaranteeType",
				"reciveNode", "feeBase", "feeRateType",
				"cstType","corpType","regType","credTypePersonal","sourceFrom"
			]).then(dicts => {
				// 处理法人证件类型
				dicts.placeId = dicts.sourceFrom
				// 处理信息来源
				dicts.legalCredType = dicts.credTypePersonal

				this.baseStrat = new Strategy([
					{ type: "Dict", dicts: dicts},		
					{ type:"Constant",constant: Constant.get("yseOrNo"), rule:"groupCustomer"},
					{ type:"Area",options: [], rule: "cityId" },
					{ execute: value => tLoanInvest(value), rule: "category" }
				])
			})
		}
	}
</script>
