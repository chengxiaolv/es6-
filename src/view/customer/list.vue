<template>
    <div class="customer-page">
        <Card shadow>
            <div slot="title" class="card-header">
                <top-bar :total.sync="customer.total" :pageSize.sync="customer.pageSize" :pageNo.sync="customer.pageNo">
                    <Button type="primary" size="large" @click='showAddCustomer = true'>新增</Button>
                    <smart-modal title="新增客户" v-model="showAddCustomer" :height="510" @close-by-confirm='fetch'>
                        <add-customer v-if="showAddCustomer"></add-customer>
                    </smart-modal>
                </top-bar>
            </div>
            <Row>
                <Col span='16'>
                    <Button class='view-btn' size="small" :type="viewIndex == 0 ? 'primary' : 'text'" @click="switchView(0)">全部</Button>
                    <Button class='view-btn' size="small" :type="viewIndex == 1 ? 'primary' : 'text'" @click="switchView(1)">个人</Button>
                    <Button class='view-btn' size="small" :type="viewIndex == 2 ? 'primary' : 'text'" @click="switchView(2)">企业</Button>
                    <Dropdown>
                        <Button type="text">
                            更多
                            <shield-icon type="arrow-down"></shield-icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem>微加业务</DropdownItem>
                            <DropdownItem>小胖熊</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Button class='view-btn' size="small" :type="'text'" @click="addView">
                        <shield-icon type="plus-circled"></shield-icon>
                        定义查询方案
                    </Button>
                </Col>
                <Col span='8'>
                    <grid-searcher class="customer-search-container"
                        placeholder="客户名称/证件号码"
                        v-model="searchValue"
                        @search="fetch">
                    </grid-searcher>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <Table class="customer-table" ref="mt"
                    :columns="columns" 
                    :data="customer.list" 
                    :loading="loading"
                    :height='mtHeight'>
                </Table>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<style lang='scss' scoped>
	.customer-page {
		background: $c-gray-bg;
		margin: 10px;	
	}
	.card-header{
	 	.w-pager {
	 		line-height: 32px;
	 		float: right;
	 	}
	 }
	.view-btn{
		margin-right: 20px;
	}
    
    .customer-search-container{
        float: right;
    }

    .customer-table {
        margin-top: 10px;
    }
</style>
<script>
import smartModal from '@/components/smartModal'
import shieldIcon from '@/components/icon'
import gridSearcher from '@/components/grid/searcher'
import Dict from '@/components/global/dict'
import {customerList} from '@/api/customer'
import topBar from '@/components/grid/top-bar'
import {anchorCell, mapCell} from '@/components/grid/renderCell'
import addCustomer from './components/addCustomer'

const WINDOW_HEIGHT = document.body.clientHeight

export default {
	components: {
        smartModal,
        gridSearcher,
		topBar,
        shieldIcon,
        addCustomer
	},
	data(){
		return {
            loading: true,
			viewIndex: 0,
			searchValue: '',
			mtHeight: 360,
            customer: {
                pageNo: 1,
                pageSize: 20,
                total: 0,
                list: []
            },
            showAddCustomer: false,
            cstType: Dict.NULL, 
            credTypePersonal: Dict.NULL, 
            credTypeCorp: Dict.NULL,
            cstSort: Dict.NULL, 
            credLevel: Dict.NULL, 
            sourceFrom: Dict.NULL
        }
    },
    computed:{
        columns(){
            return [
                {
                    type: 'index',
                    width: 60,
                    align: 'center',
                    title: '序号'
                },
                {
                    title: '客户名称',
                    key: 'userName',
                    render: anchorCell({
                        click: (row, column, index) => {
                            if(this.cstType){
                                var type = this.cstType.val(row.cstType) || ""
                                
                                if(type.indexOf("个人") >= 0){
                                    this.$router.push({
                                        name: 'personal-detail',
                                        params: {
                                            id: row.id
                                        }
                                    })
                                }
                                
                                if(type.indexOf("企业") >= 0){
                                    this.$router.push({
                                        name: 'corp-detail',
                                        params: {
                                            id: row.id
                                        }
                                    })
                                }
                            }
                        }
                    })
                },
                {
                    title: '客户类型',
                    key: 'cstType',
                    render: mapCell(this.cstType.val())
                },
                {
                    title: '证件号码',
                    key: 'credNumber'
                },
                {
                    title: '联系电话',
                    key: 'contactMobile'
                },
                {
                    title: '客户分类',
                    key: 'cstSort',
                    render: mapCell(this.cstSort.val())
                },
                {
                    title: '客户经理',
                    key: 'managerUserName'
                },
                {
                    title: '合作渠道',
                    key: 'sourceFrom',
                    render: mapCell(this.sourceFrom.val())
                }
            ]
        }
    },
    methods: {
        switchView(view) {
            this.viewIndex = view
            this.fetch()
        },
        addView() {
            console.log('定义查询方案')
        },
        fetch() {
            this.loading = true

            var filter = {}
            // 个人客户
            if(this.viewIndex == 1){
                filter.cstType = this.cstType.find(v => v.text == "个人客户").id
            }
            // 企业客户
            if(this.viewIndex == 2){
                filter.cstType = this.cstType.find(v => v.text == "企业客户").id
            }

            return customerList(this.customer.pageNo, this.customer.pageSize, this.searchValue, filter)
                .then(res => {
                    var pageData = res.data.page
					this.customer.total = parseInt(pageData.totalCount)
					this.customer.list = pageData.list
                    this.loading = false
				})
		}
	},
	created(){
        Promise.all([
                Dict.get(["cstType", "credTypePersonal", "credTypeCorp", "cstSort", "credLevel", "sourceFrom"]), 
                this.fetch()
            ])
            .then(args => {
                var [groups] = args

                Object.keys(groups).forEach(name => this.$data[name] = groups[name])
            })
	},
	mounted(){
		var me = this
        this.$watch(function(){
                return this.customer.pageNo + " " + this.customer.pageSize
            }, function(){
                this.fetch()
            })

		this.$nextTick(() => {
			var mt = this.$refs.mt
			me.mtHeight = WINDOW_HEIGHT - mt.$el.getBoundingClientRect().top - 30
		})
	}
}

</script>
