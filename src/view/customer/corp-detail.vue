<template>
    <div class="svu-detail">
        <Row :gutter="8">
            <Col span="17" class="cont_lf">
            <corp-info :cInfo="corpInfo">
                <template slot="menuBtn">
                    <span class="svu-detail-text-btn" @click="showModal('funcs')">完善信息</span>
                    <span class="svu-detail-text-btn" @click="showModal('material')">新增业务</span>
                    <span class="svu-detail-text-btn" @click="showModal('finance')">财务报表</span>
                    <span class="svu-detail-text-btn" @click="showModal('relation')">关联关系</span>
                    <span class="svu-detail-text-btn" @click="showModal('cstTrack')">客户跟进</span>
                    <span class="svu-detail-text-btn" @click="showModal('cstType')">客户分类</span>
                </template>
            </corp-info>
            <!-- 完善信息Modal -->
            <smart-modal title="完善信息" ref="funcsModal"
                :value="modals.funcs" @input="toggleModal('funcs')" 
                :height="640" :buttons="[]">
                <Row :gutter="32">
                    <Col span="6" v-for="(item, i) in funcs" >
                        <div class="svu-detail-func-block" @click="funcClick(item.action)">{{item.text}}</div>
                    </Col>
                </Row>
            </smart-modal>
            <!-- 新增业务Modal -->
            <smart-modal title="新增业务"
                :value="modals.material" @input="toggleModal('material')" 
                :height="640">
                <add-material-form v-if="modals.material"></add-material-form>
            </smart-modal>
            <!-- 财务报表 -->
            <smart-modal title="财务报表"
                :value="modals.finance" @input="toggleModal('finance')" 
                :height="640" :buttons="[]">
                <fianace-form v-if="modals.finance" :dataId="corpInfo.customerId"></fianace-form>
            </smart-modal>
            <!-- 关联关系Modal -->
            <smart-modal title="关联关系"
                :value="modals.relation" @input="toggleModal('relation')" 
                :height="640">
                <cst-relation-form v-if="modals.relation" 
                    :customerId="corpInfo.customerId" :userName="corpInfo.corpName">
                </cst-relation-form>
            </smart-modal>
            <!-- 客户跟进Modal -->
            <smart-modal title="客户跟进"
                :value="modals.cstTrack" @input="toggleModal('cstTrack')"
                :height="640" :buttons="cstTrackButtons">
                <cst-track-form v-if="modals.cstTrack" :customerId="corpInfo.customerId"></cst-track-form>
            </smart-modal>
            <!-- 客户分类Modal -->
            <smart-modal title="客户分类" 
                :value="modals.cstType" @input="toggleModal('cstType')"
                :height="640">
                <cst-type-form v-if="modals.cstType" :customerId="corpInfo.customerId"></cst-type-form>
            </smart-modal>
            <!-- 业务面板 -->
            <Card class="svu-detail-card">
                <Collapse v-model="panels" class="svu-detail-group">
                    <!-- 客户基本信息 -->
                    <corp-info-panel name="base"></corp-info-panel>
                    <!-- 账户管理面板 -->
                    <account-panel name="account" :customerId='customerId'></account-panel>
                    <!-- 股东信息 -->
                    <shareholder-panel name="shareholder" :customerId="customerId"></shareholder-panel>
                    <!-- 高管信息 -->
                    <executive-panel name="executive" :customerId="customerId"></executive-panel>
                    <!-- 上市信息 -->
                    <listed-info-panel name="listedInfo" :customerId="customerId"></listed-info-panel>
                    <!-- 对外担保情况 -->
                    <guarantee-panel name="guarantee" :customerId="customerId"></guarantee-panel>
                    <!-- 对外投资 -->
                    <investabroad-panel name="investabroad" :customerId="customerId"></investabroad-panel>
                    <!-- 仓库信息 -->
                    <store-manage-panel name="storeManage" :customerId="customerId"></store-manage-panel>
                    <!-- 企业重大信息变更 -->
                    <major-change-panel name="majorChange" :customerId="customerId"></major-change-panel>
                    <!-- 产品产能情况 -->
                    <product-capacity-panel name = "productCapacity" :customerId="customerId"></product-capacity-panel>
                </Collapse>
            </Card>
            </Col>
            <Col span="7" class="cont_rh">
                <!-- 业务信息 -->
                <bus-info-sc></bus-info-sc>
                <!-- 操作记录 -->
                <ope-record-sc></ope-record-sc>
                <!-- 客户跟进 -->
                <cst-track-sc></cst-track-sc>
            </Col>
        </Row>
    </div>
