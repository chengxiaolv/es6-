<template>
    <div class="editform">
        <Form ref="sInfo" :model="sInfo" :rules="ruleValidate" :label-width="100">
            <Row>
                <Col span="24">
                <FormItem label="股东姓名:" prop="userName">
                    <Input v-model="sInfo.userName" placeholder="股东姓名"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <FormItem label="股东类型">
                    <RadioGroup v-model="sInfo.shareholderType">
                        <Radio v-for="(item, index) in shareholderTypeList" :label="item.id">{{item.text}}</Radio>
                    </RadioGroup>
                </FormItem>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="证件类型：" prop="credType">
                    <Select v-model="sInfo.credType">
                        <Option v-for="item in credTypePersonalList" :value="item.id">{{item.text}}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="证件号码：" prop="credNumber">
                    <Input v-model="sInfo.credNumber" placeholder="证件号码"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="出资方式" prop="investType">
                    <CheckboxGroup v-model="invest">
                        <Checkbox v-for="(item,index) in investTypeList" :label="item.text"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="出资金额:" prop="investAmount">
                    <input-number v-model="sInfo.investAmount" placeholder="请输入出资金额">
                        <span slot="append">元</span>
                    </input-number>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="股权比例:" prop="percent">
                    <Input v-model="sInfo.percent" placeholder="请输入正确的股权比例（%）">
                    <span slot="append">%</span>
                    </Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="出资日期：">
                    <DatePicker v-model="investDateMask" format="yyyy-MM-dd" type="date" placeholder="请选择出资日期"></DatePicker>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="备注：">
                    <Input v-model="sInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="200字以内"></Input>
                </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
import { getShareholderInfo, shareholderSave, shareholderUpdate, shareholderDelete } from '@/api/customer'
import Dict from '@/components/global/dict'
import { ymd } from '@/libs/util'
import inputNumber from '@/components/form/inputNumber'
import { tel, createPersonCredNumber, rate } from '@/components/global/validate'
export default {
    name: "shareholderInfo",
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
    components: {
        inputNumber
    },
    data() {
        return {
            sInfo: {
                id: '',
                customerId: '',
                userName: "",
                shareholderType: "",
                credType: "",
                credNumber: "",
                investType: [],
                investAmount: "",
                percent: "",
                investDate: "",
                remark: ""
            },
            credTypePersonal: Dict.NULL,
            shareholderType: Dict.NULL,
            investType: Dict.NULL,
            ruleValidate: {
                userName: [
                    { required: true, message: '所在单位必填', trigger: 'blur' }
                ],
                credNumber: [
                    { required: true, message: '证件号码必填', trigger: 'blur' }
                ],
                percent: [
                    { required: true, message: '股权比例必填' },
                    { validator: rate, trigger: 'blur' }
                ],
                credType: [
                    { required: true, message: '请选择证件类型', trigger: 'blur' }
                ],
                credNumber: [
                    { required: true, message: '请输入证件号码', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        invest: {
            get() {
                return JSON.safeParse(this.sInfo.investType) || []
            },
            set(v) {
                this.sInfo.investType = JSON.stringify(v) || ''
            }
        },
        investDateMask: {
            get() {
                return this.sInfo.investDate ? new Date(this.sInfo.investDate) : ''
            },
            set(val) {
                this.sInfo.investDate = ymd(val)
            }
        },
        investTypeList() {
            return this.investType.val()
        },
        shareholderTypeList() {
            return this.shareholderType.val()
        },
        credTypePersonalList() {
            return this.credTypePersonal.val()
        }
    },

    methods: {
        fetch() {
            return Promise.resolve()
                .then(res => {
                    if (this.id) {
                        return getShareholderInfo(this.id).then(res => {
                            console.log(res)
                            Object.keys(this.sInfo).forEach(name => this.sInfo[name] = res.data.cstCorpShareholder[name])
                        })
                    } else {
                        this.sInfo.customerId = this.customerId
                        delete this.sInfo.id
                    }
                })
        }
    },
    created() {
        this.ruleValidate.credNumber.push({ validator: createPersonCredNumber(this.sInfo), trigger: 'blur' })
    },
    mounted() {
        var $sInfo = this.$refs.sInfo

        this.$modal.onBtnClick("confirm", (next, options) => {
            $sInfo.validate(valid => {
                if (valid) {
                    Promise.resolve()
                        .then(() => {
                            return this.id ? shareholderUpdate(this.sInfo) : shareholderSave(this.sInfo)
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
                    Dict.get(["credTypePersonal", "shareholderType", "investType"]),
                    this.fetch()
                ])
                .then(args => {
                    this.credTypePersonal = args[0].credTypePersonal
                    this.shareholderType = args[0].shareholderType
                    this.investType = args[0].investType
                    // 记得调用next触发下一步，否则Modal窗口不会显示内容
                    next()
                })
        })
    }
}

</script>
