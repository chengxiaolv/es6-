<template>
    <Form ref="lInfo" :model="lInfo" :rules="ruleValidate" :label-width="100">
        <Row>
            <Col span="24">
            <FormItem label="上市时间:">
                <DatePicker type="date" placeholder="" v-model="investDateMask" format="yyyy-MM-dd"></DatePicker>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="24">
            <FormItem label="上市地点:">
                <Input v-model="lInfo.listedAddr" placeholder=""></Input>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="24">
            <FormItem label="股票类型:" prop="stockType">
                <Select v-model="lInfo.stockType">
                    <Option v-for="(item,index) in stockTypeList" :value="item.id" :key="index">{{item.text}}</Option>
                </Select>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="24">
            <FormItem label="股票名称:" prop="stockName">
                <Input v-model="lInfo.stockName" placeholder=""></Input>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="24">
            <FormItem label="股票代码:">
                <Input v-model="lInfo.stockCode" placeholder=""></Input>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="24">
            <FormItem label="发行价格(元):">
                <input-number v-model="lInfo.releasePrice" placeholder=""></input-number>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="24">
            <FormItem label="现行市值(元):">
                <input-number v-model="lInfo.currPrice" placeholder=""></input-number>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="24">
            <FormItem label="是否公开发行:">
                <Select v-model="lInfo.open">
                    <Option v-for="(item,index) in isOpen" :value="item.id" :key="index">{{item.text}}</Option>
                </Select>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="24">
            <FormItem label="备注:">
                <Input v-model="lInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
            </FormItem>
            </Col>
        </Row>
    </Form>
</template>
<script>
import { getlistedInfo, listedInfoSave, listedInfoUpdate } from '@/api/customer'
import Dict from '@/components/global/dict'
import { ymd } from '@/libs/util'
import inputNumver from '@/components/form/inputNumber'
export default {
    name: "listedinfo",
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
            lInfo: {
                id: '',
                customerId: '',
                listedDate: "",
                listedAddr: "",
                stockType: "",
                stockName: "",
                stockCode: "",
                releasePrice: "",
                currPrice: "",
                open: "",
                remark: ""
            },
            stockType: Dict.NULL,
            isOpen: [{
                id: 1,
                text: "是"
            }, {
                id: 0,
                text: "否"
            }],
            ruleValidate: {
                stockType: [
                    { required: true, message: '股票类型必填', trigger: 'change' }
                ],
                stockName: [
                    { required: true, message: '股票名称必填', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        investDateMask: {
            get() {
                return this.lInfo.listedDate ? new Date(this.lInfo.listedDate) : ''
            },
            set(val) {
                this.lInfo.listedDate = ymd(val)
            }
        },
        stockTypeList() {
            return this.stockType.val()
        }
    },
    methods: {
        fetch() {
            return Promise.resolve()
                .then(res => {
                    if (this.id) {
                        return getlistedInfo(this.id).then(res => {
                            console.log(res)
                            Object.keys(this.lInfo).forEach(name => this.lInfo[name] = res.data.cstCorpListed[name])
                        })
                    } else {
                        this.lInfo.customerId = this.customerId
                        delete this.lInfo.id
                    }
                })
        }
    },
    mounted() {
        Promise.all([Dict.get(["stockType"]), this.fetch()])
            .then(args => {
                this.stockType = args[0].stockType
            })

        var $lInfo = this.$refs.lInfo
        this.$modal.onBtnClick("confirm", (next, options) => {
            $lInfo.validate(valid => {
                if (valid) {

                    Promise.resolve()
                        .then(() => {
                            return this.id ? listedInfoUpdate(this.lInfo) : listedInfoSave(this.lInfo)
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
                    Dict.get(["stockType"]),
                    this.fetch()
                ])
                .then(args => {
                    this.stockType = args[0].stockType
                    // 记得调用next触发下一步，否则Modal窗口不会显示内容
                    next()
                })
        })
    }
}

</script>
