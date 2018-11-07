<template>
	<Row>
		<Col span="8">
			<slot>&nbsp;</slot>
		</Col>
		<Col span="16">
			<div class="svu-pager clearfix">
				<Page :total="total" show-sizer show-elevator show-total size="small"
					:current="pageNo"
					:page-size="pageSize"
					@on-page-size-change="onPageSizeChange"
					@update:current="onCurrentChange">
				</Page>
			</div>
		</Col>
	</Row>
</template>
<style lang='scss'>
	.svu-pager {
		line-height: 32px;
		float: right;
	}
</style>
<script>
	export default {
		props:{
			total: {
				type: Number,
				default: 0
			},
			pageNo: {
				type: Number,
				default: 1
			},
			pageSize:{
				type: Number,
				default: 20
			},
			pagerClass:{
				type: String,
				default: ''
			}
		},
		methods:{
			onPageSizeChange(size){
				this.$emit("update:pageSize", size)
			},
			onCurrentChange(current){
				this.$emit("update:pageNo", current)
			}
		}
	}
</script>