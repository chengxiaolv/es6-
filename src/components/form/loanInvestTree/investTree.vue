<template>
    <Tree :data="data" :render="render" @on-select="onSelect"></Tree>
</template>
<script>
	import investItem from './investItem'
	import loanInvestJson from "@/assets/loanInvest"
	import {listToTree} from '@/libs/util'

	export default {
		data(){
			return {
				value: '',
				data: []
			}
		},
		methods:{
			setData(val) {
				if (val.length > 0) {
					this.value = val[0].value
				}

				this.data = listToTree(loanInvestJson.loanUse, "0")
			},
			render(h, { root, node, data }) {
				return h(investItem, {
					props: {
						data
					}
				})
			},
			onSelect(data){
				this.$emit("close", [{
					value: data.id,
					text: data.name
				}])
			}
		}
	}
</script>