</template>
<script>
import smartModal from '@/components/smartModal'
import svuPanel from '@/components/container/panel'
import corpInfo from './components/corp/corpInfo'

import { guaranteeDelete, investabroadDelete, storeManageDelete } from '@/api/customer'
import { getExecutiveInfo, getGuaranteeInfo, getExecutiveList, getGuaranteeList, getInvestabroadList, getStoreManageList } from '@/api/customer'
import Dict from '@/components/global/dict'
import CstTrackForm from './components/cstTrackForm'
import CstTypeForm from './components/cstTypeForm'
import cstRelationForm from './components/cstRelationForm'
import addMaterialForm from '@/view/materials/components/addMaterialForm'
import { silenceForm, Strategy } from '@/components/form/silenceForm'
import { mapCell,pipeCell } from '@/components/grid/renderCell'


import fianaceForm from '@/view/modals/customer/fianaceForm'

// panels
import corpInfoPanel from '@/view/panels/corpInfoPanel'
import accountPanel from '@/view/panels/accountPanel'
import shareholderPanel from '@/view/panels/shareholderPanel'
import executivePanel from '@/view/panels/executivePanel'
import listedInfoPanel from '@/view/panels/listedInfoPanel'
import guaranteePanel from '@/view/panels/guaranteePanel'
import investabroadPanel from '@/view/panels/investabroadPanel'
import storeManagePanel from '@/view/panels/storeManagePanel'
import majorChangePanel from '@/view/panels/majorChangePanel'
import productCapacityPanel from '@/view/panels/productCapacity'


// showcases
import busInfoSc from '@/view/showcases/busInfoSc'
import opeRecordSc from '@/view/showcases/opeRecordSc'
import cstTrackSc from '@/view/showcases/cstTrackSc'

import store from '@/store'
import { createNamespacedHelpers } from 'vuex'

const { mapState: mapCorpInfoState } = createNamespacedHelpers('customer/corpInfo')
const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

function fetchData(customerId) {
    store.commit("detail/setCurCustomerId", customerId)
    
    return Promise.all([
        Dict.get([
            "educationLevel", "relationType","changeType"
        ]),
        store.dispatch("customer/corpInfo/fetchCorpInfo", customerId),
        store.dispatch("customer/customerInfo/fetchCustomerInfo", customerId),
        store.dispatch("customer/account/fetchAccountList", {customerId}),
        store.dispatch("customer/shareholder/fetchShareholderList", { customerId }),
        store.dispatch("customer/executive/fetchExecutiveList", { customerId }),
        store.dispatch("customer/listedInfo/fetchListedInfoList", { customerId }),
        store.dispatch("customer/guarantee/fetchGuaranteeList", { customerId }),
        store.dispatch("customer/investabroad/fetchInvestabroadList", { customerId }),
        store.dispatch("customer/storeManage/fetchStoreManageList", { customerId }),
        store.dispatch("credit/busInfo/fetchBusInfo", customerId),
        store.dispatch("opeRecord/fetchOpeRecord", customerId),
        store.dispatch("customer/cstTrack/fetchCstTrack", customerId),
        store.dispatch("customer/cstCheck/fetchCstCheck", customerId),
        store.dispatch("customer/majorChange/fetchMajorChangeList", customerId),
        store.dispatch("customer/productCapacity/fetchProductCapacityList", customerId),
    ])
}

