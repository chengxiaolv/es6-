<template>
	<div class="clearfix">
		<form action="" style="padding: 0; maring: 0;" ref="searchForm">
			<div class='svu-searcher-wrapper clearfix' :style="groupStyle">
				<shield-icon type="search" class="svu-searcher-icon" style="left: 8px;"></shield-icon>
				<Input elementId='grid-searcher-input'
					:value='searchValue' 
					:placeholder="placeholder" 
					:clearable="true"
					@input="onInput" >
				</Input>
				<Button type='primary' class="svu-searcher-btn" @click='search'>搜索</Button>
			</div>
		</form>
	</div>
</template>
<style lang='scss'>
	#grid-searcher-input {
	    border-right: 0;
	    border-radius: 0;
	    padding: 0 57px 0 32px;
	}
	.svu-searcher-wrapper{
		position: relative;
		display: inline-block;
    	vertical-align: middle;

    	.ivu-input-icon{
	    	right: 57px;
	    }
	}
	.svu-searcher-icon{
		font-size:16px; 
		line-height: 16px;
		position: absolute;
		top: 50%;
		margin-top: -8px;
		padding: 0;
		z-index: 2;
		color: $c-in-active-font;
	}
	.svu-searcher-btn{
		position: absolute;
		right: 0;
		top: 0;
		border-radius: 0;
	}
</style>
<script>
	import shieldIcon from '@/components/icon'

	export default {
		components: {
			shieldIcon
		},
		model: {
			prop: 'searchValue',
			event: 'input'
		},
		props:{
			searchValue: String,
			placeholder: {
				type: String,
				default: ''
			},
			width: {
				type: Number,
				default: 292
			}
		},
		computed:{
			groupStyle(){
				return {
					width: this.width + "px"
				}
			}
		},
		methods:{
			onInput(value){
				this.$emit("input", value)
			},
			search(){
				this.$emit("search")
			}
		},
		mounted() {
			this.$refs.searchForm.onsubmit = this.search
	    }
	}
</script>