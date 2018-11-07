<template>
    <div class="editform">
        <Form ref="cInfo" :model="cInfo" :rules="ruleValidate" :label-width="140">
            <Row>
                <Col span="24">
                <FormItem label="客户名称:" prop="corpName">
                    <Input v-model="cInfo.corpName" placeholder="请输入客户名称"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="统一社会信用代码:" prop="credNumber">
                    <Input v-model="cInfo.credNumber" placeholder="请输入社会信用代码"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="企业性质：" prop="corpType">
                    <Select v-model="cInfo.corpType">
                        <Option v-for="(item, index) in corpTypeList" :value="item.id" :key="index">{{item.text}}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="注册类型：" prop="regType">
                    <Select v-model="cInfo.regType">
                        <Option v-for="(item, index) in regTypeList" :value="item.id" :key="index">{{item.text}}</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="注册资本：" prop="regCapital">
                    <input-number v-model="cInfo.regCapital" placeholder="请输入注册资本" number>
                        <span slot="append">元</span>
                    </input-number>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="行业分类：" prop="category">
                    <loan-invest-tree v-model="cInfo.category"></loan-invest-tree>
                </FormItem>
                </Col>
            </Row>
            <FormItem label="营业开始日期：">
                <Row>
                    <Col span="5">
                    <FormItem prop="openTime">
                        <DatePicker type="date" placeholder="开始日期" v-bind:value="cInfo.openTime"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="1" class="text-center"> 至
                    </Col>
                    <Col span="18">
                    <FormItem prop="closeTime">
                        <DatePicker v-bind:value="cInfo.closeTime" type="date" placeholder="结束日期"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <Row>
                <Col span="12">
                <FormItem label="资产总额：" prop="totalMoney">
                    <input-number v-model="cInfo.totalMoney" placeholder="请输入资产总额">
                        <span slot="append">元</span>
                    </input-number>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="营业收入：" prop="yearIncome">
                    <input-number v-model="cInfo.yearIncome" placeholder="请输入营业收入">
                        <span slot="append">元</span>
                    </input-number>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="员工人数：" prop="employeeMember">
                    <input-number v-model="cInfo.employeeMember" placeholder="请输入员工人数"></input-number>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="企业规模：">
                    <Select v-model="cInfo.corpScale">
                        <Option v-for="(item, index) in corpScaleList" :value="item.id" :key="index">{{item.text}}</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="行政区域：" prop="cityId">
                    <al-selector level="2" v-model="cityIdVal" data-type="all" class="overflow-hidden" />
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="注册地址：" prop="regAddr">
                    <Input v-model="cInfo.regAddr" placeholder="请输入注册地址"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="经营范围：" prop="busiScope">
                    <Input v-model="cInfo.busiScope" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入经营范围，字数控制在200字以内"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="通讯地址：" prop="contactAddr">
                    <Input v-model="cInfo.contactAddr" placeholder="请输入详细的通讯地址"></Input>
                </FormItem>
                </Col>
            </Row>
            <FormItem label="邮箱地址：" prop="emial">
                <Input v-model="cInfo.email" placeholder=""></Input>
            </FormItem>
            <Row>
                <Col span="12">
                <FormItem label="邮政编码：" prop="postcode">
                    <Input v-model="cInfo.postcode" placeholder="请输入邮政编码"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="传真号码：" prop="fax">
                    <Input v-model="cInfo.fax" placeholder="请输入传真号码"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="法人代表姓名：" prop="legalName">
                    <Input v-model="cInfo.legalName" placeholder="请输入法人代表姓名称"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="法人代表证件类型：" prop="legalCredType">
                    <Select v-model="cInfo.legalCredType">
                        <Option v-for="(item, index) in credTypePersonalList" :value="item.id" :key="index">{{item.text}}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="法人代表证件号码：" prop="legalCredNumber">
                    <Input v-model="cInfo.legalCredNumber" placeholder="请输入正确的证件号码"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="联系人：" prop="contactPerson">
                    <Input v-model="cInfo.contactPerson" placeholder="请输入联系人姓名"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="联系电话：" prop="contactMobile">
                    <Input v-model="cInfo.contactMobile" placeholder="请输入11位正确的手机号码"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="是否集团客户：" prop="groupCustomer">
                    <Select v-model="cInfo.groupCustomer">
                        <Option v-for="(item,index) in groupCustomerList" :value="item.id" :key="index">{{item.value}}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="信息来源：" prop="placeId">
                    <Select v-model="cInfo.placeId">
                        <Option v-for="(item, index) in sourceFromList" :value="item.id" :key="index">{{item.text}}</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="客户经理姓名：">
                    <lookup v-model="managerUserMask" placeholder="请选择办理人员" title="选择业务员" :modalHeight="480">
                        <select-user></select-user>
                    </lookup>
                </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
import loanInvestTree from '@/components/form/loanInvestTree'
import { getCorpInfo, corpUpdate } from '@/api/customer'
import Dict from '@/components/global/dict'
import Vue from 'vue'
import inputNumver from '@/components/form/inputNumber'
import { tel, postCode, socialCode, fax, createPersonCredNumber } from '@/components/global/validate'
import lookup from '@/components/form/lookup'
import selectUser from '@/view/modals/selectUser'

