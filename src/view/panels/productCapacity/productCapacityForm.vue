<template>
    <Form ref="pInfo" :model="pInfo" :rules="ruleValidate" :label-width="100">
        <FormItem label="客户名称:">
               <Input placeholder="" v-model="corpName" disabled></Input>
        </FormItem>
        <FormItem label="产品名称:" prop="productName">
               <Input placeholder="" v-model="pInfo.productName"></Input>
        </FormItem>
        <FormItem label="产品简介:" prop="resume">
               <Input v-model="pInfo.resume" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="200字以内"></Input>
        </FormItem>
        <FormItem label="销售区域:" prop="saleArea">
                <Select v-model="pInfo.saleArea">
                    <Option v-for="(item,index) in saleAreaList" :value="item.id" :key="index">{{item.text}}</Option>
                </Select>
        </FormItem>
        <FormItem label="产品遵守规则:" prop="obeyRules">
                <Select v-model="pInfo.obeyRules">
                    <Option v-for="(item,index) in obeyRulesList" :value="item.id" :key="index">{{item.text}}</Option>
                </Select>
        </FormItem>
        <FormItem label="主要设备及生产线：">
                <Input v-model="pInfo.productLine" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="200字以内" :maxlength="255"></Input>
        </FormItem>
         <FormItem label="正常生产能力:">
               <Input placeholder="" v-model="pInfo.dailyCapacity"></Input>
        </FormItem>
        <FormItem label="最大生产潜力:">
               <Input placeholder="" v-model="pInfo.maxCapacity"></Input>
        </FormItem>
         <FormItem label="正常交货周期:">
               <Input placeholder="" v-model="pInfo.deliverCycle"></Input>
        </FormItem>
         <FormItem label="设计开发能力:" prop="devCapacity">
                <Select v-model="pInfo.devCapacity">
                    <Option v-for="(item,index) in devCapacityList" :value="item.id" :key="index">{{item.text}}</Option>
                </Select>
        </FormItem>
         <FormItem label="备注:" prop="remark">
               <Input v-model="pInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="200字以内"></Input>
        </FormItem>
    </Form>
</template>
<script>
import { getCorpInfo,getProductCapacityInfo, productCapacitySave, productCapacityUpdate } from '@/api/customer'
import Dict from '@/components/global/dict'
import { ymd } from '@/libs/util'
import inputNumber from '@/components/form/inputNumber'
export default {
    name: "productCapacity",
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
            pInfo: {
                id: '',
                customerId: '',
                productName:'',
                resume:'',
                saleArea:'',
                obeyRules:'',
                productLine:'',
                dailyCapacity:'',
                maxCapacity:'',
                deliverCycle:'',
                remark: "",
                devCapacity:""
            },
            corpName:"",
            saleArea: Dict.NULL,
            obeyRules:Dict.NULL,     
            devCapacity:Dict.NULL,   
            ruleValidate: {
                productName: [
                    { required: true, message: '产品名称必填', trigger: 'blur' }
                ],
                resume: [
                    { required: true, message: '产品简介必填', trigger: 'blur' }
                ],
                saleArea:[
                     { required: true, message: '销售区域必选', trigger: 'change' }
                ],
                obeyRules:[
                     { required: true, message: '产品遵守规则必选', trigger: 'change' }
                ]
            }
        }
    },
    computed: {
        saleAreaList() {
            return this.saleArea.val()
        },
        obeyRulesList(){
           return this.obeyRules.val()
        },
        devCapacityList(){
            return this.devCapacity.val()
        }
    },
    methods: {
        fetchCorpName() {
                getCorpInfo(this.customerId).then(res => this.corpName = res.data.cstCorp.corpName)
            },
        fetch() {
            return Promise.resolve()
                .then(res => {
                    if (this.id) {
                        console.log(this.id);
                        return getProductCapacityInfo(this.id).then(res => {
                            console.log(res)
                            Object.keys(this.pInfo).forEach(name => this.pInfo[name] = res.data.cstCorpProduction[name])
                        })
                    } else {
                        this.pInfo.customerId = this.customerId
                        delete this.pInfo.id
                    }
                })
        }
    },
    mounted() {
        Promise.all([Dict.get(["saleArea","obeyRules","devCapacity"]), this.fetch(),this.fetchCorpName()])
            .then(args => {
                this.saleArea = args[0].saleArea
                this.obeyRules = args[0].obeyRules
                this.devCapacity = args[0].devCapacity
            })

        var $pInfo = this.$refs.pInfo
        this.$modal.onBtnClick("confirm", (next, options) => {
            $pInfo.validate(valid => {
                if (valid) {

                    Promise.resolve()
                        .then(() => {
                            return this.id ? productCapacityUpdate(this.pInfo) : productCapacitySave(this.pInfo)
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
                    Dict.get(["saleArea","obeyRules","devCapacity"]),
                    this.fetch()
                ])
                .then(args => {
                    this.saleArea = args[0].saleArea
                    this.obeyRules = args[0].obeyRules
                    this.devCapacity = args[0].devCapacity
                    // 记得调用next触发下一步，否则Modal窗口不会显示内容
                    next()
                })
        })
    }
}

</script>
