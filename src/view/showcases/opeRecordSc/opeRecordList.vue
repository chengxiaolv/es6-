<template>
    <Row>
        <Col span="4">
            <timeline style="width: 100px; height: 475px; margin: 20px auto 0;" ref="yms"
                :value.sync="curYearMonth" :multiple="false">
                <timeline-item v-for='(item, index) in ymRecords' :name="item.name">
                    <span style="color: #AEB8BB;">
                        {{item.name.length < 4 ? item.name + "月" : item.name + "年"}}
                    </span>
                </timeline-item>
            </timeline>
        </Col>
        <Col span="10">
            <timeline style="width: 360px; height: 475px; margin: 20px auto 0;" ref="days"
                :value.sync="curDay" :multiple="false">
                <timeline-item v-for='(item, index) in ymdRecords' :name="item.name">
                    <Row>
                        <Col span="4" class="ope-name"
                            :class="{large: item.ymd.length < 5}">
                            {{item.ymd.length < 5 ? item.ymd + "年" : item.ymd.slice(5, 10)}}
                        </Col>
                        <Col span="20">
                            <Row v-for='(day) in item.value'>
                                <Col span="8" style="color: #AEB8BB;">
                                    {{day.time}}
                                </Col>
                                <Col span="16" class="ope-title" 
                                    :class="{active: curDt == day.dt}"
                                    @click.native="showContent(day)">
                                    {{day.title}}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </timeline-item>
            </timeline>
        </Col>
        <Col span="10">
            <div class="ope-content">
                <div v-for="(t, i) in curContent">
                    {{t}}
                </div>
            </div>
        </div>
        </Col>
    </Row>
</template>
<style lang="scss" scoped>
    .ope-content{
        margin-top: 20px;
    }
    .ope-title{
        cursor: pointer;

        &.active{
            color: $c-primary;
        }
    }
    .ope-name{
        color: #AEB8BB;

        &.large{
            color: black;
            position: relative;
            top: -4px;
            font-size: 16px;
            font-weight: bold;
        }
    }
</style>
<script>
    import { bushChangeList } from '@/api/customer'
    import { ymdL } from '@/libs/util'
    import { createNamespacedHelpers } from 'vuex'

    const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('opeRecord')

    export default {
        name: "opeRecordList",
        props: {
            
        },
        data() {
            return {
                curYearMonth: [],
                curDay: [],
                now: new Date(),
                curContent: [],
                curDt: ''
            }
        },
        computed:{
            ...mapState({
                records: "records"
            }),
            parsedRecords(){
                var pre = '',
                    groups = {},
                    results = []

                results = this.records
                    // 解析日期
                    .map(v => {
                        var r = {
                            dt: ymdL(v.createTime),
                            title: v.title,
                            content: v.content
                        }

                        r.ym = r.dt.slice(0, 7)
                        r.ymd = r.dt.slice(0, 10)
                        r.year = r.dt.slice(0, 4)
                        r.month = r.dt.slice(5, 7)
                        r.day = r.dt.slice(8, 10)
                        r.time = r.dt.slice(11)

                        return r
                    })

                // 增加年份
                results.forEach((v, i, data) => {
                    if(pre != v.year){
                        data.splice(i, 0, {
                            ym: v.year,
                            ymd: v.year,
                            year: v.year
                        })

                        pre = v.year
                    }
                })

                return results
            },
            ymRecords(){
                var groups = {},
                    results = []
                // 按年月分组
                groups = this.parsedRecords.groupBy("ym")

                // 返回最终结果
                Object.keys(groups).forEach(ym => {
                    var list = groups[ym]
                    
                    if(ym.length < 5){
                        // 仅年份
                        results.push({
                            name: ym
                        })
                    }else{
                        results.push({
                            name: ym.slice(5)
                        })
                    }
                })

                return results
            },
            ymdRecords(){
                var groups = {},
                    results = []

                // 按年月日分组
                groups = this.parsedRecords.groupBy("ymd")

                // 返回最终结果
                var preYm = '',
                    ym = ''

                Object.keys(groups).forEach(ymd => {
                    var list = groups[ymd]
                    
                    if(ymd.length < 5){
                        // 仅年份
                        results.push({
                            name: ymd,
                            ymd,
                            list: []
                        })
                    }else{
                        // 到天
                        ym = ymd.slice(0, 7)
                        results.push({
                            name: ym == preYm ? ymd : ym,
                            ymd,
                            value: list
                        })
                        preYm = ym
                    }
                })

                return results
            }
        },
        methods: {
            showContent(data){
                this.curDt = data.dt
                this.curContent = data.content
            }
        },
        mounted(){
            this.$refs.days.bindNavigator(this.$refs.yms)
        }
    }
</script>
