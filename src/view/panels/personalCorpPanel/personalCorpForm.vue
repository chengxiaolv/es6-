<template>
	<div class="editform">
        <Form ref="pInfo" :model="pInfo" :rules="ruleValidate" :label-width="120">
        	 <Row>  
                <Col span="12">
                    <FormItem label="客户名称：" >
                        <Input disabled v-model="userName"  placeholder="客户名称"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="企业任职：" prop="position">
                        <Input v-model="pInfo.position" placeholder="企业任职" :maxlength="64"></Input> 
                    </FormItem>
                </Col>
            </Row> 
            <Row>  
                <Col span="12">
                    <FormItem label="企业名称：" prop="corpName">
                        <Input v-model="pInfo.corpName" placeholder="企业名称" :maxlength="128"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="社会信用代码：" prop="socialCreditCode">
                        <Input v-model="pInfo.socialCreditCode" placeholder="社会信用代码" :maxlength="64"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="企业性质：" prop="corpType">
                        <Select v-model="pInfo.corpType">
                            <Option v-for="(item, index) in corpTypeList" :value="item.id" :key="index">{{item.text}}</Option>
                        </Select> 
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="注册类型：" prop="regType">
                        <Select v-model="pInfo.regType">
                            <Option v-for="(item, index) in regTypeList" :value="item.id" :key="index">{{item.text}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>  
                <Col span="12">
                    <FormItem label="注册资本：" prop="regCapital">
                        <input-number v-model="pInfo.regCapital" placeholder="注册资本" :allowNegative="false" :maxlength="32">
                            <span slot="append">元</span>
                        </input-number>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="行业分类：" prop="category">
                        <loan-invest-tree v-model="pInfo.category"></loan-invest-tree>
                    </FormItem>
                </Col>
            </Row>
            <Row>  
                <Col span="12">
                    <FormItem label="营业开始时间：" prop="openTime">
                        <DatePicker v-model="openTimeMask" type="date" placeholder=""></DatePicker>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="营业结束时间：" prop="closeTime">
                         <DatePicker v-model="closeTimeMask" type="date" placeholder=""></DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="注册地址：" prop="regAddr">
                <Input v-model="pInfo.regAddr" placeholder="注册地址" :maxlength="64"></Input> 
            </FormItem>
            <FormItem label="通讯地址：" prop="contactAddr">
                <Input v-model="pInfo.contactAddr" placeholder="通讯地址" :maxlength="64"></Input> 
            </FormItem>
            <FormItem label="行业经营范围：" prop="busiScope">
                <Input v-model="pInfo.busiScope" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="50字以内" :maxlength="255"></Input>
            </FormItem>
            <FormItem label="备注：" prop="remark">
                <Input v-model="pInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="50字以内" :maxlength="255"></Input>
            </FormItem>
        </Form>
    </div>    	
</template>
<script>
	import { getPersonalCorpInfo,personalCorpSave,personalCorpUpdate,customerInfo } from '@/api/customer'
    import loanInvestTree from '@/components/form/loanInvestTree'
	import Dict from '@/components/global/dict'
	import {ymd} from '@/libs/util'

	export default {
		name:"PersonalCorpForm",
        components:{
            loanInvestTree
        },
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
                    position:'',
					corpName:'',
					socialCreditCode:'',
					corpType:'',
					regType:'',
					regCapital:'',
					category:'',
					openTime:'',
					closeTime:'',
					regAddr:'',
					contactAddr:'',
					busiScope:'',
					remark:''
				},
				userName:'',
				ruleValidate: {
                    corpName: [
                            { required: true, message: '企业名称必填'},
                    ],
                    socialCreditCode: [
                            { required: true, message: '社会信用代码必填'},
                    ],
                    openTime: [
                            { required: true, message: '营业开始时间必填'},
                    ],
                    closeTime: [
                            { required: true, message: '营业结束时间必填'},
                    ],
                },
                //字典对象
                corpType:Dict.NULL,
                regType:Dict.NULL,
                category:Dict.NULL,
			}
		},
		computed: {
            openTimeMask:{
                get(){
                    return this.pInfo.openTime ? new Date(this.pInfo.openTime):''
                },
                set(val){
                    this.pInfo.openTime = ymd(val)   
                }
            },
            closeTimeMask:{
                get(){
                    return this.pInfo.closeTime ? new Date(this.pInfo.closeTime):''
                },
                set(val){
                    this.pInfo.closeTime = ymd(val)   
                }
            },
            corpTypeList(){
                return this.corpType.val()
            },
            regTypeList(){
                return this.regType.val()
            },
            categoryList(){
                return this.category.val()
            },
        },
        methods:{
            fetch(){
                return Promise.resolve()
                    .then(res => {
                        if(this.id){
                            return getPersonalCorpInfo(this.id).then(res => {
                                Object.keys(this.pInfo).forEach(name => this.pInfo[name] = res.data.cstPersonalCorp[name])
                            })
                        }else{
                            this.pInfo.customerId = this.customerId
                            delete this.pInfo.id
                        }
                    })
            },
            getUserName(){
                return customerInfo(this.customerId).then(res => {
                    this.userName = res.data.cstCustomer.userName
                })
            }
        },
        mounted(){
            var $pInfo = this.$refs.pInfo

            this.$modal.onBtnClick("confirm", (next, options) => {
                $pInfo.validate(valid => {
                    if (valid) {
                        Promise.resolve()
                            .then(() => {
                                return this.id ? personalCorpUpdate(this.pInfo) : personalCorpSave(this.pInfo)
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
                    Dict.get(["corpType","regType","category"]), 
                    this.fetch()
                ])
                .then(args => {
                    var [groups] = args
                    Object.assign(this, groups)
                    this.getUserName()
                    next()
                })
            })
        }
	}			
</script>