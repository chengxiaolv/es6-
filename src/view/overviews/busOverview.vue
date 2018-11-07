<template>
    <div class="svu-detail-overview-container">
        <Row>
            <Col span="12">
                <div class="overview-code">{{type}}编号:{{serialNumber ? serialNumber : caseInfo.id | upper}}</div>
            </Col>
            <Col span="12">
                <spec-stage-bar style="float: right; margin: 5px 16px 0 0;"></spec-stage-bar>
            </Col>
        </Row>
        <Row>
            <Col span="5" style="position: relative;">
                <div class="overview-icon">
                    <shield-icon type="mail" size="56"></shield-icon>
                    <div class="overview-icon-title">{{type}}信息</div>
                </div>
            </Col>
            <Col span="19">
                <div class="svu-detail-overview-header">
                    <h3 class="info-username">{{caseInfo.projectName}}</h3>
                    <div class="info-btn-bar">
                        <Button type="primary" shape="circle">风控检查报告</Button>
                        <Button type="primary" shape="circle">认证报告</Button>
                        <Button type="primary" shape="circle">反欺诈报告</Button>
                    </div>
                    <div class="svu-detail-overview">
                        <div class="svu-detail-overview-bar">
                            <shield-icon type="chaopiao" size="18"></shield-icon>
                            <span class="info-text">{{signInfo.amount / 10000 | currency}}万</span>
                            
                            <shield-icon type="rili" size="18"></shield-icon>
                            <span class="info-text">{{signInfo.term}}月</span>

                            <shield-icon type="gupiao" size="18"></shield-icon>
                            <span class="info-text">{{signInfo.rate}}%</span>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        <div class="svu-detail-overview-menu">
            <slot name="menuBtn"></slot>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    $materialC: #68A3ED;
    
    .overview-code{
        margin: 8px 0 0 32px;
        color: $c-in-active-font;
    }

    .overview-icon{
        border: 3px solid $materialC;
        border-radius: 50%;
        height: 100px;
        width: 100px;
        margin:0 0 0 32px;
        position: relative;
        top: 20px;
        text-align: center;
        font-weight: bold;

        .iconfont{
            line-height: 100px;  
            color: $materialC; 
        }

        .overview-icon-title{
            position: relative;
            color: $materialC;
            font-size: 14px;
            font-weight: bold;
        }
    }
</style>
<script>
    import shieldIcon from '@/components/icon'
    import specStageBar from '@/view/materials/components/specStageBar'
    import { createNamespacedHelpers } from 'vuex'

    const { mapState : mapCaseState } = createNamespacedHelpers('credit/caseInfo')
    const { mapState : mapSignInfoState } = createNamespacedHelpers('credit/signInfo')

    export default {
        name: 'materialInfo',
        components:{
            shieldIcon,
            specStageBar
        },
        props: {
            type: {
                type: String,
                required: true
            },
            serialNumber:{
                type: String,
                default: ''
            }
        },
        computed:{
            ...mapCaseState({
                caseInfo: "caseInfo"
            }),
            ...mapSignInfoState({
                signInfo: "signInfo"
            })
        },
        methods: {
            
        }
    }
</script>