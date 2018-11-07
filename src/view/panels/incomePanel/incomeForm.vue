<template>
    <div class="editform">
        <Form ref="iInfo" :model="iInfo"  :rules="ruleValidate" :label-width="140">
            <Row>
                <Col span="24">
                <FormItem label="主要经济来源:" prop="mainIncome">
                    <Input v-model="iInfo.mainIncome" placeholder="主要经济来源" :maxlength="64"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="其他经济来源:" prop="otherIncome">
                    <Input v-model="iInfo.otherIncome" placeholder="其它经济来源" :maxlength="64"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="家庭月收入:" prop="familyIncomeInMonth">
                    <input-number v-model="iInfo.familyIncomeInMonth" placeholder="家庭月收入" :allowNegative="false" :maxlength="16">
                        <span slot="append">元</span> 
                    </input-number>         
                </FormItem>
                </Col>
                
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="个人月收入:" prop="personalIncomeInMonth">
                    <input-number v-model="iInfo.personalIncomeInMonth" placeholder="个人月收入" :allowNegative="false" :maxlength="16">
                        <span slot="append">元</span> 
                    </input-number>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="家庭月支出:" prop="familyMonthExpend">
                    <input-number v-model="iInfo.familyMonthExpend" placeholder="家庭月支出" :allowNegative="false" :maxlength="16">
                        <span slot="append">元</span> 
                    </input-number>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="个人月支出:" prop="personMonthExpend">
                    <input-number v-model="iInfo.personMonthExpend" placeholder="个人月支出" :allowNegative="false" :maxlength="16">
                        <span slot="append">元</span> 
                    </input-number>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="家庭人口数:" prop="familyMember">
                    <input-number v-model="iInfo.familyMember" placeholder="家庭人口数" :allowNegative="false" 
                        :allowDecimal="false" :includeThousandsSeparator="false" :maxlength="2">
                        <span slot="append">人</span> 
                    </input-number>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <FormItem label="供养人口数:" prop="supportMember">
                    <input-number v-model="iInfo.supportMember" placeholder="供养人口数" :allowNegative="false" 
                        :allowDecimal="false" :includeThousandsSeparator="false" :maxlength="2">
                        <span slot="append">人</span> 
                    </input-number>
                </FormItem>
                </Col>
            </Row>
        </Form>    
    </div>    
</template>
<script>
    import {getIncomeInfo,incomeInfoSave,incomeInfoUpdate} from '@/api/customer'

    export default{
        name:"incomeInfo",
        props:{
            customerId: {
                type: String,
                required: true
            }
        },
        inject:{
            $modal:{default: null}
        },
        data(){
            return{
                iInfo: {
                    id: '',
                    customerId: '',
                    mainIncome: '',
                    otherIncome: '',
                    familyIncomeInMonth: '',
                    personalIncomeInMonth: '',
                    familyMonthExpend: '',
                    personMonthExpend: '',
                    familyMember: '',
                    supportMember: ''
                },
                ruleValidate:{
                    mainIncome:[
                        { required: true, message: '主要经济来源必填', trigger: 'blur' }
                    ],
                    familyIncomeInMonth:[
                        { required: true, message: '家庭月收入必填', trigger: 'blur' }
                    ],
                    personalIncomeInMonth:[
                        { required: true, message: '个人月收入必填', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            fetch(){
                return Promise.resolve().then(res=>{
                       return getIncomeInfo(this.customerId).then(res => {
                            if(res.data && Object.keys(res.data).length){
                                Object.keys(this.iInfo).forEach(name => this.iInfo[name] = res.data.cstPersonalIncomeExpend[name])       
                            }else{
                                this.iInfo.customerId = this.customerId
                                delete this.iInfo.id 
                            }
                        })                              
                })    
            }
        },
        mounted(){
            var $iInfo = this.$refs.iInfo

            this.$modal.onBtnClick("confirm", (next, options) => {
                $iInfo.validate(valid => {
                    if (valid) {
                        Promise.resolve()
                            .then(() => {
                                return this.iInfo.id ? incomeInfoUpdate(this.iInfo) : incomeInfoSave(this.iInfo)
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
                Promise.resolve(this.fetch()).then(args => {
                    next()
                })
            })
        }
    }   
</script>