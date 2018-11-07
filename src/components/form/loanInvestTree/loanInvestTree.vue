<template>
	<lookup v-model="maskVal" :title="'行业分类'">
		<invest-tree></invest-tree>
	</lookup>
</template>
<script>
	import lookup from '@/components/form/lookup'
	import translate from './translate'
	import investTree from './investTree'

	export default {
		name: "loanInvestTree",
		components:{
			lookup,
			investTree
		},
		props:{
			value:{
				type: String,
				default: ''
			}
		},
		computed:{
			maskVal:{
				get(){
					return [{
						text: translate(this.value),
						value: this.value
					}]
				},
				set(val){
					this.$emit("input", val[0].value)
				}
			}
		}
	}
</script>