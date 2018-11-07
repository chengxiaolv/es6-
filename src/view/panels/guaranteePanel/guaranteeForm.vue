<template>
    <Form ref="gInfo" :model="gInfo" :rules="ruleValidate" :label-width="100">
        <FormItem label="客户名称">
            <Input v-model="corpName" placeholder="" disabled></Input>
        </FormItem>
        <FormItem label="被担保人" prop="insuredPerson">
            <Input v-model="gInfo.insuredPerson" placeholder="请输入被担保名称"></Input>
        </FormItem>
        <FormItem label="证件类型：">
            <Select v-model="gInfo.credType">
                <Option v-for="(item,index) in credTypePersonalList" :key="index" :value="item.id">{{item.text}}</Option>
            </Select>
        </FormItem>
        <FormItem label="证件号码" prop="credCode">
            <Input v-model="gInfo.credCode" placeholder="请输入正确的证件号"></Input>
        </FormItem>
        <FormItem label="担保余额(元)" prop="balance">
            <input-number v-model="gInfo.balance" placeholder="请输入担保所剩余额"></input-number>
        </FormItem>
        <FormItem label="债务到期时间" prop="expireDate">
            <DatePicker v-model="investDateMask" type="date" format="yyyy-MM-dd" placeholder="请选择担保到期时间" style="width: 300px"></DatePicker>
        </FormItem>
        <FormItem label="是否互保">
            <RadioGroup v-model="gInfo.reciprocal">
                <Radio v-for="(item,index) in reciprocalList" :label="item.id">{{item.text}}</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="关联关系：">
            <Select v-model="gInfo.relationType">
                <Option v-for="(item,index) in relationTypeList" :key="index" :value="item.id">{{item.text}}</Option>
            </Select>
        </FormItem>
        <FormItem label="反担保措施">
            <Input v-model="gInfo.measure" placeholder="请输入有效的反担保措施"></Input>
        </FormItem>
        <FormItem label="备注">
            <Input v-model="gInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
        </FormItem>
    </Form>
</template>
<script>
    import { getCorpInfo, getGuaranteeInfo, guaranteeUpdate, guaranteeSave } from '@/api/customer'
    import Dict from '@/components/global/dict'
    import { ymd } from '@/libs/util'
    import inputNumver from '@/components/form/inputNumber'
    import { tel, createPersonCredNumber } from '@/components/global/validate'

    export default {
        name: "guaranteeForm",
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
            var data = {
                corpName: "",
                gInfo: {
                    id: "",
                    customerId: "",
                    insuredPerson: "",
                    credType: "",
                    credCode: "",
                    balance: "",
                    expireDate: "",
                    reciprocal: 1,
                    measure: "",
                    remark: "",
                    relationType: ""
                },
                reciprocalList: [{
                    id: 1,
                    text: "是"
                }, {
                    id: 0,
                    text: "否"
                }],
                credTypePersonal: Dict.NULL,
                relationType: Dict.NULL
            }

            data.ruleValidate = {
                insuredPerson: [
                    { required: true, message: '被担保人必填', trigger: 'blur' }
                ],
                balance: [{
                    required: true,
                    message: '担保余额必填',
                    trigger: 'blur'
                }],
                expireDate: [
                    { required: true, message: '债务到期时间必填', trigger: 'blur' }
                ],
                credCode: [
                    { required: true, message: '证件号码必填', trigger: 'blur' },
                    { validator: createPersonCredNumber(data.gInfo), trigger: 'blur' }
                ]
            }

            return data
        },
        computed: {
            investDateMask: {
                get() {
                    return this.gInfo.expireDate ? new Date(this.gInfo.expireDate) : ''
                },
                set(val) {
                    this.gInfo.expireDate = ymd(val)
                }
            },
            credTypePersonalList() {
                return this.credTypePersonal.val()
            },
            relationTypeList() {
                return this.relationType.val()
            }
        },
        methods: {
            fetchCorpName() {
                getCorpInfo(this.customerId).then(res => this.corpName = res.data.cstCorp.corpName)
            },
            fetchGuarantee() {
                return Promise.resolve()
                    .then(res => {
                        if (this.id) {
                            return getGuaranteeInfo(this.id).then(res => {
                                Object.keys(this.gInfo).forEach(name => this.gInfo[name] = res.data.cstCorpPledgeExternal[name])
                            })
                        } else {
                            this.gInfo.customerId = this.customerId
                            delete this.gInfo.id
                        }
                    })
            }
        },
        mounted() {
            var $gInfo = this.$refs.gInfo

            this.$modal.onBtnClick("confirm", (next, options) => {
                $gInfo.validate(valid => {
                    if (valid) {
                        Promise.resolve()
                            .then(() => {
                                return this.id ? guaranteeUpdate(this.gInfo) : guaranteeSave(this.gInfo)
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
                        Dict.get(["credTypePersonal", "relationType"]),
                        this.fetchCorpName(),
                        this.fetchGuarantee()
                    ])
                    .then(args => {
                        this.credTypePersonal = args[0].credTypePersonal
                        this.relationType = args[0].relationType
                        // 记得调用next触发下一步，否则Modal窗口不会显示内容
                        next()
                    })
            })
        }
    }

</script>
