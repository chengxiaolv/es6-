<template>
	<span class="svu-tree-item" @click="handleClick">
		<shield-icon :type="data.isEnd ? 'file' : 'jinjian'"></shield-icon>
		<span>{{data.name}}</span>
	</span>
</template>
<style lang="scss">
	.svu-tree-item{
		cursor: pointer;
	}
</style>
<script>
	import shieldIcon from '@/components/icon'
	import emitter from '@/components/mixins/emitter'

	export default {
		mixins: [emitter],
		components:{
			shieldIcon
		},
		props: {
			data: {
				type: Object,
				required: true
			}
		},
		methods:{
			handleClick(e){
				// 只能选末级
				if(this.data.isEnd){
					this.dispatch('Tree', 'on-select', this.data)
				}
			}
		}
	}
</script>