<template>
    <smart-modal ref="$modal"
        :title="title"
        :value="modals.specCase" @input="toggleModal('specCase')" 
        :height="640"
        :buttons="[]">
        <Table
            :columns="columns"
            :data="materials.list"
            :loading="loading"
            :height='mtHeight'>
        </Table>
    </smart-modal>
</template>
<script>
    import smartModal from '@/components/smartModal'
    import Dict from '@/components/global/dict'
    import {findBy} from '@/api/materials'
    import {anchorCell, mapCell, pipeCell} from '@/components/grid/renderCell'

    import store from '@/store'
    import { createNamespacedHelpers } from 'vuex'

    const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')
    
    export default {
    	components: {
            smartModal
    	},
        props:{
            customerId: {
                type: String,
                required: true
            }
        },
    	data(){
    		return {
                loading: true,
    			mtHeight: 500,
                materials: {
                    pageNo: 1,
                    pageSize: 20,
                    total: 0,
                    list: []
                },
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
                        title: '项目名称',
                        key: 'projectName',
                        render: anchorCell({
                            click: (row, column, index) => {
                                this.$router.push({
                                    name: 'materials-detail',
                                    params: {
                                        id: row.id
                                    }
                                })
                                this.hideModal("specCase")
                            }
                        })
                    },
                    {
                        title: '项目金额(元)',
                        key: 'applyAmount',
                        render: pipeCell("currency")
                    },
                    {
                        title: '项目期限(月)',
                        key: 'applyTerm'
                    },
                    {
                        title: '登记时间',
                        key: 'regDate'
                    },
                    {
                        title: '办理阶段',
                        key: 'currStage'
                    }
                ]
            },
            ...mapDetailState({
                modals: "modals",
                currStage: "currStage"
            }),
            title(){
                if(this.currStage == "entry"){
                    return '贷前业务'
                }
                if(this.currStage == "sign"){
                    return '贷中业务'
                }
                if(this.currStage == "loan"){
                    return '贷后业务'
                }
            }
        },
        methods: {
            ...mapDetailMutations([
                "hideAllModal",
                "hideModal",
                "toggleModal"
            ]),
            fetch() {
                this.loading = true

                return findBy(this.customerId, this.currStage)
                    .then(res => {
    					this.materials.list = res.data.list || []
                        this.loading = false
    				})
    		}
    	},
    	watch: {
            "modals.specCase": function(val){
                if(val){
                    var me = this
                    
                    this.$refs.$modal.beforeEnter((next) => {
                        Promise.all([
                            Dict.get(["cstType", "busMode", "productType"]), 
                            this.fetch()
                        ])
                        .then(args => {
                            var [groups] = args
                            Object.assign(this, groups)

                            next()
                        })
                    })  
                }
            }
        }
    }

</script>
