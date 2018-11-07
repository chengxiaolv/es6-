<template>
    <div class="editform">
        <Form ref="cInfo" :model="cInfo" :rules="ruleValidate" :label-width="140">
            <Row>
                <Col span="24">
                <FormItem label="所在单位:" prop="corpName">
                    <Input v-model="cInfo.corpName" placeholder="所在单位" :maxlength="128"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="单位性质：" prop="corpType">
                    <Select v-model="cInfo.corpType">
                        <Option v-for="item in corpTypeList" :value="item.id">{{item.text}}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="单位电话：" prop="corpTel">
                    <Input v-model="cInfo.corpTel" placeholder="单位电话" :maxlength="32">
                    </Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="工作起始年份：" prop="workStartDateMask">
                    <DatePicker type="year" v-model="workStartDateMask" placeholder="本单位工作起始年份" style="width: 200px"></DatePicker>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="工作结束年份：" prop="workEndDateMask">
                    <DatePicker type="year" v-model="workEndDateMask" placeholder="本单位工作起始年份" style="width: 200px"></DatePicker>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="职业：" prop="career">
                    <Input v-model="cInfo.career" placeholder="职业" :maxlength="64"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="职务：" prop="position">
                    <Input v-model="cInfo.position" placeholder="职务" :maxlength="32"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="单位地址：" prop="corpAddr">
                    <Input v-model="cInfo.corpAddr" placeholder="单位地址" :maxlength="255"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="单位规模：" prop="corpScale">
                    <Select v-model="cInfo.corpScale">
                        <Option v-for="item in corpScaleList" :value="item.id">{{item.text}}</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="月收入：" prop="incomeInMonth">
                    <input-number v-model="cInfo.incomeInMonth" placeholder="月收入" :allowNegative="false" :maxlength="16">
                        <span slot="append">元</span>
                    </input-number>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="现单位工作时间：" prop="howLongWork">
                    <input-number v-model="cInfo.howLongWork" placeholder="现单位工作时间" :allowNegative="false" :allowDecimal="false" :includeThousandsSeparator="false" :maxlength="16">
                        <span slot="append">年</span>
                    </input-number>
                </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
    import { getCareerInfo, careerSave, careerUpdate } from '@/api/customer'
    import Dict from '@/components/global/dict'
    import {phone} from '@/components/global/validate'
    import { ymd } from '@/libs/util'

    export default {
        name: "carrerInfo",
        props: {
            id: String,
            customerId: {
                type: String,
                required: true
            }
        },
        inject: {
            $modal: { default: null }
        },
        data() {
            return {
                cInfo: {
                    id: '',
                    customerId: '',
                    corpName: '',
                    corpType: '',
                    corpTel: '',
                    workStartDate: '',
                    workEndDate: '',
                    career: '',
                    position: '',
                    corpAddr: '',
                    corpScale: '',
                    incomeInMonth: '',
                    howLongWork: ''
                },
                corpTypeList: {},
                corpScaleList: {},
                ruleValidate: {
                    corpName: [
                        { required: true, message: '所在单位必填', trigger: 'blur' }
                    ],
                    corpType: [
                        { required: true, message: '单位性质必填', trigger: 'blur' }
                    ],
                    corpTel:[
                        { validator: phone, trigger: 'blur'}
                    ],
                }
            }
        },
        computed: {
            workStartDateMask: {
                get() {
                    return this.cInfo.workStartDate
                },
                set(val) {
                    this.cInfo.workStartDate = ymd(val).substring(0, 4)
                }
            },
            workEndDateMask: {
                get() {
                    return this.cInfo.workEndDate
                },
                set(val) {
                    this.cInfo.workEndDate = ymd(val).substring(0, 4)
                }
            }
        },
        methods: {
            fetch() {
                return Promise.resolve()
                    .then(res => {
                        if (this.id) {
                            return getCareerInfo(this.id).then(res => {
                                Object.keys(this.cInfo).forEach(name => this.cInfo[name] = res.data.cstPersonalCareer[name])
                            })
                        } else {
                            this.cInfo.customerId = this.customerId
                            delete this.cInfo.id
                        }
                    })
            }
        },
        mounted() {
            var $cInfo = this.$refs.cInfo

            this.$modal.onBtnClick("confirm", (next, options) => {
                $cInfo.validate(valid => {
                    if (valid) {
                        Promise.resolve()
                            .then(() => {
                                return this.id ? careerUpdate(this.cInfo) : careerSave(this.cInfo)
                            })
                            .then( res => this.$Message.success('Success!')
                                , err => options.closeModal = false)
                            .then(res => next())
                    }else{
                        options.closeModal = false
                        next()
                    }
                })
            })

            // 在窗口显示前加载数据
            this.$modal.beforeEnter((next) => {
                Promise.all([
                        Dict.get(["corpType", "corpScale"]),
                        this.fetch()
                    ])
                    .then(args => {
                        var [groups] = args
                        Object.keys(groups).forEach(name => this.$data[name + 'List'] = groups[name].val())
                        next()
                    })
            })
        }
    }

</script>
