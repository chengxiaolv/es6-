<template>
    <Form ref="iInfo" :model="iInfo" :rules="ruleValidate" :label-width="100">
        <FormItem label="投资方：" prop="investSource">
            <Select v-model="iInfo.investSource">
                <Option v-for="(item, index) in investSourceList" :value="item.id" :key="index">{{item.text}}</Option>
            </Select>
        </FormItem>
        <FormItem label="投向企业名称" prop="corpName">
            <Input v-model="iInfo.corpName" placeholder=""></Input>
        </FormItem>
        <FormItem label="社会信用代码" prop="socialCreditCode">
            <Input v-model="iInfo.socialCreditCode" placeholder=""></Input>
        </FormItem>
        <FormItem label="注册资本">
            <input-number v-model="iInfo.regAmount" placeholder="">
                <span slot="append">元</span>
            </input-number>
        </FormItem>
        <FormItem label="出资方式" prop="investType">
            <CheckboxGroup v-model="invest">
                <Checkbox v-for="(item,index) in investTypeList" :label="item.id">{{item.text}}</Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="投资金额" prop="investAmount">
            <input-number v-model="iInfo.investAmount" placeholder="请输入所投金额">
                <span slot="append">元</span>
            </input-number>
        </FormItem>
        <FormItem label="股权比例" prop="percent">
            <input-number v-model="iInfo.percent" :includeThousandsSeparator="false" :value="Number" :min='0' :max='100' placeholder="请输入占投向企业的股权比例">
                <span slot="append">%</span>
            </input-number>
        </FormItem>
        <FormItem label="出资日期">
            <DatePicker type="date" placeholder="请选择出资日期" v-model="investDateMask"></DatePicker>
        </FormItem>
        <FormItem label="备注">
            <Input v-model="iInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="200字以内"></Input>
        </FormItem>
        </Row>
    </Form>
</template>
<script>
import { getCorpInfo, getInvestabroadInfo, investabroadUpdate, investabroadSave } from '@/api/customer'
import Dict from '@/components/global/dict'
import { ymd } from '@/libs/util'
import inputNumber from '@/components/form/inputNumber'
import { socialCode, rate } from '@/components/global/validate'
export default {
    name: "investAbroad",
    inject: {
        $modal: { default: null }
    },
    props: {
        id: String,
        customerId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            iInfo: {
                id: "",
                customerId: "",
                corpName: "",
                socialCreditCode: "",
                investSource: "",
                investType: [],
                investAmount: "",
                percent: "",
                investDate: "",
                regAmount: "",
                remark: ""
            },
            investType: Dict.NULL,
            investSource: Dict.NULL,
            ruleValidate: {
                corpName: [
                    { required: true, message: '投向企业名称必填', trigger: 'blur' },
                    { type: 'string', max: 25, message: '投向企业名称不得超过25个字', trigger: 'blur' }
                ],
                socialCreditCode: [
                    { required: true, message: '社会信用代码必填', trigger: 'blur' },
                    { validator: socialCode, trigger: 'blur' }
                ],
                investType: [
                    { required: true, message: '出资方式必填', trigger: 'blur' }
                ],
                investSource: [
                    { required: true, message: '投资方必填', trigger: 'change' }
                ],
                investAmount: [
                    { required: true, message: '投资金额必填', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        invest: {
            get() {
                return JSON.safeParse(this.iInfo.investType) || []
            },
            set(v) {
                this.iInfo.investType = JSON.stringify(v) || ''
            }
        },
        investDateMask: {
            get() {
                return this.iInfo.investDate ? new Date(this.iInfo.investDate) : ''
            },
            set(val) {
                this.iInfo.investDate = ymd(val)
            }
        },
        investTypeList() {
            return this.investType.val()
        },
        investSourceList() {
            return this.investSource.val()
        }
    },
    methods: {
        fetchInvestabroad() {
            return Promise.resolve()
                .then(res => {
                    if (this.id) {
                        return getInvestabroadInfo(this.id).then(res => {
                            Object.keys(this.iInfo).forEach(name => this.iInfo[name] = res.data.cstCorpInvest[name])
                        })
                    } else {
                        this.iInfo.customerId = this.customerId
                        delete this.iInfo.id
                    }
                })
        }
    },
    created() {
        Promise.all([Dict.get(["investType", "investSource"]), this.fetchInvestabroad()])
            .then(args => {
                var [dicts] = args

                Object.assign(this, dicts)
            })
    },
    mounted() {
        var $iInfo = this.$refs.iInfo

        this.$modal.onBtnClick("confirm", (next, options) => {
            $iInfo.validate(valid => {
                if (valid) {
                    Promise.resolve()
                        .then(() => {
                            return this.id ? investabroadUpdate(this.iInfo) : investabroadSave(this.iInfo)
                        })
                        .then(res => this.$Message.success('Success!'), err => options.closeModal = false)
                        .then(res => next())
                } else {
                    options.closeModal = false
                    next()
                }
            })
        })

        // 数据预加载
        this.$modal.beforeEnter((next) => {
            // api 取数
            Promise.all([
                    Dict.get(["investType"]),
                    this.fetchInvestabroad()
                ])
                .then(args => {
                    this.investType = args[0].investType
                    // 记得调用next触发下一步，否则Modal窗口不会显示内容
                    next()
                })
        })
    }
}

</script>
