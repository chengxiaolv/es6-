<template>
    <div class="svu-detail">
        <Row :gutter="8">
            <Col span="17" class="cont_lf">
                <!-- 个人客户信息 -->
                <personal-info :pInfo="baseInfo">
                    <template slot="menuBtn">
                        <span class="svu-detail-text-btn" @click="showModal('funcs')">完善信息</span>
                        <span class="svu-detail-text-btn" @click="showModal('material')">新增业务</span>
                        <!-- <span class="svu-detail-text-btn" @click="showGradelModal = true">发起评级</span> -->
                        <!-- <span class="svu-detail-text-btn" @click="showReposalModal = true">发起授信</span> -->
                        <span class="svu-detail-text-btn" @click="showModal('relation')">关联关系</span>
                        <span class="svu-detail-text-btn" @click="showModal('cstTrack')">客户跟进</span>
                        <span class="svu-detail-text-btn" @click="showModal('cstType')">客户分类</span>
                    </template>
                </personal-info>
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
                <!-- 发起评级Modal -->
                <!-- <smart-modal title="评级申请" v-model="showGradelModal" :height="640">
                    <grade-form v-if="showGradelModal"></grade-form>
                </smart-modal> -->
                <!-- 发起授信Modal -->
                <!-- <smart-modal title="授信申请" v-model="showReposalModal" :height="640">
                    <resposal-from v-if="showReposalModal"></resposal-from>
                </smart-modal> -->
                <!-- 关联关系Modal -->
                <smart-modal title="关联关系" 
                    :value="modals.relation" @input="toggleModal('relation')" 
                    :height="640">
                    <cst-relation-form v-if="modals.relation" 
                        :customerId="baseInfo.customerId" :userName="baseInfo.userName">
                    </cst-relation-form>
                </smart-modal>
                <!-- 客户跟进Modal -->
                <smart-modal title="客户跟进" 
                    :value="modals.cstTrack" @input="toggleModal('cstTrack')"
                    :height="640" :buttons="cstTrackButtons">
                    <cst-track-form v-if="modals.cstTrack" :customerId="baseInfo.customerId"></cst-track-form>
                </smart-modal>
                <!-- 客户分类Modal -->
                <smart-modal title="客户分类" 
                    :value="modals.cstType" @input="toggleModal('cstType')"
                    :height="640">
                    <cst-type-form v-if="modals.cstType" :customerId="baseInfo.customerId"></cst-type-form>
                </smart-modal>
                <!-- 客户所属进件Modal -->
                <spec-case-modal :customerId="baseInfo.customerId"></spec-case-modal>
                <!-- 业务面板 -->
                <Card class="svu-detail-card">
                    <!-- 折叠组 -->
                    <Collapse v-model="panels" class="svu-detail-group">
                        <!-- 基本信息面板 -->
                        <personal-info-panel name="base"></personal-info-panel>
                        <!-- 职业信息面板 -->
                        <career-panel name="career" :customerId='baseInfo.customerId'></career-panel>
                        <!-- 收支信息面板 -->
                        <income-panel name="income" :customerId='baseInfo.customerId'></income-panel>
                        <!-- 社会关系面板 -->
                        <social-relationship-panel name="socialRelationship" :customerId='baseInfo.customerId'></social-relationship-panel>
                        <!-- 账户管理面板 -->
                        <account-panel name="account" :customerId='baseInfo.customerId'></account-panel>
                        <!-- 个人信用信息面板 -->
                        <credit-panel name="credit" :customerId='baseInfo.customerId'></credit-panel>
                         <!-- 资产信息面板 -->
                        <assets-panel name="assets" :customerId='baseInfo.customerId'></assets-panel>
                        <!-- 流动资产面板 -->
                        <current-assets-panel name="currentAssets" :customerId='baseInfo.customerId'></current-assets-panel>
                        <!-- 负债信息面板 -->
                        <personal-debt-panel name="PersonalDebt" :customerId='baseInfo.customerId'></personal-debt-panel>
                        <!-- 个人名下企业面板 -->
                        <personal-corp-panel name="PersonalCorp" :customerId='baseInfo.customerId'></personal-corp-panel>
                    </Collapse>
                </Card>
            </Col>
            <!-- 右侧便捷看板 -->
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

    import personalInfo from './components/personal/personalInfo'
    import CstTrackForm from './components/cstTrackForm'
    import CstTypeForm from './components/cstTypeForm'
    import cstRelationForm from './components/cstRelationForm'
    import addMaterialForm from '@/view/materials/components/addMaterialForm'
    import specCaseModal from '@/view/modals/credit/specCaseModal'
    
    import Dict from '@/components/global/dict'
    import Constant from '@/components/global/constant'
    import {mapCell} from '@/components/grid/renderCell'
    
    import personalInfoPanel from '@/view/panels/personalInfoPanel'
    import careerPanel from '@/view/panels/careerPanel'
    import incomePanel from '@/view/panels/incomePanel'
    import socialRelationshipPanel from '@/view/panels/socialRelationshipPanel'
    import accountPanel from '@/view/panels/accountPanel'
    import creditPanel from '@/view/panels/creditPanel'
    import assetsPanel from '@/view/panels/assetsPanel'
    import currentAssetsPanel from '@/view/panels/currentAssetsPanel'
    import personalDebtPanel from '@/view/panels/personalDebtPanel'
    import personalCorpPanel from '@/view/panels/personalCorpPanel'

    import busInfoSc from '@/view/showcases/busInfoSc'
    import opeRecordSc from '@/view/showcases/opeRecordSc'
    import cstTrackSc from '@/view/showcases/cstTrackSc'

    import store from '@/store'
    import { createNamespacedHelpers } from 'vuex'

    const { mapState : mapPersonalInfoState } = createNamespacedHelpers('customer/personalInfo')
    const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

    function fetchData(customerId){
        store.commit("detail/setCurCustomerId", customerId)

        return Promise.all([
            Dict.get([
                "cstType", "relationType","credTypePersonal","maritalStat","nation","livingStat",
                "politicalStat","healthStat","educationLevel","creditStat","accountUse","creditStat",
                "assetsType","flowAssetsType","debtType","corpType"
            ]),
            store.dispatch("customer/personalInfo/fetchPersonalInfo", customerId),
            store.dispatch("customer/customerInfo/fetchCustomerInfo", customerId),
            store.dispatch("customer/incomeInfo/fetchIncomeInfo", customerId),
            store.dispatch("customer/creditInfo/fetchCreditInfo", customerId),
            store.dispatch("customer/career/fetchCareer", {customerId}),
            store.dispatch("customer/socialRelationship/fetchSocialRelationship", {customerId}),
            store.dispatch("customer/account/fetchAccountList", {customerId}),
            store.dispatch("customer/assets/fetchAssetsList", {customerId}),
            store.dispatch("customer/currentAssets/fetchCurrentAssetsList", {customerId}),
            store.dispatch("customer/personalDebt/fetchPersonalDebtList", {customerId}),
            store.dispatch("customer/personalCorp/fetchPersonalCorpList", {customerId}),
            store.dispatch("credit/busInfo/fetchBusInfo", customerId),
            store.dispatch("opeRecord/fetchOpeRecord", customerId),
            store.dispatch("customer/cstTrack/fetchCstTrack", customerId),
            store.dispatch("customer/cstCheck/fetchCstCheck", customerId)
        ])
    }

    export default {
        components: {
            personalInfoPanel,
            careerPanel,
            incomePanel,
            socialRelationshipPanel,
            accountPanel,
            creditPanel,
            assetsPanel,
            currentAssetsPanel,
            personalDebtPanel,
            personalCorpPanel,
            specCaseModal,

            svuPanel,
            smartModal,
            personalInfo,
            CstTrackForm,
            CstTypeForm,
            cstRelationForm,
            addMaterialForm,
            
            busInfoSc,
            opeRecordSc,
            cstTrackSc
        },
        data(){
            return {
                funcs: [
                    {
                        text: "基本信息", 
                        action: function(){
                            this.showModal("personalInfo")
                        }
                    },{
                        text: "职业信息",
                        action: function(){
                            this.setCurCareerId('')
                            this.showModal('career')
                        }
                    },{
                        text: "收支情况", 
                        action: function(){
                            this.showModal("income")
                        }
                    },{
                        text: "社会关系", 
                        action: function(){
                            this.setCurSocialRelationshipId('')
                            this.showModal("socialRelationship")
                        }
                    },{
                        text: "账户管理", 
                        action: function(){
                            this.setCurAccountId('')
                            this.showModal("account")
                        }
                    },{
                        text: "信用情况", 
                        action: function(){
                            this.showModal("credit")
                        }
                    },{
                        text: "资产信息", 
                        action: function(){
                            this.setCurAssetsId('')
                            this.showModal("assets")
                        }
                    },{
                        text: "流动资产", 
                        action: function(){
                            this.setCurCurrentAssetsId('')
                            this.showModal("currentAssets")
                        }
                    },{
                        text: "负债信息", 
                        action: function(){
                            this.setCurPersonalDebtId('')
                            this.showModal("personalDebt")
                        }
                    },{
                        text: "个人名下企业", 
                        action: function(){
                            this.setCurPersonalCorpId('')
                            this.showModal("personalCorp")
                        }
                    }
                ],
                panels: [],
                customerId: '',

                cstTrackButtons:[
                    {type: "primary", text: "添加跟进", name: "addTrack"},
                    {type: "text", text: "取消", name: "cancel"}
                ],        

                // 字典对象
                relationType:Dict.NULL,
                cstType:Dict.NULL,
                accountUse:Dict.NULL,
                assetsType:Dict.NULL,
                flowAssetsType:Dict.NULL,
                debtType:Dict.NULL,
                corpType:Dict.NULL
            }
        },
        computed:{
            ...mapPersonalInfoState({
                baseInfo : "personalInfo"
            }),
            ...mapDetailState({
                modals: "modals"
            })
        },
        methods:{
            ...mapDetailMutations([
                "hideAllModal",
                "showModal",
                "toggleModal",
                "setCurCareerId",
                "setCurSocialRelationshipId",
                "setCurAccountId",
                "setCurAssetsId",
                "setCurCurrentAssetsId",
                "setCurPersonalDebtId",
                "setCurPersonalCorpId"
            ]),
            fillData(args){
                this.customerId = this.$route.params.id

                var [dicts] = args
                
                // this.baseStrat = new Strategy([
                //     {type: "Dict", dicts: dicts},
                //     {type:"Constant",constant: Constant.get("sex"), rule: "sex"},
                //     {type:"Constant",constant: Constant.get("choise"), rule: ["arrearsTax","arrearsEmployee","arrearsRent"]},
                //     {type:"Area",options: [], rule: "cityId"},
                // ])
                this.hideAllModal()
                Object.assign(this, dicts)
                dicts.credType = dicts.credTypePersonal
            },

            funcClick(action){
                // console.log("funcClick " + action)
                var funcsModal = this.$refs.funcsModal

                funcsModal.close()
                action.call(this)
            }
        },
        beforeRouteEnter (to, from, next) {
            fetchData(to.params.id)
                .then(args => {
                    next(vm => vm.fillData(args))
                })
        },
        beforeRouteUpdate (to, from, next) {
            fetchData(to.params.id)
                .then(args => {
                    this.fillData(args)
                    next()
                })
        }
    }
</script>