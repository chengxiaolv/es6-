<template>
    <Form ref="corpValidate" label-position="left" :model="corpValidate" :rules="ruleValidate" :label-width="108">
        <Row>
            <Col span="11">
            <FormItem label="企业名称：" prop="corpName">
                <Input v-model="corpValidate.corpName" placeholder="" :maxlength="64"></Input>
            </FormItem>
            </Col>
            <Col span="11" offset="1">
            <FormItem label="法人名称：" prop="legalName">
                <Input v-model="corpValidate.legalName" placeholder="" :maxlength="32"></Input>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="11">
            <FormItem label="社会信用代码：" prop="credNumber">
                <Input v-model="corpValidate.credNumber" placeholder="" :maxlength="32"></Input>
            </FormItem>
            </Col>
            <Col span="11" offset="1">
            <FormItem label="注册资本(元)：" prop="regCapital">
                <input-numver v-model="corpValidate.regCapital" placeholder="" :maxlength="32"></input-numver>
            </FormItem>
            </Col>
        </Row>
        <FormItem label="营业开始日期：">
            <Row>
                <Col span="5">
                <FormItem prop="openTime">
                    <DatePicker type="date" v-model="openTimeDateMask" format="yyyy-MM-dd" placeholder=""></DatePicker>
                </FormItem>
                </Col>
                <Col span="1" class="text-center"> 至
                </Col>
                <Col span="18">
                <FormItem prop="closeTime">
                    <DatePicker type="date" placeholder="" format="yyyy-MM-dd" v-model="closeTimeDateMask"></DatePicker>
                </FormItem>
                </Col>
            </Row>
        </FormItem>
        <Row>
            <Col span="11">
            <FormItem label="邮箱：" prop="email">
                <Input v-model="corpValidate.email" placeholder="" :maxlength="128"></Input>
            </FormItem>
            </Col>
            <Col span="11" offset="1">
            <FormItem label="邮政编码：" prop="postcode">
                <Input v-model="corpValidate.postcode" placeholder="" :maxlength="16"></Input>
            </FormItem>
            </Col>
        </Row>
        <FormItem label="通讯地址：">
            <Input v-model="corpValidate.contactAddr" placeholder="" :maxlength="255"></Input>
        </FormItem>
        <Row>
            <Col span="11">
            <FormItem label="联系人：">
                <Input v-model="corpValidate.contactPerson" placeholder="" :maxlength="32"></Input>
            </FormItem>
            </Col>
            <Col span="11" offset="1">
            <FormItem label="手机号码：" prop="contactMobile">
                <Input v-model="corpValidate.contactMobile" placeholder="" :maxlength="32"></Input>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="11">
            <FormItem label="信息来源：">
                <Select v-model="corpValidate.placeId">
                    <Option v-for="(item,key) in sourceFromList" :value="item.text" :data-id="item.id" :key="item.id">{{ item.text }}</Option>
                </Select>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="11">
            <FormItem label="推荐者：">
                <lookup v-model="presenterMask" placeholder="推荐者" title="客户查询" :modalHeight="480">
                    <select-customer></select-customer>
                </lookup>
            </FormItem>
            </Col>
            <Col span="11" offset="1">
            <FormItem label="客户经理：">
                <lookup v-model="managerMask" placeholder="请选择办理人员" title="选择业务员" :modalHeight="480">
                    <select-user></select-user>
                </lookup>
            </FormItem>
            </Col>
        </Row>
    </Form>
</template>
<script>
import Dict from '@/components/global/dict'
import { corpSave } from '@/api/customer'
import inputNumver from '@/components/form/inputNumber'
import { tel, postCode, socialCode } from '@/components/global/validate'
import lookup from '@/components/form/lookup'
import selectUser from '@/view/modals/selectUser'
import selectCustomer from '@/view/modals/customer/selectCustomer'
import { ymd } from '@/libs/util'
export default {
    name: "addCorpForm",
    inject: {
        $modal: { default: null }
    },
    props: {

    },
    components: {
        inputNumver,
        lookup,
        selectUser,
        selectCustomer
    },
    data() {
        return {
            corpValidate: {
                corpName: "",
                legalName: "",
                credNumber: "", // 91430111MA4L16JQ9B
                regCapital: "",
                openTime: "",
                closeTime: "",
                postcode: "",
                email: "",
                contactAddr: "",
                contactPerson: "",
                contactMobile: "",
                infoResource: "",
                presenter: "",
                managerId: "",
                cstType: ""
            },
            sourceFrom: Dict.NULL,
            manager: [],
            presenter: [],
            ruleValidate: {
                corpName: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' }
                ],
                legalName: [
                    { required: true, message: '请输入法人名称', trigger: 'blur' }
                ],
                credNumber: [
                    { required: true, message: '社会信用代码必填', trigger: 'blur' },
                    { validator: socialCode, trigger: 'blur' }
                ],
                regCapital: [
                    { required: true, message: '请输入注册资本', trigger: 'blur' }
                ],
                openTime: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ],
                closeTime: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ],
                postcode: [
                    { required: true, validator: postCode, trigger: 'blur' }
                ],
                email: [
                    { type: "email", message: '邮箱格式不正确', trigger: 'blur' }
                ],
                contactMobile: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: tel, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {

    },
    computed: {
        sourceFromList() {
            return this.sourceFrom.val()
        },
        openTimeDateMask: {
            get() {
                return this.corpValidate.openTime ? new Date(this.corpValidate.openTime) : ''
            },
            set(val) {
                this.corpValidate.openTime = ymd(val)
            }
        },
        closeTimeDateMask: {
            get() {
                return this.corpValidate.closeTime ? new Date(this.corpValidate.closeTime) : ''
            },
            set(val) {
                this.corpValidate.closeTime = ymd(val)
            }
        },
        presenterMask: {
            get() {
                return this.presenter
            },
            set(val) {
                this.presenter = val
                this.corpValidate.presenter = val[0].value
            }
        },
        managerMask: {
            get() {
                return this.manager
            },
            set(val) {
                this.manager = val
                this.corpValidate.managerId = val[0].value
            }
        }
    },
    created: function() {
        Dict.get(["sourceFrom", "cstType"]).then(res => {
            this.sourceFrom = res.sourceFrom
            this.corpValidate.cstType = res.cstType.find(v => v.text.indexOf("企业") >= 0).id
        })
    },
    mounted() {
        var $corpValidate = this.$refs.corpValidate
        
        this.$modal.onBtnClick("confirm", (next, options) => {
            $corpValidate.validate(valid => {
                if (valid) {
                    corpSave(this.corpValidate)
                        .then(res => this.$Message.success('Success!'), err => options.closeModal = false)
                        .then(res => next())
                } else {
                    options.closeModal = false
                    next()
                }
            })
        })
    }
}

</script>
