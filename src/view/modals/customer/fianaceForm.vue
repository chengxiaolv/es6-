<template>
	<div>
		<Tabs v-model="tab" :animated="false" :format="['xls', 'xlsx']" :max-size="5120">
			<TabPane label="资产负债表" name="zcfz"></TabPane>
			<TabPane label="利润分配表" name="lrfp"></TabPane>
			<TabPane label="现金流量表" name="xjl"></TabPane>
			<TabPane label="全部" name="all"></TabPane>
		</Tabs>
		<Form ref="pInfo" :model="extraData" :rules="ruleValidate" :label-width="120" inline>
			<FormItem label="文件日期：" prop="dataDate">
				<DatePicker v-model="dataDateMask" type="date" placeholder="文件日期："></DatePicker>
			</FormItem>
			<FormItem>
				<a v-if="tab == 'zcfz'" :href="zcfzTpl">资产负债表模版下载<shield-icon type="download"></shield-icon></a>
				<a v-if="tab == 'lrfp'":href="lrfpTpl">利润分配表模板下载<shield-icon type="download"></shield-icon></a>
				<a v-if="tab == 'xjl'":href="xjlTpl">现金流量表模板下载<shield-icon type="download"></shield-icon></a>
				<a v-if="tab == 'all'":href="allTpl">全部模版下载<shield-icon type="download"></shield-icon></a>
			</FormItem>
		</Form>
		<Upload type="drag" :action="action" name="files" :data="extraData" 
			:show-upload-list="false"
			:before-upload="beforeUpload"
			:on-success="uploadDown">
			<div style="padding: 20px 0">
				<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
				<p>点击或者拖拽文件至此上传</p>
			</div>
		</Upload>
		<div style="margin-top: 10px;">
			<Table :columns='columns' :data='file.list' :loading="tLoading" height="270"></Table>
		</div>
	</div>
</template>
<script>
import baseURL from '_conf/url'
import Dict from '@/components/global/dict'
import {fileZip, fileDelete, fileList} from '@/api/oss'
import {ymd} from '@/libs/util'
import {pipeCell} from '@/components/grid/renderCell'

import shieldIcon from '@/components/icon'
import zcfzTpl from '@/assets/tpl/XX集团_企业_资产负债表模板.xls'
import lrfpTpl from '@/assets/tpl/XX集团_企业_利润分配表模板.xls'
import xjlTpl from '@/assets/tpl/XX集团_企业_现金流量表模板.xls'
import allTpl from '@/assets/tpl/XX集团_企业_全部模板.xls'

export default {
	components:{
		shieldIcon
	},
	props:{
		dataId: String
	},
	inject:{
		$modal:{default: null}
	},
	data(){
		return {
			// 上传表单
			tab: "zcfz",
			action: baseURL + "api/com/comoss/upload",
			sortType: Dict.NULL,
			dataDate: ymd(new Date()),
			file:{
				pageNo: 1,
	            pageSize: 99999,
	            total: 0,
	            list: []
			},
			// 表格
			tLoading: false,
			// 静态文件
			zcfzTpl,
			lrfpTpl,
			xjlTpl,
			allTpl,
			// 表单校验规则
			ruleValidate:{
				dataDate: [
					{ required: true, message: '文件日期必填', trigger: 'blur' }
				]
			}
		}
	},
	computed:{
		dataDateMask: {
			get(){
				return this.dataDate ? new Date(this.dataDate) : ''
			},
			set(val){
				this.dataDate = ymd(val)
			}
		},
		columns(){
			return [
                    { title: '报表日期', key: 'dataDate',  render: pipeCell("ymd")},
                    { title: '资产负债表', key: 'zcfz', render: this.checkAction},
                    { title: '利润分配表', key: 'lrfp', render: this.checkAction},
                    { title: '现金流量表', key: 'xjl', render: this.checkAction},
                    { title: '操作', key: 'action', align: 'center', render: this.fileAction}
                ]
		},
		extraData(){
			return {
				sortType: this.sortTypeVal,
				dataId : this.dataId,
				dataDate: this.dataDate
			}
		},
		sortTypeMap(){
			return {
				"zcfz": this.sortType.keyOf("资产负债表"),
				"lrfp": this.sortType.keyOf("利润分配表"),
				"xjl": this.sortType.keyOf("现金流量表"),
				"all": this.sortType.keyOf("全部模版")
			}
		},
		sortTypeVal(){
			return this.sortTypeMap[this.tab]
		}
	},
	methods:{
		fetch(){
			this.tLoading = true
			return fileList(this.file.pageNo, this.file.pageSize, this.dataId, 
					// 所有的报表类型
					Object.keys(this.sortTypeMap).reduce((acc, key) => {
							acc.push(this.sortTypeMap[key])

							return acc
						}, []).join(","))
				.then(res => {
					var pageData = res.data.page
                	var list = pageData.list

        			// 分组
        			var groups = {}
        			list = list.filter(v => !!v.dataDate)
        			list.forEach(v => {
        				if(groups[v.dataDate]){
        					groups[v.dataDate].push(v)
        				}else{
        					groups[v.dataDate] = [v]
        				}
        			})
        			list = []
        			Object.keys(groups).forEach(key => {
        				var group = groups[key]
        				var allType = this.sortTypeMap.all
        				var row = {
        					dataDate: key,
        					ids: group.reduce((acc, v) => acc.push(v.id) && acc, []).join(",")
        				}

        				row.zcfz = group.findIndex(v => v.sortType == this.sortTypeMap.zcfz || v.sortType == allType) >= 0
        				row.lrfp = group.findIndex(v => v.sortType == this.sortTypeMap.lrfp || v.sortType == allType) >= 0
        				row.xjl = group.findIndex(v => v.sortType == this.sortTypeMap.xjl || v.sortType == allType) >= 0

        				list.push(row)
        			})

		            this.file.total = parseInt(pageData.totalCount)
		            this.file.list = list

		            this.tLoading = false
				})
		},
		fileAction(h, data){
            var {row, column, index} = data

            return h('div', [
                h('Button', {
                    props: {
                        type: 'text',
                        size: 'small'
                    },
                    style: {
                        marginRight: '5px'
                    },
                    on: {
                        click: () => {
                        	fileZip(row.ids)
                        }
                    }
                }, '下载'),
                h('Button', {
                    props: {
                        type: 'text',
                        size: 'small'
                    },
                    on: {
                        click: () => {
                        	this.tLoading = true
                        	// 删除文件
                        	Promise.all(row.ids.split(",").map(id => fileDelete(id)))
                        		.then(res => this.fetch())
                        }
                    }
                }, '删除')
            ])
        },
        checkAction(h, data){
    		var {row, column, index} = data
    		var value = row[column.key]

    		return h(shieldIcon, {
    				props: {
    					type: value ? 'ok' : 'chahao'
    				},
    				style:{
    					color: value ? "#2d8cf0" : "gray"
    				}
    			})
        },
        beforeUpload(){
        	return this.$refs.pInfo.validate(valid => {
        		return valid ? Promise.resolve() : Promise.reject()
        	})
        },
        uploadDown(){
        	this.fetch()
        }
	},
	mounted(){
		this.$modal.beforeEnter(next => {
			Dict.get("sortType")
				.then(sortType => this.sortType = sortType)
				.then(res => this.fetch())
				.then(args => next())
		})
	}
}
</script>
