<template>
	<div class="todo-page">
        <Card shadow>
        	<Row class="row-line">
        		<Col span='16'>
        			<Button class='view-btn' size="small" :type="stat == 0 ? 'primary' : 'text'" @click="switchView(0)">全部</Button>
                    <Button class='view-btn' size="small" :type="stat == 3 ? 'primary' : 'text'" @click="switchView(3)">未办理</Button>
                    <Button class='view-btn' size="small" :type="stat == 1 ? 'primary' : 'text'" @click="switchView(1)">已通过</Button>
                    <Button class='view-btn' size="small" :type="stat == 2 ? 'primary' : 'text'" @click="switchView(2)">未通过</Button>
                </Col>
        	</Row>
            <!--<Row>
                <Col span='16'>
                	<Button class='view-btn' size="small" type="primary">全部</Button>
                    <Button class='view-btn' size="small" type="text">审批任务</Button>
                    <Button class='view-btn' size="small" type="text">催收任务</Button>
                    <Button class='view-btn' size="small" type="text">检查任务</Button>
                    <Button class='view-btn' size="small" type="text">关注任务</Button>
                </Col>
                <Col span='8'>
                    <grid-searcher class="todo-search-container"
                        placeholder="客户名称/证件号码"
                        v-model="searchValue"
                        @search="fetch">
                    </grid-searcher>
                </Col>
            </Row>-->
            <Row>
                <Col span="20">
                    <div v-if="Object.keys(AuditList).length == 0" class="no-data-list">暂无数据</div>
                	<div v-for="(item, index) in AuditList" class="audit-list">
                		<div class="header">	
                		【{{item.type}}】 {{item.title}}  {{item.createTime|ymdL}}
                		</div>
                		<div class="content">
                			<Row>
                				<Col span="5">
                    				客户：{{item.userName}}
                				</Col>
                				<Col span="5">
                    				申请金额：{{item.applyAmount}}
                				</Col>
                				<Col span="5">
                    				申请期限：{{item.applyTerm}}个月
                				</Col>
                				<Col span="5">
                    				申请利率：{{item.applyRate}}%
                				</Col>
                				<Col span="4" style="text-align: center;">
                    				<Button  type="primary" size="small" @click="jumpDetail(item.dataId)">
	                                    审批
	                                </Button>
                				</Col>
                			</Row>
                			<Row>
                				<Col span="6">
                    				发起人：{{item.nickName}}
                				</Col>
                				<Col span="6">
                    				合作渠道：{{item.productType}}
                				</Col>
                			</Row>	
                		</div>	
                	</div>
            	</Col>
                <Col span="4">
                    <timeline style="width: 100px; margin: 20px auto 0;"
                        :value.sync="currentPoint"
                        :multiple="false"
                        @change="fliterData">
                        <timeline-item v-for='(item, index) in points' :name="item">
                            {{item}}
                        </timeline-item>
                    </timeline>
                </Col>
            </Row>	
        </Card>
    </div>  
</template>
<style lang='scss' scoped>
	.audit-list{
		border-width:1px;
		border-style:solid;
		border-color:rgba(233, 234, 236, 1);
		width: 100%;
		min-height: 100px;
		padding-top:10px;
		margin-top:10px;
		.header{
			font-weight: 800;	
		}
		.content{
			padding-left:8px;
			padding-top:8px;
		}
	}
    .no-data-list{
        text-align: center;
        padding-top: 100px;
    }
	.todo-page {
		background: $c-gray-bg;
		margin: 10px;	
	}
	.card-header{
	 	.w-pager {
	 		line-height: 32px;
	 		float: right;
	 	}
	 }
	.view-btn{
		margin-right: 20px;
	}
    
    .todo-search-container{
        float: right;
    }
    .row-line{
    	padding-bottom:20px;
    }
</style>
<script>
	import shieldIcon from '@/components/icon'
	import gridSearcher from '@/components/grid/searcher'
	import Dict from '@/components/global/dict'
	import {auditAll} from '@/api/flow'
    import {ymdL} from '@/libs/util'

	function fetchData(stat){
        return Promise.all([
        	/*
            Dict.get([
                
            ]),
            */
            auditAll({stat:stat}),
        ])
    }

    function genDataArray(){
        var Time = new Array()
        var dateNow = new Date()
        var end = ymdL(dateNow) 
        Time['全部'] = {}
        Time['1小时内'] = {startTime:ymdL(new Date(dateNow.getTime()-1000*60*60)),endTime:end}
        Time['3小时内'] = {startTime:ymdL(new Date(dateNow.getTime()-1000*60*60*3)),endTime:end}
        Time['5小时内'] = {startTime:ymdL(new Date(dateNow.getTime()-1000*60*60*5)),endTime:end}
        Time['8小时内'] = {startTime:ymdL(new Date(dateNow.getTime()-1000*60*60*8)),endTime:end}
        Time['今天内'] = {startTime:ymdL(new Date(dateNow.getTime()-1000*60*60*24)),endTime:end}
        Time['三天时内'] = {startTime:ymdL(new Date(dateNow.getTime()-1000*60*60*24*3)),endTime:end}
        Time['一周内'] = {startTime:ymdL(new Date(dateNow.getTime()-1000*60*60*24*7)),endTime:end}
        Time['一个月内'] = {startTime:ymdL(new Date(dateNow.getTime()-1000*60*60*24*30)),endTime:end}
        Time['一年内'] = {startTime:ymdL(new Date(dateNow.getTime()-1000*60*60*24*365)),endTime:end}
        return Time
    }

	export default {
		components: {
	        gridSearcher,
	        shieldIcon
		},
		data(){
			return{
				stat: 0,
                startTime:'',
                endTime:'',
				AuditList:{},
				searchValue: '',
                currentPoint: ["全部"]
			}
		},
        computed:{
            TimelineList:function(){
                return genDataArray()
            },
            points:function(){
                return Object.keys(genDataArray())
            }
        },
		methods: {
			fillData(args){
				var [AuditList] = args
				this.setAuditList(AuditList)
			},
			switchView(view) {
	            this.stat = view
	            this.fetch()
	        },
	        fetch(){
	        	auditAll({stat:this.stat,startTime:this.startTime,endTime:this.endTime})
                    .then(res => {
                        this.setAuditList(res)
                    })
	        },
	        setAuditList(data){
                this.AuditList = data.data.list || {}
            },
            jumpDetail(id){
            	this.$router.push({
                    name: 'materials-detail',
                    params: {
                        id: id
                    }
                })
            },
            fliterData(data){
                var choiseTime = this.TimelineList[data.name]
                this.startTime = choiseTime.startTime
                this.endTime = choiseTime.endTime
                this.fetch()
            }
		},
		beforeRouteEnter (to, from, next) {
            fetchData(0)
                .then(args => {
                    next(vm => vm.fillData(args))
                })
        },

        // when route changes and this component is already rendered,
        // the logic will be slightly different.
        beforeRouteUpdate (to, from, next) {
            fetchData(0)
                .then(args => {
                    this.fillData(args)
                    next()
                })
        }
	}	
</script>
