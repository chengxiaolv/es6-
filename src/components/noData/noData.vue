<template>
	<div class="svu-nodata">
		222
		{{content}}
	</div>
</template>
<style lang="scss">
	.svu-nodata{
		text-align: center;
		margin: 20px 0;
	}
</style>
<script>
	export default {
		props:{
			content: {
				type: String,
				default: "暂无数据"
			}
		}
	}
</script>