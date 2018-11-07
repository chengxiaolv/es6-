<template>
    <div class="editform">
        <Form ref="pInfo" :model="pInfo" :rules="ruleValidate" :label-width="120">
            <FormItem label="负债类型：" prop="debtType">
                <Select v-model="pInfo.debtType">
                    <Option v-for="(item, index) in debtTypeList" :value="item.id" :key="index">{{item.text}}</Option>
                </Select>   
            </FormItem>
            <Row>  
                <Col span="12">
                    <FormItem label="借款机构：" prop="loanOrg">
                        <Input v-model="pInfo.loanOrg" placeholder="借款机构" :maxlength="128"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="币种：" prop="currency">
                        <Select v-model="pInfo.currency" @on-change="changeCurrencyType" label-in-value>
                            <Option v-for="(item, index) in currencyList" :value="item.id" :key="index">{{item.text}}</Option>
                        </Select>   
                    </FormItem>
                </Col>
            </Row>
            <Row>  
                <Col span="12">
                    <FormItem label="金额：" prop="amount">
                        <input-number v-model="pInfo.amount" placeholder="金额" :allowNegative="false" :maxlength="16">
                            <span slot="append">{{currencyType}}</span> 
                        </input-number>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="余额：" prop="balance">
                        <input-number v-model="pInfo.balance" placeholder="余额" :allowNegative="false" :maxlength="16">
                            <span slot="append">{{currencyType}}</span> 
                        </input-number>
                    </FormItem>
                </Col>
            </Row>  
            <Row>  
                <Col span="12">
                    <FormItem label="期限：" prop="deadline">
                        <input-number v-model="pInfo.deadline" placeholder="期限" :allowNegative="false" 
                                    :allowDecimal="false" :includeThousandsSeparator="false" :maxlength="32">
                            <span slot="append">月</span>
                        </input-number>
                    </FormItem>
                </Col>
            </Row>      
            <Row>  
                <Col span="12">
                    <FormItem label="开始日期：" prop="startDate">
                        <DatePicker v-model="startDateMask" type="date" placeholder=""></DatePicker>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="结束日期：" prop="endDate">
                         <DatePicker v-model="endDateMask" type="date" placeholder=""></DatePicker>
                    </FormItem>
                </Col>
            </Row>  
            <Row>  
                <Col span="12">
                    <FormItem label="月还款额：">
                        <input-number v-model="pInfo.monthPay" placeholder="月还款额" :allowNegative="false" :maxlength="16">
                            <span slot="append">{{currencyType}}</span> 
                        </input-number>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="担保方式：">
                        <Select v-model="pInfo.guaranteeType">
                            <Option v-for="(item, index) in guaranteeTypeList" :value="item.id" :key="index">{{item.text}}</Option>
                        </Select>   
                    </FormItem>
                </Col>
            </Row> 
            <Row>  
                <Col span="24">
                    <FormItem label="资产描述：" prop="remark">
                        <Input v-model="pInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="100字以内" :maxlength="512"></Input>
                    </FormItem> 
                </Col>
             
            </Row>  
        </Form>
    </div>        
</template>
<script>
    import { getPersonalDebtInfo,personalDebtSave,personalDebtUpdate } from '@/api/customer'
    import Dict from '@/components/global/dict'
    import {ymd} from '@/libs/util'

    export default {
        name:"PersonalDebtForm",
        props:{
            id: String,
            customerId:{
                type: String,
                required: true
            }
        },
        inject:{
            $modal:{default: null}
        },
        data() {
            return {
                pInfo:{
                    id:'',
                    customerId:'',
                    debtType:'',
                    loanOrg:'',
                    currency:'',
                    amount:'',
                    balance:'',
                    deadline:'',
                    startDate:'',
                    endDate:'',
                    monthPay:'',
                    guaranteeType:'',
                    remark:''
                },
                ruleValidate: {
                    debtType: [
                            { required: true, message: '负债类型必填'},
                    ],
                    loanOrg: [
                            { required: true, message: '借款机构必填'},
                    ],
                    amount: [
                            { required: true, message: '金额必填'},
                    ],
                    balance: [
                            { required: true, message: '余额必填'},
                    ],
                    deadline: [
                            { required: true, message: '期限必填'},
                    ],
                    startDate: [
                            { required: true, message: '开始日期必填'},
                    ],
                    endDate: [
                            { required: true, message: '结束日期必填'},
                    ],
                },
                debtType:Dict.NULL,
                currency:Dict.NULL,
                guaranteeType:Dict.NULL,
                currencyType:'元',
            }
        },
        computed: {
            startDateMask:{
                get(){
                    return this.pInfo.startDate ? new Date(this.pInfo.startDate):''
                },
                set(val){
                    this.pInfo.startDate = ymd(val)   
                }
            },
            endDateMask:{
                get(){
                    return this.pInfo.endDate ? new Date(this.pInfo.endDate):''
                },
                set(val){
                    this.pInfo.endDate = ymd(val)   
                }
            },
            debtTypeList(){
                return this.debtType.val()
            },
            currencyList(){
                return this.currency.val()
            },
            guaranteeTypeList(){
                return this.guaranteeType.val()
            }
        },
        methods:{
            fetch(){
                return Promise.resolve()
                    .then(res => {
                        if(this.id){
                            return getPersonalDebtInfo(this.id).then(res => {
                                Object.keys(this.pInfo).forEach(name => this.pInfo[name] = res.data.cstPersonalDebt[name])
                            })
                        }else{
                            this.pInfo.customerId = this.customerId
                            delete this.pInfo.id
                        }
                    })
            },
            changeCurrencyType(v){
                if(!v.label || v.label == '人民币'){
                    this.currencyType = '元'
                }else{
                    this.currencyType = v.label  
                }          
            }
        }, 
        mounted(){
            var $pInfo = this.$refs.pInfo

            this.$modal.onBtnClick("confirm", (next, options) => {
                $pInfo.validate(valid => {
                    if (valid) {
                        Promise.resolve()
                            .then(() => {
                                return this.id ? personalDebtUpdate(this.pInfo) : personalDebtSave(this.pInfo)
                            })
                            .then( res => this.$Message.success('Success!')
                                , err => options.closeModal = false)
                            .then(res => next())
                    }else{
                        options.closeModal = false
                        next()
                    }
                })
            })

            // 在窗口显示前加载数据
            this.$modal.beforeEnter((next) => {
                Promise.all([
                    Dict.get(["debtType","currency","guaranteeType"]), 
                    this.fetch()
                ])
                .then(args => {
                    var [groups] = args
                    Object.assign(this, groups)
                    this.changeCurrencyType({label:groups.currency.val(this.pInfo.currency)})
                    next()
                })
            })
        }   
    }           
</script>