export default {
    components: {
        svuPanel,
        smartModal,

        CstTrackForm,
        CstTypeForm,
        cstRelationForm,
        addMaterialForm,
        corpInfo,
        fianaceForm,

        corpInfoPanel,
        accountPanel,
        shareholderPanel,
        executivePanel,
        listedInfoPanel,
        guaranteePanel,
        investabroadPanel,
        storeManagePanel,
        majorChangePanel,
        productCapacityPanel,

        busInfoSc,
        opeRecordSc,
        cstTrackSc
    },
    data() {
        return {
            funcs: [
                { 
                    text: "基本信息", 
                    action: function(){
                        this.showModal('corpInfo')
                    }
                },
                {
                    text: "股东信息",
                    action: function() {
                        this.setCurShareholderId('')
                        this.showModal('shareholder')
                    }
                },
                {
                    text: "高管信息",
                    action: function() {
                        this.setCurExecutiveId('')
                        this.showModal('executive')
                    }
                },
                {
                    text: "上市信息",
                    action: function() {
                        this.setCurListedInfoId('')
                        this.showModal('listedInfo')
                    }
                },
                {
                    text: "对外担保情况",
                    action: function() {
                        this.setCurGuaranteeId('')
                        this.showModal('guarantee')
                    }
                },
                {
                    text: "对外投资",
                    action: function() {
                        this.setCurInvestabroadId('')
                        this.showModal('investabroad')
                    }
                },
                {
                    text: "仓库信息",
                    action: function() {
                        this.setCurStoreManageId('')
                        this.showModal('storeManage')
                    }
                },
                {
                    text: "企业重大变更",
                    action: function() {
                        this.setCurMajorChangeId('')
                        this.showModal('majorChange')
                    }
                },
                 {
                    text: "产品产能情况",
                    action: function() {
                        this.setProductCapacityId('')
                        this.showModal('productCapacity')
                    }
                }
            ],

            customerId: '',
            panels: [],

            cstTrackButtons:[
                {type: "primary", text: "添加跟进", name: "addTrack"},
                {type: "text", text: "取消", name: "cancel"}
            ],  

            baseStrat: Strategy.NULL,
            relationType: Dict.NULL,
            educationLevel: Dict.NULL,
            changeType:Dict.NULL
        }
    },
    computed: {
        ...mapCorpInfoState({
            corpInfo: "corpInfo"
        }),
        ...mapDetailState({
            modals: "modals"
        })
    },
    beforeRouteEnter(to, from, next) {
        fetchData(to.params.id)
            .then(args => {
                next(vm => vm.fillData(args))
            })
    },

    beforeRouteUpdate(to, from, next) {
        fetchData(to.params.id)
            .then(args => {
                this.fillData(args)
                next()
            })
    },
    methods: {
        ...mapDetailMutations([
            "hideAllModal",
            "showModal",
            "toggleModal",
            "setCurShareholderId",
            "setCurExecutiveId",
            "setCurListedInfoId",
            "setCurGuaranteeId",
            "setCurInvestabroadId",
            "setCurStoreManageId",
            "setCurMajorChangeId",
            "setCurProductCapacityId"
        ]),
        fillData(args) {
            this.customerId = this.$route.params.id

            var [dicts] = args

            this.baseStrat = new Strategy([{ type: "Dict", dicts: dicts }])
            this.hideAllModal()
            Object.assign(this, dicts)
            this.relationType = dicts.relationType
            this.educationLevel = dicts.educationLevel
            this.changeType = dicts.changeTypes
        },
        funcClick(action) {
            // console.log("funcClick " + action)
            var funcsModal = this.$refs.funcsModal

            funcsModal.close()
            if (typeof action == "string") {
                this[action] = true
            }

            if (typeof action == "function") {
                action.call(this)
            }
        }
    }
}
</script>
