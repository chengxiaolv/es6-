<template>
    <Form ref="sInfo" :model="sInfo" :rules="ruleValidate" :label-width="100">
        <FormItem label="仓库名称" prop="depotName">
            <Input v-model="sInfo.depotName" placeholder=""></Input>
        </FormItem>
        <FormItem label="仓库地址" prop="addr">
            <Input v-model="sInfo.addr" placeholder="输入仓库准确地址"></Input>
        </FormItem>
        <FormItem label="占地面积" prop="area">
            <input-number v-model="sInfo.area" placeholder="请输入仓库面积">
                <span slot="append">m²</span>
            </input-number>
        </FormItem>
        <FormItem label="建筑样式">
            <Select v-model="sInfo.buildStyle">
                <Option v-for="(item,index) in buildStyleList" :value="item.id">{{item.text}}</Option>
            </Select>
        </FormItem>
        <FormItem label="自动化程度">
            <Select v-model="sInfo.autoLevel">
                <Option v-for="(item,index) in autoLevelList" :value="item.id">{{item.text}}</Option>
            </Select>
        </FormItem>
        <FormItem label="联系人">
            <Input v-model="sInfo.contactPerson" placeholder=""></Input>
        </FormItem>
        <FormItem label="联系电话" prop="contactMobile">
            <Input v-model="sInfo.contactMobile" placeholder=""></Input>
        </FormItem>
        <FormItem label="备注">
            <Input v-model="sInfo.remark" type="textarea" placeholder=""></Input>
        </FormItem>
    </Form>
</template>
<script>
    import { getStoreManageInfo, storeManageSave, storeManageUpdate } from '@/api/customer'
    import Dict from '@/components/global/dict'
    import inputNumver from '@/components/form/inputNumber'
    import { tel } from '@/components/global/validate'

    export default {
        name: "storemanageForm",
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
                sInfo: {
                    id: "",
                    customerId: "",
                    depotName: "",
                    addr: "",
                    area: "",
                    buildStyle: "",
                    autoLevel: "",
                    contactPerson: "",
                    contactMobile: "",
                    remark: ""
                },
                buildStyle: Dict.NULL,
                autoLevel: Dict.NULL,
                ruleValidate: {
                    depotName: [
                        { required: true, message: '仓库名称必填', trigger: 'blur' },
                        { type: 'string', max: 50, message: '仓库名称需在50字以内', trigger: 'blur' }
                    ],
                    addr: [
                        { required: true, message: '仓库地址必填', trigger: 'blur' }
                    ],
                    area: [
                        { required: true, message: '占地面积必填', trigger: 'blur' }
                    ],
                    contactMobile: [
                        { validator: tel, trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
            buildStyleList() {
                return this.buildStyle.val()
            },
            autoLevelList() {
                return this.autoLevel.val()
            }
        },
        methods: {
            fetchStoremanage() {
                return Promise.resolve()
                    .then(res => {
                        if (this.id) {
                            return getStoreManageInfo(this.id).then(res => {
                                Object.keys(this.sInfo).forEach(name => this.sInfo[name] = res.data.cstCorpDepot[name])
                            })
                        } else {
                            this.sInfo.customerId = this.customerId
                            delete this.sInfo.id
                        }
                    })
            }
        },

        mounted() {
            Promise.all([Dict.get(["buildStyle", "autoLevel"]), this.fetchStoremanage()])
                .then(args => {
                    this.buildStyle = args[0].buildStyle
                    this.autoLevel = args[0].autoLevel
                })

            var $sInfo = this.$refs.sInfo

            this.$modal.onBtnClick("confirm", (next, options) => {
                $sInfo.validate(valid => {
                    if (valid) {
                        Promise.resolve()
                            .then(() => {
                                return this.id ? storeManageUpdate(this.sInfo) : storeManageSave(this.sInfo)
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
                        Dict.get(["buildStyle", "autoLevel"]),
                        this.fetchStoremanage()
                    ])
                    .then(args => {
                        this.buildStyle = args[0].buildStyle
                        this.autoLevel = args[0].autoLevel
                        // 记得调用next触发下一步，否则Modal窗口不会显示内容
                        next()
                    })
            })
        }
    }
</script>
