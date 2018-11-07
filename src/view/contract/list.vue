<template>
    <div class="contract-page">
        <Card shadow>
            <div slot="title" class="card-header">
                <top-bar :total.sync="contract.total" :pageSize.sync="contract.pageSize" :pageNo.sync="contract.pageNo"></top-bar>
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
                <grid-searcher class="contract-search-container" placeholder="客户名称/合同编号" v-model="searchValue" @search="fetch">
                </grid-searcher>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <Table class="contract-table" ref="mt"
                    :columns="columns" 
                    :loading="loading"
                    :data="contract.list"  
                    :height='mtHeight'>
                </Table>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<style lang='scss' scoped>
    .contract-page {
        background: $c-gray-bg;
        margin: 10px;
    }

    .card-header {
        .w-pager {
            line-height: 32px;
            float: right;
        }
    }

    .view-btn {
        margin-right: 20px;
    }

    .contract-search-container {
        float: right;
    }

    .contract-table {
        margin-top: 10px;
    }
</style>
<script>
    import shieldIcon from '@/components/icon'
    import gridSearcher from '@/components/grid/searcher'
    import Dict from '@/components/global/dict'
    import { contractList } from '@/api/contract'
    import topBar from '@/components/grid/top-bar'
    import { anchorCell, mapCell, pipeCell } from '@/components/grid/renderCell'

    const WINDOW_HEIGHT = document.body.clientHeight

    export default {
        components: {
            gridSearcher,
            topBar,
            shieldIcon
        },
        data() {
            return {
                loading: true,
                viewIndex: 0,
                searchValue: '',
                mtHeight: 360,
                contract: {
                    pageNo: 1,
                    pageSize: 20,
                    total: 0,
                    list: []
                },
                cstType: Dict.NULL,
                contractStat: Dict.NULL
            }
        },
        computed: {
            columns() {
                return [{
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
                                var type = this.cstType.val(row.cstType) || ""

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
                        title: '项目名称',
                        key: 'projectName',
                        render: anchorCell({
                            click: (row, column, index) => {
                                this.$router.push({
                                    name: 'contract-detail',
                                    params: {
                                        id: row.contractId,
                                        caseId: row.caseId
                                    }
                                })
                        }
                        })
                    },
                    {
                        title: '合同编号',
                        key: 'contractCode'
                    },
                    {
                        title: '合同金额(元)',
                        key: 'amount',
                        render: pipeCell("currency")
                    },
                    {
                        title: '放款金额(元)',
                        key: 'loanAmount',
                        render: pipeCell("currency")
                    },
                    {
                        title: '放款申请日期',
                        key: 'startDate',
                        render: pipeCell("ymd")
                    },
                    {
                        title: '合同状态',
                        key: 'contractStat'
                    },
                    {
                        title: '经办人',
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
                if (this.viewIndex == 1) {
                    filter.cstType = this.cstType.find(v => v.text == "个人客户").id
                }
                // 企业客户
                if (this.viewIndex == 2) {
                    filter.cstType = this.cstType.find(v => v.text == "企业客户").id
                }
                return contractList(this.contract.pageNo, this.contract.pageSize, this.searchValue, filter)
                    .then(res => {
                        var pageData = res.data.page
                        this.contract.total = parseInt(pageData.totalCount)
                        this.contract.list = pageData.list
                        this.loading = false
                    })
            }
        },
        created() {
            Promise.all([
                    Dict.get(["cstType", "contractStat"]), 
                    this.fetch()
                ])
                .then(args => {
                    var [groups] = args
                    Object.assign(this, groups)
                })
        },
        mounted() {
            var me = this

            this.$watch(function() {
                return this.contract.pageNo + " " + this.contract.pageSize
            }, function() {
                this.fetch()
            })

            this.$nextTick(() => {
                var mt = this.$refs.mt
                me.mtHeight = WINDOW_HEIGHT - mt.$el.getBoundingClientRect().top - 30
            })
        }
    }
</script>
