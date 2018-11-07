<template>
	<div class="svu-silence-form">
		<Row>
			<Col v-for="(fields, index) in formData" :key="index" :span="24/cols">
				<Row class="svu-silence-form-row" v-for="(item, index) in fields" :key="index">
					<Col span="6">
						<span class="svu-silence-form-title">{{item.title}}：</span>
					</Col>
					<Col span="18">
						<span class="svu-silence-form-value">{{item.value}}</span>
					</Col>
				</Row>
			</Col>
		</Row>
	</div>
</template>
<style lang="scss">
	.svu-silence-form-row{
		margin: 14px 0;
		font-size: 12px;
	}
	.svu-silence-form-title{
		color: #ADB4BF;
		font-size: 12px;
	}
</style>
<script>
	import {Strategy} from './index'

	export default {
		props:{
			cols: {
				type: Number,
				default: 2
			},
			data: {
				type: Object,
				default: function(){
					return {}
				}
			},
			prefix: {
				type: String,
				default: ''
			},
			strategy: {
				validator: function (value) {
					return typeof value.execute == "function"
				},
				default: function(){
					return Strategy.NULL
				}
			}
		},
		computed:{
			normalizeData(){
				console.log(data);
				var data = [],
					info = this.data

                Object.keys(info).forEach(key => {
                    var _title = this.$t(this.prefix + key)
                    var _value = this.strategy.execute(info[key], key, info) 

                    if(_title){
                        data.push({
                            title: _title,
                            value: _value
                        })
                    }
                })

				return data
			},
			formData(){
				var formData = []
				for(var i=0; i<this.cols;i++){
					formData[i] = []
				}

				this.normalizeData.forEach((item, index) => {
					formData[index % this.cols].push(item)
				})

				return formData
			}
		}
	}
</script>