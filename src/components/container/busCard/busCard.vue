<template>
	<Card style="margin-bottom: 10px;">
		<div class="bus-card-header" slot="title">
			<shield-icon type="file" size="24" class="bus-card-icon-file"></shield-icon>
			<span>{{title}}</span>
			<shield-icon type="jump" size="20" class="bus-card-icon-jump" @click.native="jump"></shield-icon>
		</div>
		<div class="bus-card-body">
			<slot></slot>
		</div>
	</Card>
</template>
<style scoped>
	.bus-card-header{
		position: relative;
		padding: 0 26px;
		font-size: 16px;
	}
	.bus-card-icon-file{
		color: #2d8cf0;
		position: absolute;
		left: 0;
		top: 0;
		margin-top: -4px;
	}
	.bus-card-icon-jump{
		color: #dddee1;
		position: absolute;
		right: 0;
		top: 0;
		margin-top: -2px;
		cursor: pointer;
	}
	.bus-card-icon-jump:hover{
		color: #2d8cf0;
	}
</style>
<script>
	import shieldIcon from '@/components/icon'

	export default {
		components:{
			shieldIcon
		},
		props:{
			title:{
				type: String,
				required: true
			}
		},
		methods:{
			jump(){
				this.$emit("jump")
			}
		}
	}
</script>