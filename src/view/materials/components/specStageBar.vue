<template>
	<div class="svu-spec-stage-bar">
        客户进件中业务<span class="svu-spec-stage-anchor" @click="showEntry">{{busInfo.applyCount}}</span>笔，
        签约中业务<span class="svu-spec-stage-anchor" @click="showSign">{{busInfo.signCount}}</span>笔，
        贷后中业务<span class="svu-spec-stage-anchor" @click="showLoan">{{busInfo.loanCount}}</span>笔
    </div>
</template>
<style lang="scss">
	.svu-spec-stage-bar{
		font-size: 12px;

		.svu-spec-stage-anchor{
			font-size: 14px;
			text-decoration: underline;
			color: $c-primary;
			cursor: pointer;
			margin: 0 2px;
		}
	}
</style>
<script>
	import { createNamespacedHelpers } from 'vuex'

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('credit/busInfo')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		computed:{
			...mapState({
				busInfo: "busInfo"
			})
		},
		methods:{
			...mapDetailMutations([
                "showModal",
                "setCurrStage"
            ]),
            showEntry(){
            	this.setCurrStage('entry')
            	this.showModal("specCase")
            },
            showSign(){
            	this.setCurrStage('sign')
            	this.showModal("specCase")
            },
            showLoan(){
            	this.setCurrStage('loan')
            	this.showModal("specCase")
            }
		}
	}
</script>