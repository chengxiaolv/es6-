<template>
    <Form ref="formValidate" label-position="left" :model="formValidate" :rules="ruleValidate" :label-width="88">
        <Row :gutter="16">
            <Col span="12">
            <FormItem label="客户名称" prop="userName">
                <Input placeholder="" v-model="formValidate.userName"></Input>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="证件类型" prop="credType">
                <Select v-model="formValidate.credType" placeholder="" label-in-value>
                    <Option v-for="(item,key) in credTypeList" :value="item.id" :data-id="item.id" :key="item.id">{{item.text}}</Option>
                </Select>
            </FormItem>
            </Col>
        </Row>
        <Row :gutter="16">
            <Col span="12">
            <FormItem label="证件号码" prop="credNumber">
                <Input placeholder="" v-model="formValidate.credNumber"></Input>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="手机号码" prop="mobile">
                <Input placeholder="" v-model="formValidate.mobile"></Input>
            </FormItem>
            </Col>
        </Row>
        <Row :gutter="10">
            <Col span="12">
            <FormItem label="邮箱" prop="email">
                <Input placeholder="" v-model="formValidate.email"></Input>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="邮政编码" prop="postcode">
                <Input placeholder="" v-model="formValidate.postcode"></Input>
            </FormItem>
            </Col>
        </Row>
        <FormItem label="通讯地址" prop="contactAddr">
            <Input placeholder="" v-model="formValidate.contactAddr"></Input>
        </FormItem>
        <Row :gutter="10">
            <Col span="12">
            <FormItem label="信息来源">
                <Select v-model="formValidate.sourceFrom" placeholder="">
                    <Option v-for="(item,key) in resourceArray" :value="item.id" :data-id="item.id" :key="item.id">{{ item.text }}</Option>
                </Select>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="客户分类" prop="cstSort">
                <Select v-model="formValidate.cstSort" placeholder="">
                    <Option v-for="(item,key) in cstSortList" :value="item.id" :data-id="item.id" :key="item.id">{{ item.text }}</Option>
                </Select>
            </FormItem>
            </Col>
        </Row>
        <Row :gutter="10">
            <Col span="12">
            <FormItem label="推荐者">
                <lookup v-model="presenterMask" placeholder="推荐者" title="客户查询" :modalHeight="480">
                    <select-customer></select-customer>
                </lookup>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="客户经理">
                <lookup v-model="managerUserMask" placeholder="请选择办理人员" title="选择业务员" :modalHeight="480">
                    <select-user></select-user>
                </lookup>
            </FormItem>
            </Col>
        </Row>
    </Form>
</template>
<script>
    import Dict from '@/components/global/dict'
    import { personalSave } from '@/api/customer'
    import { tel, createPersonCredNumber, postCode } from '@/components/global/validate'
    import lookup from '@/components/form/lookup'
    import selectUser from '@/view/modals/selectUser'
    import selectCustomer from '@/view/modals/customer/selectCustomer'

    export default {
        name: 'personalForm',
        components: {
            lookup,
            selectUser,
            selectCustomer
        },
        data() {
            var data = {
                // 备选项
                credTypeList: [],
                resourceArray: [],
                cstSortList: [],
                presenter: [],
                managerUser: [],
                // 表单
                formValidate: {
                    userName: '',
                    credType: '',
                    credNumber: '',
                    email: '',
                    mobile: '',
                    postcode: '',
                    contactAddr: '',
                    sourceFrom: '',
                    presenter: '',
                    managerUserId: '',
                    cstSort: '',
                    cstType: ''
                }
            }
            data.ruleValidate = {
                userName: [
                    { required: true, message: '请输入客户姓名', trigger: 'blur' },
                    { type: 'string', min: 2, max: 5, message: '请输入2到5个中文字符', trigger: 'blur' }
                ],
                credType: [
                    { required: true, message: '请选择执照类型', trigger: 'blur' }
                ],
                credNumber: [
                    { required: true, message: '请输入证件号码', trigger: 'blur' },
                    { validator: createPersonCredNumber(data.formValidate), trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '手机号码必填', trigger: 'blur' },
                    { validator: tel, trigger: 'blur' }
                ],
                contactAddr: [
                    { required: true, message: '请输入通讯地址', trigger: 'blur' }
                ],
                cstSort: [
                    { required: true, message: '客户分类必填', trigger: 'blur' }
                ],
                postcode: [
                    { validator: postCode, trigger: 'blur' }
                ],
                email: [
                    { type: "email", message: '邮箱格式不正确', trigger: 'blur' }
                ]
            }
            return data
        },
        inject:{
            $modal:{default: null}
        },
        computed: {
            presenterMask: {
                get() {
                    return this.presenter
                },
                set(val) {
                    this.presenter = val
                    this.formValidate.presenter = val[0].value
                }
            },
            managerUserMask: {
                get() {
                    return this.managerUser
                },
                set(val) {
                    this.managerUser = val
                    this.formValidate.managerUserId = val[0].value
                }
            }
        },
        mounted() {
            var $formValidate = this.$refs.formValidate

            this.$modal.onBtnClick("confirm", (next, options) => {
                $formValidate.validate(valid => {
                    if (valid) {
                        personalSave(this.formValidate)
                            .then( res => this.$Message.success('Success!')
                                , err => options.closeModal = false)
                            .then(res => next())
                    }else{
                        options.closeModal = false
                        next()
                    }
                })
            })
        },
        created() {
            Dict.get(["credTypePersonal", "sourceFrom", "cstSort", "cstType"]).then(res => {
                var { credTypePersonal, sourceFrom, cstSort, cstType } = res;

                this.credTypeList = credTypePersonal.val();
                this.resourceArray = sourceFrom.val();
                this.cstSortList = cstSort.val();
                this.formValidate.cstType = cstType.val().find(v => v.text.indexOf("个人") >= 0).id
            })
        }
    }

</script>