export default {
    name: "corpForm",
    props: {
        customerId: {
            type: String,
            required: true
        }
    },
    components: {
        lookup,
        selectUser,
        loanInvestTree
    },
    inject: {
        $modal: { default: null }
    },
    data() {
        var data = {
            cInfo: {
                id: "",
                corpName: "",
                cityId: "",
                credNumber: "",
                corpType: "",
                regType: "",
                regCapital: "",
                category: "",
                openTime: "",
                closeTime: "",
                totalMoney: "",
                yearIncome: "",
                employeeMember: "",
                corpScale: "",
                corpScale: "",
                regAddr: "",
                busiScope: "",
                contactAddr: "",
                postcode: "",
                fax: "",
                managerId: '',
                legalName: "",
                legalCredType: "",
                legalCredNumber: "",
                contactPerson: "",
                contactMobile: "",
                groupCustomer: "",
                placeId: "",
                email: ""
            },
            corpType: Dict.NULL,
            regType: Dict.NULL,
            corpScale: Dict.NULL,
            credTypePersonal: Dict.NULL,
            sourceFrom: Dict.NULL,
            groupCustomerList: [{
                id: 1,
                value: "是"
            }, {
                id: 0,
                value: "否"
            }],
            cityId: [],
            manager: []
        }

        data.ruleValidate = {
            corpName: [
                { required: true, message: '客户名称必填', trigger: 'blur' }
            ],
            credNumber: [
                { required: true, message: '统一社会信用代码必填', trigger: 'blur' },
                { validator: socialCode, trigger: 'blur' }
            ],
            corpType: [
                { required: true, message: '企业性质必填', trigger: 'blur' }
            ],
            regType: [
                { required: true, message: '注册类型必填', trigger: 'change' }
            ],
            regCapital: [
                { required: true, message: '注册资本必填' }
            ],
            totalMoney: [
                { required: true, message: '资产总额必填' }
            ],
            yearIncome: [
                { required: true, message: '营业收入必填', trigger: 'blur' }
            ],
            cityId: [
                { required: true, message: '行政区域必填', trigger: 'change' }
            ],
            regAddr: [
                { required: true, message: '注册地址必填', trigger: 'blur' }
            ],
            busiScope: [
                { required: true, message: '经营范围必填', trigger: 'blur' }
            ],
            contactAddr: [
                { required: true, message: '通讯地址必填', trigger: 'blur' }
            ],
            legalName: [
                { required: true, message: '法人代表姓名必填', trigger: 'blur' }
            ],
            legalCredType: [
                { required: true, message: '法人证件类型必填', trigger: 'blur' }
            ],
            legalCredNumber: [
                { required: true, message: '法人证件号码必填', trigger: 'blur' },
                { validator: createPersonCredNumber(data.cInfo), trigger: 'blur' }
            ],
            contactPerson: [
                { required: true, message: '联系人必填', trigger: 'blur' }
            ],
            contactMobile: [
                { required: true, message: '联系人电话必填', trigger: 'blur' },
                { validator: tel, trigger: 'blur' }
            ],
            postcode: [
                { validator: postCode, trigger: 'blur' }
            ],
            fax: [
                { validator: fax, trigger: 'blur' }
            ],
            email: [
                { type: "email", message: '邮箱格式不正确', trigger: 'blur' }
            ]
        }
        return data
    },
    computed: {
        cityIdVal: {
            get() {
                var temp = JSON.safeParse(this.cInfo.cityId) || []

                return temp.map(v => v.code)
            },
            set(v) {
                this.cInfo.cityId = JSON.stringify(v) || ''
            }
        },
        corpTypeList() {
            return this.corpType.val()
        },
        regTypeList() {
            return this.regType.val()
        },
        corpScaleList() {
            return this.corpScale.val()
        },
        credTypePersonalList() {
            return this.credTypePersonal.val()
        },
        sourceFromList() {
            return this.sourceFrom.val()
        },
        managerUserMask: {
            get() {
                return this.manager
            },
            set(val) {
                this.manager = val
                this.cInfo.managerId = val[0].value
            }
        }
    },
    methods: {
        fetch() {
            return getCorpInfo(this.customerId).then(res => {
                Object.keys(this.cInfo).forEach(name => this.cInfo[name] = res.data.cstCorp[name])

                this.manager.push({ text: res.data.managerName, value: this.cInfo.managerId })
            })
        }
    },
    mounted() {
        var $cInfo = this.$refs.cInfo

        this.$modal.onBtnClick("confirm", (next, options) => {
            $cInfo.validate(valid => {
                if (valid) {
                    corpUpdate(this.cInfo)
                        .then(res => this.$Message.success('保存成功!'), err => options.closeModal = false)
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
                    Dict.get(["corpType", "regType", "corpScale", "credTypePersonal", "sourceFrom"]),
                    this.fetch()
                ])
                .then(args => {
                    this.corpType = args[0].corpType
                    this.regType = args[0].regType
                    this.corpScale = args[0].corpScale
                    this.credTypePersonal = args[0].credTypePersonal
                    this.sourceFrom = args[0].sourceFrom
                    // 记得调用next触发下一步，否则Modal窗口不会显示内容

                    next()
                })
        })
    }
}

</script>
