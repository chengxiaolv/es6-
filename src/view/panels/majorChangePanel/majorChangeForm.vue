<template>
    <Form ref="mcInfo" :model="mcInfo" :rules="ruleValidate" :label-width="100">
            <FormItem label="变更日期:" prop="changeDate">
                <DatePicker type="date" placeholder="" v-model="majorChangeDateMask" format="yyyy-MM-dd"></DatePicker>
            </FormItem>
            <FormItem label="变更类型：" prop="changeType">
                <Select v-model="mcInfo.changeType">
                    <Option v-for="(item,index) in changeTypeList" :key="index" :value="item.id">{{item.text}}</Option>
                </Select>
            </FormItem>
            <FormItem label="变更前内容" prop="changeBefore">
                <Input v-model="mcInfo.changeBefore" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :maxlength="512" placeholder="请输入变更前内容"></Input>
            </FormItem>
            <FormItem label="变更后内容" prop="changeAfter">
                <Input v-model="mcInfo.changeAfter" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :maxlength="512" placeholder="请输入变更后内容"></Input>
            </FormItem>
    </Form>
</template>
<script>
import { getMajorChangeInfo, majorChangeSave, majorChangeUpdate } from '@/api/customer'
import Dict from '@/components/global/dict'
import { ymd } from '@/libs/util'
import inputNumber from '@/components/form/inputNumber'
export default {
    name: "majorChange",
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
            mcInfo: {
                id: '',
                customerId: '',
                changeDate: "",
                changeType:"",
                changeBefore: "",
                changeAfter:""
            },
            changeType: Dict.NULL,
          
            ruleValidate: {
                changeDate: [
                    { required: true, message: '变更日期必选', trigger: 'change' }
                ],
               changeType:[
                    { required: true, message: '变更类型必选', trigger: 'change' }
               ],
               changeBefore:[
                    { required: true, message: '变更前内容必填', trigger: 'blur' }
               ],
               changeAfter:[
                   { required: true, message: '变更后内容必填', trigger: 'blur' }
               ]
            }
        }
    },
    computed: {
        majorChangeDateMask: {
            get() {
                return this.mcInfo.changeDate ? new Date(this.mcInfo.changeDate) : ''
            },
            set(val) {
                this.mcInfo.changeDate = ymd(val)
            }
        },
        changeTypeList() {
            return this.changeType.val()
        }
    },
    methods: {
        fetch() {
            return Promise.resolve()
                .then(res => {
                     console.log(this.id);
                    if (this.id) {
                        console.log(this.id);
                        return getMajorChangeInfo(this.id).then(res => {
                            Object.keys(this.mcInfo).forEach(name => this.mcInfo[name] = res.data.cstCorpChange[name])
                        })
                    } else {
                        this.mcInfo.customerId = this.customerId
                        delete this.mcInfo.id
                    }
                })
        }
    },
    mounted() {
        Promise.all([Dict.get(["changeType"]), this.fetch()])
            .then(args => {
                this.changeType = args[0].changeType
            })

        var $mcInfo = this.$refs.mcInfo
        this.$modal.onBtnClick("confirm", (next, options) => {
            $mcInfo.validate(valid => {
                if (valid) {
                    Promise.resolve()
                        .then(() => {
                            return this.id ? majorChangeUpdate(this.mcInfo) : majorChangeSave(this.mcInfo)
                        })
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
                    Dict.get(["changeType"]),
                    this.fetch()
                ])
                .then(args => {
                    this.changeType = args[0].changeType
                    // 记得调用next触发下一步，否则Modal窗口不会显示内容
                    next()
                })
        })
    }
}

</script>
