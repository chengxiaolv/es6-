<template>
	<div class="editform">
		<Form ref="cInfo" :model="cInfo" :rules="ruleValidate" :label-width="180">
			<Row>
                <Col span="12">
	                <FormItem label="商业资信状况:" prop="creditStat">
	                    <Select v-model="cInfo.creditStat">
							<Option v-for="(item, index) in creditStatList" :value="item.id" :key="index">{{item.text}}</Option>
						</Select>
	                </FormItem>
	            </Col>
                <Col span="12">
	                <FormItem label="有无拖欠国家税款:" prop="arrearsTax">
	                    <Select v-model="cInfo.arrearsTax">
	                    	<Option :value="1">是</Option>
	                    	<Option :value="0">否</Option>
						</Select>
	                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
	                <FormItem label="企业为他人担保的履约情况:" prop="guaranteeStat">
	                    <Input v-model="cInfo.guaranteeStat" placeholder="企业为他人担保的履约情况" :maxlength="32"></Input>
	                </FormItem>
                </Col>
            </Row>
            <Row>           
                <Col span="12">
	                <FormItem label="有无拖欠职工工资:" prop="arrearsEmployee">
	                    <Select v-model="cInfo.arrearsEmployee">
							<Option :value="1">是</Option>
	                    	<Option :value="0">否</Option>
						</Select>
	                </FormItem>
                </Col>
                <Col span="12">
	                <FormItem label="有无拖欠水电费、租金:" prop="arrearsRent">
	                    <Select v-model="cInfo.arrearsRent">
							<Option  :value="1">是</Option>
	                    	<Option  :value="0">否</Option>
						</Select>
	                </FormItem>
                </Col>
            </Row>
            <Row>	
				<Col span="24">
					<FormItem label="备注：" prop="remark">
		                <Input v-model="cInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="备注" :maxlength="512"></Input>
		            </FormItem>
				</Col>
			</Row>
		</Form>
	</div>		
</template>
<script>
	import {getCreditInfo,creditSave,creditUpdate} from '@/api/customer'
	import Dict from '@/components/global/dict'

	export default {
		name:'CreditForm',
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
            	cInfo:{
            		id: '',
                    customerId: '',
            		creditStat:'',
					arrearsTax:'',
					guaranteeStat:'',
					arrearsEmployee:'',
					arrearsRent:'',
					remark:''	
            	},
            	ruleValidate:{
            		creditStat:[
                        { required: true, message: '商业资信状况必填'}
                    ],
                    guaranteeStat:[
                    	{ required: true, message: '企业为他人担保的履约情况必填'}
                    ],
                    arrearsRent:[
                    	{ required: true, message: '有无拖欠水电费、租金必填'}
                    ]
            	},
            	creditStatList:{},
            }
        },
        methods:{
            fetch(){
                return Promise.resolve().then(res=>{
                       return getCreditInfo(this.customerId).then(res => {
                            if(res.data && Object.keys(res.data).length){
                                Object.keys(this.cInfo).forEach(name => this.cInfo[name] = res.data.cstPersonalCredit[name])       
                            }else{
                                this.cInfo.customerId = this.customerId
                                delete this.cInfo.id 
                            }
                        })                              
                })    
            }
        }, 
        mounted(){
            var $cInfo = this.$refs.cInfo
            
            this.$modal.onBtnClick("confirm", (next, options) => {
                $cInfo.validate(valid => {
                    if (valid) {
                        Promise.resolve()
                            .then(() => {
                                return this.cInfo.id ? creditUpdate(this.cInfo) : creditSave(this.cInfo)
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
                    Dict.get("creditStat"), 
                    this.fetch()
                ])
                .then(args => {
                    var [groups] = args
                    this.creditStatList = groups.val()
                    next()
                })
            })
        } 
	}
</script>