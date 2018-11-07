<template>
    <div class="svu-detail">
        <Row :gutter="8">
            <Col span="17" class="cont_lf">
                <!-- 综述信息 -->
                <bus-overview type="进件">
                    <template slot="menuBtn">
                        <span v-if="canApproval" class="svu-detail-text-btn" @click="showModal('riskControl')">审批</span>
                        <!-- <span class="svu-detail-text-btn" @click="showMaterialModal = true">微加报告</span> -->
                        <!-- <span class="svu-detail-text-btn" @click="showCstTrackModal = true">文件打印</span> -->
                    </template>
                </bus-overview>
                <!-- 客户所属进件Modal -->
                <spec-case-modal :customerId="baseInfo.customerId"></spec-case-modal>
                <!-- 审批面板 -->
                <Card class="svu-detail-approval-card">
                    <!-- 审批进度 -->
                    <approval-bar></approval-bar>
                    <!-- 风控审批 -->
                    <smart-modal title="风控审批"
                        :value="modals.riskControl"
                        @input="toggleModal('riskControl')"
                        :height="640"
                        @close-by-confirm='fetchApproval'>
                        <risk-control-approval v-if="modals.riskControl"
                            :id="id" :customerId="baseInfo.customerId" :processId="approval.processId">
                        </risk-control-approval>
                    </smart-modal>
                    <!-- 合同签约 -->
                    <smart-modal title="合同签约"
                        :value="modals.sign" 
                        @input="toggleModal('sign')"
                        :height="640"
                        @close-by-confirm='fetchApproval'>
                        <sign-form v-if="modals.sign" :caseId="id" :customerId="baseInfo.customerId"></sign-form>
                    </smart-modal>
                    <!-- 合同审批 -->
                    <smart-modal title="合同审批" 
                        :value="modals.signApproval" 
                        @input="toggleModal('signApproval')"
                        :height="640"
                        @close-by-confirm='fetchApproval'>
                        <sign-approval v-if="modals.signApproval" :caseId="id">
                        </sign-approval>
                    </smart-modal>
                </Card>
                <!-- 业务面板 -->
                <Card class="svu-detail-card">
                    <Collapse v-model="panels" class="svu-detail-group">
                        <!-- 进件信息 -->
                        <case-info-panel name="base"></case-info-panel>
                        <!-- 共借人信息 -->
                        <partener-panel  name="partener" :materialId="id" :customerId="baseInfo.customerId"></partener-panel>
                        <!-- 费用标准 -->
                        <fee-panel name="fee" :dataId="id" :customerId="baseInfo.customerId"></fee-panel>
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
            <Col span="7" class="cont_rh">
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
    import BusCard from '@/components/container/busCard'
    import approvalBar from '@/view/approval/approvalBar'
    import Dict from '@/components/global/dict'
    
    import busOverview from '@/view/overviews/busOverview'
    import caseInfoPanel from '@/view/panels/caseInfoPanel'
    import partenerPanel from '@/view/panels/partenerPanel'
    import feePanel from '@/view/panels/feePanel'
    import approvalPanel from '@/view/panels/approvalPanel'

    import riskControlApproval from '@/view/modals/credit/riskControlApproval'
    import signForm from '@/view/modals/credit/signForm'
    import signApproval from '@/view/modals/credit/signApproval'
    import specCaseModal from '@/view/modals/credit/specCaseModal'

    import cstTrackSc from '@/view/showcases/cstTrackSc'
    import customerInfoSc from '@/view/showcases/customerInfoSc'
    import CstTrackForm from '@/view/customer/components/cstTrackForm'
    
    import store from '@/store'
    import { createNamespacedHelpers } from 'vuex'
    
    const { mapState:mapApState, mapGetters : mapApGetters } = createNamespacedHelpers('approvalProgress')
    const { mapState : mapCaseState } = createNamespacedHelpers('credit/caseInfo')
    const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')
    
    function fetchData(materialId){
        return Promise.all([
            Dict.get([
                "productType", "busMode", "rateType", "paybackType", "guaranteeType",
                "reciveNode", "feeBase", "feeRateType",
                "cstType"
            ]),
            store.dispatch("credit/caseInfo/fetchCaseInfo", materialId),
            store.dispatch("credit/signInfo/fetchSignInfoByCaseId", materialId),
            store.dispatch("credit/partener/fetchPartener", {caseId: materialId}),
            store.dispatch("credit/fee/fetchFee", {dataId: materialId}),
            store.dispatch("credit/approval/fetchApproval", {dataId: materialId}),
            store.dispatch("approvalProgress/fetch", materialId)
        ]).then(args => {
            var [, {data: caseData}] = args,
                customerId = caseData.cstCase.customerId
            
            store.commit("detail/setCurCustomerId", customerId)
            store.dispatch("credit/busInfo/fetchBusInfo", customerId),
            store.dispatch("customer/customerInfo/fetchCustomerInfo", customerId)
            store.dispatch("customer/cstTrack/fetchCstTrack", customerId)

            return args
        })
    }

    export default {
        components: {
            // 业务视图
            busOverview,
            caseInfoPanel,
            partenerPanel,
            feePanel,
            approvalPanel,
            specCaseModal,
            // 基础组件
            smartModal,
            BusCard,
            // 审批视图
            approvalBar,
            riskControlApproval,
            signForm,
            signApproval,
            // 小橱窗
            cstTrackSc,
            customerInfoSc,
            CstTrackForm
        },
        data(){
            return {
                // 组件状态
                panels: [],
                showRiskControlModal: false,
                showSignModal: false,
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
            ...mapApState(["approval"]),
            ...mapApGetters(["canApproval"]),
            ...mapCaseState({
                baseInfo: "caseInfo"
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
                store.dispatch("approvalProgress/fetch", this.id)
            }
        },
        beforeRouteEnter (to, from, next) {
            fetchData(to.params.id)
                .then(args => {
                    next(vm => vm.fillData(args))
                })
        },
        // when route changes and this component is already rendered,
        // the logic will be slightly different.
        beforeRouteUpdate (to, from, next) {
            fetchData(to.params.id)
                .then(args => {
                    this.fillData(args)
                    next()
                })
        }
    }
</script>
