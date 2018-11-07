<template>
	<Form class="svu-select-user" ref="userF">
		<Row>
			<Col span="16">
			<top-bar :total.sync="user.total" :pageSize.sync="user.pageSize" :pageNo.sync="user.pageNo">
				<!-- 分页 -->
			</top-bar>
			</Col>
			<Col span="8">
			<grid-searcher style="float: right" placeholder="业务员名称/登陆账号" v-model="searchValue" @search="fetch">
			</grid-searcher>
			</Col>
		</Row>
		<Row>
			<Col span='24'>
			<Table class="select-table" ref="mt" highlight-row 
				:columns="columns" :data="user.list" :loading="loading" :height='300'>
			</Table>
			</Col>
		</Row>
	</Form>
</template>
<style>
	.svu-select-user {
		.svu-pager {
			float: left;
		}
	}

	</style>
	<style lang='scss' scoped>
	.select-table {
		margin-top: 16px;
	}
</style>
<script>
import gridSearcher from '@/components/grid/searcher'
import topBar from '@/components/grid/top-bar'
import { getUserList } from '@/api/user'

export default {
	components: {
		gridSearcher,
		topBar
	},
	data() {
		return {
			loading: true,
			searchValue: '',
			user: {
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
			return [{
					title: '业务员名称',
					key: 'nickName'
				},
				{
					title: '登陆账号',
					key: 'userName'
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
	methods: {
		fetch() {
			this.loading = true

			return getUserList(this.user.pageNo, this.user.pageSize, this.searchValue)
				.then(res => {
					var pageData = res.data.page
					this.user.total = parseInt(pageData.totalCount)
					this.user.list = pageData.list

					var defaultRow = this.user.list.find(v => v.id == this.userId)
					if (defaultRow) {
						defaultRow._highlight = true
					}

					this.loading = false
				})
		},
		setData(val) {
			if (val.length > 0) {
				this.userId = val[0].value
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
							this.value = { value: row.id, text: row.nickName }
							this.$emit("close", this.value)
						}
					}
				}, '选择')
			])
		}
	},
	created() {
		this.fetch()
	}
}

</script>
