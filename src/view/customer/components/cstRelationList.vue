<template>
	<div class="editform">
		<!-- <Row>
			<Col span="24">
				<top-bar
					:total.sync="relation.total" :pageSize.sync="relation.pageSize" :pageNo.sync="relation.pageNo">
                </top-bar>
			</Col>
		</Row> -->
		<Row>
			<Col span='24'>
				<Table class="inner-table"
					:loading="loading" 
					:columns="columns" 
					:data="relation.list"  
					:height='450'>
				</Table>
			</Col>
		</Row>
	</div>
</template>
<script>
import { cstRelationDelete, cstRelationList } from '@/api/customer'
import Dict from '@/components/global/dict'
// import topBar from '@/components/grid/top-bar'
import {mapCell} from '@/components/grid/renderCell'

function createColumns(vm){
	return [
		{ title: '关联客户名称', key: 'relationName' },
		{ title: '关联关系', key: 'socialRelationType', render: mapCell(vm.socialRelationType.val())},
		{ title: '操作', key: 'action', align: 'center', render: vm.careerAction }
	]
}

export default {
	name: "cstRelationList",
	// components:{
	// 	topBar
	// },
	props: {
		customerId:{
			type: String,
			require: true
		}
	},
	data() {
		return {
			loading: true,
			relation:{
                pageNo: 1,
                pageSize: 20,
                total: 0,
                list: []
            },
			columns: [],
			socialRelationType: Dict.NULL
		}
	},
	created() {
		Promise.all([Dict.get("socialRelationType"), this.fetch()])
			.then(args => {
				var [groups] = args

				Object.assign(this, groups)
				this.columns = createColumns(this)
			})
	},
	methods: {
		fetch(){
			this.loading = true
		    return cstRelationList(this.customerId)
                    .then(res => {
                        // var pageData = res.data.page
                        // this.relation.total = parseInt(pageData.totalCount)
                        // this.relation.list = pageData.list
                        this.relation.list = res.data.list
                        this.loading = false
                    })
		},
		careerAction(h, data) {
			var { row, column, index } = data
			return h('div', [
				h('Button', {
					props: {
						type: 'text',
						size: 'small'
					},
					on: {
						click: () => {
							cstRelationDelete(row.id).then((res) => {
								this.$Message.success('Success!')
								this.fetch()
							}).catch((res) => {
								this.$Message.success('Fail!')
							})
						}
					}
				}, '删除')
			])
		},
	}
}

</script>
