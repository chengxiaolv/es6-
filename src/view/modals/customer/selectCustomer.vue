<template>
	<Form class="svu-select-customer" ref="cst">
		<Row>
			<Col span="16">
				<top-bar
					:total.sync="customer.total" :pageSize.sync="customer.pageSize" :pageNo.sync="customer.pageNo">
                    <!-- 分页 -->
                </top-bar>
			</Col>
			<Col span="8">
				<grid-searcher style="float: right"
                    placeholder="客户名称/证件号码"
                    v-model="searchValue"
                    @search="fetch">
                </grid-searcher>
			</Col>
		</Row>
		<Row>
			<Col span='24'>
				<Table class="select-table" ref="mt"
					highlight-row
			        :columns="columns"
			        :data="customer.list"
			        :loading="loading"
			        :height='300'>
			    </Table>
			</Col>
		</Row>
	</Form>
</template>
<style>
	.svu-select-customer{
		.svu-pager{
			float: left;
		}
	}
</style>
<style lang='scss' scoped>
	.select-table{
		margin-top: 16px;
	}
</style>
<script>
	import gridSearcher from '@/components/grid/searcher'
	import topBar from '@/components/grid/top-bar'
	import {customerList} from '@/api/customer'

	export default{
		components: {
			gridSearcher,
			topBar
		},
		inject: {
	        $modal: { default: null }
	    },
		data(){
			return {
				loading: true,
				customerId: '',
				searchValue: '',
				customer: {
	                pageNo: 1,
	                pageSize: 20,
	                total: 0,
	                list: []
	            },
	            value: null
			}
		},
		computed: {
			columns() {
				return [
					{
			            title: '客户名称',
			            key: 'userName'
			        },
			        {
			            title: '证件号码',
			            key: 'credNumber'
			        },
					{
						title: '操作',
						key: 'action',
						align: 'center',
						render: this.careerAction
					}
				]
			}
		},
		methods:{
			fetch(){
				this.loading = true

	            return customerList(this.customer.pageNo, this.customer.pageSize, this.searchValue)
	                .then(res => {
	                    var pageData = res.data.page
						this.customer.total = parseInt(pageData.totalCount)
						this.customer.list = pageData.list

						var defaultRow = this.customer.list.find(v => v.id == this.customerId)
						if(defaultRow){
							defaultRow._highlight = true
						}

	                    this.loading = false
					})
			},
			setData(val){
				if(val.length > 0){
					this.customerId = val[0].value
				}
				this.fetch()
			},
			careerAction(h, data) {
				var { row, column, index } = data

				return h('div', [
					h('Button', {
						props: {
							type: 'text',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {
								this.value = {value: row.id, text: row.userName}
								this.$emit("close", this.value)
							}
						}
					}, '选择')
				])
			}
		}
	}
</script>