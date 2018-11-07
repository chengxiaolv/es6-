<template>
    <div class="svu-detail-overview-container">
        <div class="svu-detail-overview-header">
            <h3 class="info-username">{{cInfo.corpName}}</h3>
            <div class="info-btn-bar">
                <Button type="primary" shape="circle">认证报告</Button>
                <Button type="primary" shape="circle">{{cstSortText}}</Button>
                <Button type="primary" shape="circle" @click='showRelationModal = true'>关联关系</Button>
                <Button type="primary" shape="circle">{{integrityFormat}}</Button>
            </div>
            <!-- 关联关系列表 -->
            <smart-modal v-model="showRelationModal" :height="640" :buttons="[]" title="关联关系">
                <cst-relation-list v-if="showRelationModal == true" :customerId="cInfo.customerId"></cst-relation-list>
            </smart-modal>
            <div class="svu-detail-overview">
                <div class="svu-detail-overview-bar">
                    <shield-icon type="phone" size="18"></shield-icon>
                    <span class="info-text">{{cInfo.contactMobile || "未登记"}}</span>

                    <shield-icon type="idcard" size="18"></shield-icon>
                    <span class="info-text">{{cInfo.credNumber || "未登记"}}</span>

                    <shield-icon type="mail" size="18"></shield-icon>
                    <span class="info-text">{{cInfo.email || "未登记"}}</span>
                </div>
                <div class="svu-detail-overview-bar">
                    <shield-icon type="location"></shield-icon>
                    <span class="info-item">{{cInfo.contactAddr || "未登记"}}</span>
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
    import { createNamespacedHelpers } from 'vuex'
    
    const { mapState: mapCorpInfoState } = createNamespacedHelpers('customer/corpInfo')
    const { mapState : mapCustomerInfoState } = createNamespacedHelpers('customer/customerInfo')
    const { mapState : mapCstCheckState } = createNamespacedHelpers('customer/cstCheck')

    export default {
        name: 'personalInfo',
        components:{
            shieldIcon,
            smartModal,
            cstRelationList
        },
        data(){
            return {
                showRelationModal: false,
                cstSort: Dict.NULL
            }
        },
        computed:{
            ...mapCorpInfoState({
                cInfo: "corpInfo"
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
