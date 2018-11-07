<template>
	<svu-panel class="panel-info" :name="name" ref="p">
        <div class="p-title" slot="header">
            <span>合同信息</span>
        </div>
        <silence-form :data="signInfo" :prefix="'sign.base.'" :strategy="baseStrat"></silence-form>
    </svu-panel>
</template>
<script>
	import { panelable, Panel as svuPanel } from '@/components/container/panel'
	import { silenceForm, Strategy } from '@/components/form/silenceForm'
	import { createNamespacedHelpers } from 'vuex'
	import Dict from '@/components/global/dict'
	import Constant from '@/components/global/constant'
	import {translate as tLoanInvest} from "@/components/form/loanInvestTree"

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('credit/signInfo')
	const { mapState: mapAccountState } = createNamespacedHelpers('customer/account')

	export default {
		mixins:[panelable],
		components: {
			svuPanel,
			silenceForm
		},
		props: {
			name: {
				type: String
			}
		},
		data() {
			return {
				// 业务相关
				baseStrat: Strategy.NULL
			}
		},
		computed: {
			...mapGetters({
				signInfo: "signInfoForShow"
			}),
			...mapAccountState({
				account: "account"
			})
		},
		mounted() {
			Dict.get([
				"productType", "busMode", "rateType", "paybackType", "guaranteeType", 
                "feeBase", "feeRateType", "contractStat", "paymentType", "cstType"
			]).then(dicts => {
				var currencyKeys = ["amount"],
					rateKeys = ["rate", "overdueRateFlow", "repeatRateFlow"],
					boolKeys = ["notice", "recycle"],
					accountKeys = ["loanAccount", "receiveAccount", "repaymentAccount"]

				this.baseStrat = new Strategy([
					{ type: "Dict", dicts: dicts },
					{ type: "Currency", rule: currencyKeys },
					{ type: "Constant", constant: Constant.get("yseOrNo"), rule: boolKeys},
					{ execute: value => {
							var t = this.account.list.find(v => v.id == value)
							
							return t ? t.cardNumber : value
						}, rule: accountKeys},
					{ execute: value => value + " %", rule: rateKeys },
					{ execute: value => tLoanInvest(value), rule: "loanInvest" },
					{ execute: value => value + " 元", rule: currencyKeys },
					{ execute: value => value + " 月", rule: "term" }
				])
			})
		}
	}
</script>
