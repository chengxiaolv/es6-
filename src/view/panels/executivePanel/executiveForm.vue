<template>
    <div class="editform">
        <Form ref="eInfo" :model="eInfo" :rules="ruleValidate" :label-width="140">
            <Row>
                <Col span="24">
                <FormItem label="高管人员:" prop="userName">
                    <Input v-model="eInfo.userName" placeholder="请输入高管人员姓名"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="高管人员类别:" prop="position">
                    <Input v-model="eInfo.position" placeholder="请输入高管人员类别"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="证件类型：" prop="credType">
                    <Select v-model="eInfo.credType">
                        <Option v-for="(item,index) in credTypePersonalList" :value="item.id" :key="index">{{item.text}}</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="证件号码：" prop="credNumber">
                    <Input v-model="eInfo.credNumber" placeholder="证件号码"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="客户性别：">
                    <Select v-model="eInfo.sex">
                        <Option v-for="item in sexList" :value="item.id">{{item.text}}</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="出生日期：">
                    <DatePicker v-model="birthDateMask" format="yyyy-MM-dd" placeholder="出生日期"></DatePicker>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="最高学历：" prop="educationLevel">
                    <Select v-model="eInfo.educationLevel">
                        <Option v-for="item in educationLevelList" :value="item.id">{{item.text}}</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="工作简历：">
                    <Input v-model="eInfo.resume" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="200字以内"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="备注：">
                    <Input v-model="eInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="200字以内"></Input>
                </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
import { getExecutiveInfo, executiveSave, executiveUpdate } from '@/api/customer'
import Dict from '@/components/global/dict'
import { ymd } from '@/libs/util'
import inputNumber from '@/components/form/inputNumber'
import { createPersonCredNumber } from '@/components/global/validate'

export default {
    name: "executiveInfo",
    inject: {
        $modal: { default: null }
    },
    props: {
        id: {
            type: String,
            required: true
        },
        customerId: {
            type: String,
            required: true
        }
    },
    data() {
        var data = {
            eInfo: {
                id: "",
                customerId: "",
                userName: "",
                position: "",
                credType: "",
                credNumber: "",
                sex: "",
                birthday: "",
                educationLevel: "",
                resume: "",
                remark: ""
            },
            credTypePersonal: Dict.NULL,
            educationLevel: Dict.NULL,
            sexList: [{
                    id: 0,
                    text: '女'
                },
                {
                    id: 1,
                    text: '男'
                }
            ],
        }
        data.ruleValidate = {
            userName: [
                { required: true, message: '所在单位必填', trigger: 'blur' }
            ],
            credType: [

                { required: true, message: '证件类型必填', trigger: 'change' }

            ],
            credNumber: [
                { required: true, message: '证件号码必填', trigger: 'blur' },
                { validator: createPersonCredNumber(data.eInfo), trigger: 'blur' }
            ]
        }
        return data
    },
    computed: {
        birthDateMask: {
            get() {
                return this.eInfo.birthday ? new Date(this.eInfo.birthday) : ''
            },
            set(val) {
                this.eInfo.birthday = ymd(val)
            }
        },
        credTypePersonalList() {
            return this.credTypePersonal.val()
        },
        educationLevelList() {
            return this.educationLevel.val()
        }
    },
    methods: {
        fetch() {
            return Promise.resolve()
                .then(res => {
                    if (this.id) {
                        return getExecutiveInfo(this.id).then(res => {
                            console.log(res)
                            Object.keys(this.eInfo).forEach(name => this.eInfo[name] = res.data.cstCorpExecutive[name])
                        })
                    } else {
                        this.eInfo.customerId = this.customerId
                        delete this.eInfo.id
                    }
                })
        }
    },
    mounted() {
        var $eInfo = this.$refs.eInfo

        this.$modal.onBtnClick("confirm", (next, options) => {
            $eInfo.validate(valid => {
                if (valid) {
                    Promise.resolve()
                        .then(() => {
                            return this.id ? executiveUpdate(this.eInfo) : executiveSave(this.eInfo)
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
                    Dict.get(["credTypePersonal", "educationLevel"]),
                    this.fetch()
                ])
                .then(args => {
                    this.credTypePersonal = args[0].credTypePersonal
                    this.educationLevel = args[0].educationLevel
                    // 记得调用next触发下一步，否则Modal窗口不会显示内容
                    next()
                })
        })
    }
}

</script>
