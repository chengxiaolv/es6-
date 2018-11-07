<template>
    <div class="svu-detail-overview-container">
        <div class="svu-detail-overview-header">
            <h3 class="info-username">{{pInfo.userName}}</h3>
            <div class="info-btn-bar">
                <Button type="primary" shape="circle" @click='showCertifiModal = true'>认证报告</Button>
                <Button type="primary" shape="circle">{{cstSortText}}</Button>
                <Button type="primary" shape="circle" @click='showRelationModal = true'>关联关系</Button>
                <Button type="primary" shape="circle">{{integrityFormat}}</Button>
            </div>
            <!--认证报告-->
            <smart-modal v-model="showCertifiModal" :height="640" :button="[]" title="认证报告">
                <certification-report v-if="showCertifiModal == true" :customerId="pInfo.customerId"></certification-report>
            </smart-modal>
            <!-- 关联关系列表 -->
            <smart-modal v-model="showRelationModal" :height="640" :buttons="[]" title="关联关系">
                <cst-relation-list v-if="showRelationModal == true" :customerId="pInfo.customerId"></cst-relation-list>
            </smart-modal>
            <div class="svu-detail-overview">
                <div class="svu-detail-overview-bar">
                    <shield-icon type="phone" size="18"></shield-icon>
                    <span class="info-text">{{pInfo.mobile || "未登记"}}</span>

                    <shield-icon type="idcard" size="18"></shield-icon>
                    <span class="info-text">{{pInfo.credNumber || "未登记"}}</span>

                    <shield-icon type="mail" size="18"></shield-icon>
                    <span class="info-text">{{pInfo.email || "未登记"}}</span>
                </div>
                <div class="svu-detail-overview-bar">
                    <shield-icon type="location"></shield-icon>
                    <span class="info-item">{{pInfo.contactAddr || "未登记"}}</span>
                </div>
            </div>
        </div>
        <div class="svu-detail-overview-menu">
            <slot name="menuBtn"></slot>
        </div>
    </div>
</template>
<script>
    import Dict from '@/components/global/dict'
    import shieldIcon from '@/components/icon'
    import smartModal from '@/components/smartModal'
    import cstRelationList from '@/view/customer/components/cstRelationList'
    import certificationReport from '@/view/modals/customer/certificationReport'
    import { createNamespacedHelpers } from 'vuex'

    const { mapState : mapPersonalInfoState } = createNamespacedHelpers('customer/personalInfo')
    const { mapState : mapCustomerInfoState } = createNamespacedHelpers('customer/customerInfo')
    const { mapState : mapCstCheckState } = createNamespacedHelpers('customer/cstCheck')

    export default {
        name: 'personalInfo',
        components:{
            shieldIcon,
            smartModal,
            cstRelationList,
            certificationReport
        },
        data(){
            return {
                showRelationModal: false,
                showCertifiModal:false,
                cstSort: Dict.NULL
            }
        },
        computed:{
            ...mapPersonalInfoState({
                pInfo : "personalInfo"
            }),
            ...mapCstCheckState({
                count: "count"
            }),
            ...mapCustomerInfoState({
                baseInfo: "customerInfo"
            }),
            integrityFormat(){
                return "完整度" + this.count + "%"
            },
            cstSortText(){
                return this.cstSort.val(this.baseInfo.cstSort) || "普通客户"
            }
        },
        methods: {
            
        },
        mounted(){
            Dict.get(["cstSort"]).then(groups => {
                Object.assign(this, groups)
            })
        }
    }
</script>
