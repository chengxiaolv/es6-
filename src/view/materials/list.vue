<template>
    <div class="materials-page">
        <Card shadow>
            <div slot="title" class="card-header">
                <top-bar :total.sync="materials.total" :pageSize.sync="materials.pageSize" :pageNo.sync="materials.pageNo">
                    <Button type="primary" size="large" @click='showAddMaterial = true'>新增</Button>
                    <smart-modal title="新增进件" v-model="showAddMaterial" :height="510" @close-by-confirm='fetch'>
                        <add-material-form v-if="showAddMaterial"></add-material-form>
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
                    <grid-searcher class="materials-search-container"
                        placeholder="客户名称/证件号码"
                        v-model="searchValue"
                        @search="fetch">
                    </grid-searcher>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <Table class="materials-table" ref="mt"
                        :columns="columns" 
                        :data="materials.list" 
                        :loading="loading"
                        :height='mtHeight'>
                    </Table>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<style lang='scss' scoped>
	.materials-page {
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
    
    .materials-search-container{
        float: right;
    }

    .materials-table {
        margin-top: 10px;
    }
</style>
<script>
import smartModal from '@/components/smartModal'
import shieldIcon from '@/components/icon'
import gridSearcher from '@/components/grid/searcher'
import Dict from '@/components/global/dict'
import {materialsList} from '@/api/materials'
import topBar from '@/components/grid/top-bar'
import {anchorCell, mapCell, pipeCell} from '@/components/grid/renderCell'
import addMaterialForm from './components/addMaterialForm'

const WINDOW_HEIGHT = document.body.clientHeight

export default {
	components: {
        smartModal,
        gridSearcher,
		topBar,
        shieldIcon,
        addMaterialForm
	},
	data(){
		return {
            loading: true,
			viewIndex: 0,
			searchValue: '',
			mtHeight: 360,
            materials: {
                pageNo: 1,
                pageSize: 20,
                total: 0,
                list: []
            },
            showAddMaterial: false,
            cstType: Dict.NULL,
            productType: Dict.NULL,
            busMode: Dict.NULL
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
                            var type = row.cstType || ""

                            if(type.indexOf("个人") >= 0){
                                this.$router.push({
                                    name: 'personal-detail',
                                    params: {
                                        id: row.customerId
                                    }
                                })
                            }

                            if(type.indexOf("企业") >= 0){
                                this.$router.push({
                                    name: 'corp-detail',
                                    params: {
                                        id: row.customerId
                                    }
                                })
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
                    title: '项目名称',
                    key: 'projName',
                    render: anchorCell({
                        compile: (row, column, index) => {
                            return row.projectName
                        },
                        click: (row, column, index) => {
                            this.$router.push({
                                name: 'materials-detail',
                                params: {
                                    id: row.id
                                }
                            })
                        }
                    })
                },
                {
                    title: '申请日期',
                    key: 'applyDate'
                },
                {
                    title: '产品类型',
                    key: 'productType',
                    render: mapCell(this.productType.val())
                },
                {
                    title: '申请金额(元)',
                    key: 'applyAmount',
                    render: pipeCell("currency")
                },
                {
                    title: '案件状态',
                    key: 'currStage'
                },
                {
                    title: '办理人',
                    key: 'optrUserName'
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

            return materialsList(this.materials.pageNo, this.materials.pageSize, this.searchValue, filter)
                .then(res => {
                    var pageData = res.data.page
					this.materials.total = parseInt(pageData.totalCount)
					this.materials.list = pageData.list
                    this.loading = false
				})
		}
	},
	created(){
		Promise.all([Dict.get(["cstType", "busMode", "productType"]), this.fetch()])
            .then(args => {
                var [groups] = args
                Object.assign(this, groups)
            })
	},
	mounted(){
		var me = this
        
        this.$watch(function(){
                return this.materials.pageNo + " " + this.materials.pageSize
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
