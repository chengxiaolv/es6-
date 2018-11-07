<template>
	<div class="editform">
		<!-- <Row>
			<Col span="24">
				<top-bar
					:total.sync="relation.total" :pageSize.sync="relation.pageSize" :pageNo.sync="relation.pageNo">
                </top-bar>
			</Col>
		</Row> -->
		<!--<Row>
			<Col span='24'>
				<Table class="inner-table"
					:loading="loading" 
					:columns="columns" 
					:data="relation.list"  
					:height='450'>
				</Table>
			</Col>
		</Row>-->
        <Table :columns="certifiReportColumns" :data="certifiList"></Table>
	</div>
</template>
<script>

import Dict from '@/components/global/dict'

import {mapCell} from '@/components/grid/renderCell'

export default {
	name: "certificationReport",
	
	data() {
		return {
			loading: true,
			relation:{
                pageNo: 1,
                pageSize: 20,
                total: 0,
                list: []
            },
			certifiReportColumns: [   
                    {
                        title: '序号',
                        key: 'number'
                    },
                    {
                        title: '认证内容',
                        key: 'certifiContent'
                    },
                    {
                        title: '核查结果',
                        key: 'result'
                    },
                    {
                        title: '备注',
                        key: 'tips'
                    }
            ],
            certifiList: [
                    {
                        number: '1',
                        certifiContent: '身份审查',
                        result: '一致',
                        tips: '姓名/身份核查一致'
                    },
                    {
                        number: '2',
                        certifiContent: '身份审查',
                        result: '一致',
                        tips: '姓名/身份核查一致'
                    },
                    {
                        number: '3',
                        certifiContent: '身份审查',
                        result: '一致',
                        tips: '姓名/身份核查一致'
                    },
                    {
                        number: '4',
                        certifiContent: '身份审查',
                        result: '一致',
                        tips: '姓名/身份核查一致'
                    }
                    
                ],
			socialRelationType: Dict.NULL
		}
	},
	created() {
		// Promise.all([Dict.get("socialRelationType"), this.fetch()])
		// 	.then(args => {
		// 		var [groups] = args

		// 		Object.assign(this, groups)
		// 		this.columns = createColumns(this)
		// 	})
	},
	methods: {
		// fetch(){
		// 	this.loading = true
		//     return cstRelationList(this.customerId)
        //             .then(res => {
        //                 // var pageData = res.data.page
        //                 // this.relation.total = parseInt(pageData.totalCount)
        //                 // this.relation.list = pageData.list
        //                 this.relation.list = res.data.list
        //                 this.loading = false
        //             })
		// },
		// careerAction(h, data) {
		// 	var { row, column, index } = data
		// 	return h('div', [
		// 		h('Button', {
		// 			props: {
		// 				type: 'text',
		// 				size: 'small'
		// 			},
		// 			on: {
		// 				click: () => {
		// 					cstRelationDelete(row.id).then((res) => {
		// 						this.$Message.success('Success!')
		// 						this.fetch()
		// 					}).catch((res) => {
		// 						this.$Message.success('Fail!')
		// 					})
		// 				}
		// 			}
		// 		}, '删除')
		// 	])
		// },
	}
}

</script>
