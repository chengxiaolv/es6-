<template>
    <div class="svu-detail">
        <Row :gutter="8">
            <Col span="16" class="cont_lf">
                <!-- 综述信息 -->
                <bus-overview :serialNumber="baseInfo.contractCode" type="合同">
                    <template slot="menuBtn">
                        <span v-if="canApproval" class="svu-detail-text-btn" @click="showModal('signApproval')">合同审批</span>
                    </template>
                </bus-overview>
                <!-- 审批面板 -->
                <Card class="svu-detail-approval-card">
                    <approval-bar></approval-bar>
                    <smart-modal title="合同签约"
                        :value="modals.sign" 
                        @input="toggleModal('sign')"
                        :height="640"
                        @close-by-confirm='fetchApproval'>
                        <sign-form v-if="modals.sign" :caseId="baseInfo.caseId" :customerId="baseInfo.customerId"></sign-form>
                    </smart-modal>
                    <!-- 合同审批 -->
                    <smart-modal title="合同审批"
                        :value="modals.signApproval"
                        @input="toggleModal('signApproval')"
                        :height="640"
                        @close-by-confirm='fetchApproval'>
                        <sign-approval v-if="modals.signApproval" :caseId="baseInfo.caseId"></sign-approval>
                    </smart-modal>
                </Card>
                <!-- 业务面板 -->
                <Card class="svu-detail-card">
                    <Collapse v-model="panels" class="svu-detail-group">
                        <!-- 合同信息 -->
                        <sign-info-panel name="base"></sign-info-panel>
                        <!-- 共借人信息 -->
                        <partener-panel name="partener" :materialId="baseInfo.caseId" :customerId="baseInfo.customerId"></partener-panel>
                        <!-- 费用标准 -->
                        <fee-panel name="fee" :dataId="baseInfo.caseId" :customerId="baseInfo.customerId"></fee-panel>
                        <!-- 审批记录 -->
                        <approval-panel name="approval"></approval-panel>
                    </Collapse>
                </Card>
                <!-- 客户跟进Modal -->
                <smart-modal title="客户跟进" 
                    :value="modals.cstTrack" 
                    @input="toggleModal('cstTrack')"
                    :height="640" 
                    :buttons="cstTrackButtons">
                    <cst-track-form v-if="modals.cstTrack" :customerId="baseInfo.customerId"></cst-track-form>
                </smart-modal>
            </Col>
            <Col span="8" class="cont_rh">
                <!-- 业务信息 -->
                <bus-info-sc></bus-info-sc>
                <!-- 客户信息 -->
                <customer-info-sc></customer-info-sc>
                <!-- 客户跟进 -->
                <cst-track-sc></cst-track-sc>
            </Col>
        </Row>
    </div>
</template>
<script>
    import smartModal from '@/components/smartModal'
    import svuPanel from '@/components/container/panel'
    import BusCard from '@/components/container/busCard'
    import approvalBar from '@/view/approval/approvalBar'
    import Dict from '@/components/global/dict'
    import {mapCell, pipeCell} from '@/components/grid/renderCell'

    import busOverview from '@/view/overviews/busOverview'
    import signInfoPanel from '@/view/panels/signInfoPanel'
    import partenerPanel from '@/view/panels/partenerPanel'
    import feePanel from '@/view/panels/feePanel'
    import approvalPanel from '@/view/panels/approvalPanel'

    import cstTrackForm from '@/view/customer/components/cstTrackForm'
    import signForm from '@/view/modals/credit/signForm'
    import signApproval from '@/view/modals/credit/signApproval'
    import cstTrackSc from '@/view/showcases/cstTrackSc'
    import customerInfoSc from '@/view/showcases/customerInfoSc'
    import busInfoSc from '@/view/showcases/busInfoSc'

    import store from '@/store'
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters : mapApGetters } = createNamespacedHelpers('approvalProgress')
    const { mapState : mapSignState } = createNamespacedHelpers('credit/signInfo')
    const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

    function fetchData(contractId, materialId){
        return Promise.all([
            Dict.get([
                "productType", "busMode", "rateType", "paybackType", "guaranteeType", 
                "reciveNode", "feeBase", "feeRateType", "cstType"
            ]),
            store.dispatch("credit/signInfo/fetchSignInfo", contractId),
            store.dispatch("credit/caseInfo/fetchCaseInfo", materialId),
            store.dispatch("credit/partener/fetchPartener", {caseId: materialId}),
            store.dispatch("credit/fee/fetchFee", {dataId: materialId}),
            store.dispatch("credit/approval/fetchApproval", {dataId: materialId}),
            store.dispatch("approvalProgress/fetch", materialId),
            store.commit("detail/hideAllModal")
        ]).then(args =>{
            var [, {data: caseData}] = args,
                customerId = caseData.map.customerId
            
            store.commit("detail/setCurCustomerId", customerId)
            store.dispatch("credit/busInfo/fetchBusInfo", customerId),
            store.dispatch("customer/customerInfo/fetchCustomerInfo", customerId)
            store.dispatch("customer/cstTrack/fetchCstTrack", customerId),
            store.dispatch("customer/account/fetchAccountList", {customerId})

            return args
        })
    }
    
    export default {
        components: {
            svuPanel,
            smartModal,
            BusCard,
            approvalBar,
            signApproval,
            busOverview,
            signInfoPanel,
            partenerPanel,
            feePanel,
            approvalPanel,
            signForm,
            cstTrackForm,
            // 小橱窗
            cstTrackSc,
            customerInfoSc,
            busInfoSc
        },
        data(){
            return {
                // 组件状态
                panels: [],
                showContractApprovalModal: false,
                showSignApprovalModel: false,
                showCstTrackModal:false,
                // 基础信息
                id: '',
                //字典值
                cstType:Dict.NULL,
                cstTrackButtons:[
                    {type: "primary", text: "添加跟进", name: "addTrack"},
                    {type: "text", text: "取消", name: "cancel"}
                ], 
            }
        },
        computed:{
            ...mapApGetters(["canApproval"]),
            ...mapSignState({
                baseInfo: "signInfo"
            }),
            ...mapDetailState({
                modals: "modals"
            }),
            cstTypeList(){
                return this.cstType.val()
            },
        },
        methods:{
            ...mapDetailMutations([
                "hideAllModal",
                "showModal",
                "toggleModal"
            ]),
            fillData(args){
                this.id = this.$route.params.id

                var [dicts] = args
                this.hideAllModal()
                Object.assign(this, dicts)
            },
            fetchApproval(){
                store.dispatch("approvalProgress/fetch", this.baseInfo.caseId)
            },
            customerInfoJump(){
                var $cInfo = this.$refs.cInfo
                var personalCusType = this.cstTypeList.find(v => v.text == "个人客户")
                if(personalCusType.id == $cInfo.customerInfo.cstType){//个人用户
                    this.$router.push({
                        name: 'personal-detail',
                        params: {
                            id: this.baseInfo.customerId
                        }
                    })
                }else{//企业用户
                    this.$router.push({
                        name: 'corp-detail',
                        params: {
                            id: this.baseInfo.customerId
                        }
                    })
                }
            },
        },
        beforeRouteEnter (to, from, next) {
            fetchData(to.params.id, to.params.caseId)
                .then(args => {
                    next(vm => vm.fillData(args))
                })
        },
        // when route changes and this component is already rendered,
        // the logic will be slightly different.
        beforeRouteUpdate (to, from, next) {
            fetchData(to.params.id, to.params.caseId)
                .then(args => {
                    this.fillData(args)
                    next()
                })
        }
    }
</script>