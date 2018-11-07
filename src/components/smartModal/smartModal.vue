<template>
	<Modal class="svu-smart-modal" :class="classes" ref="innerModal"
		:className="'svu-smart-modal-wrap'"
		:styles="modalStyles"
		:value="value"
		:width="width"
		:footerHide="true"
		:closable="false"
		:mask-closable="false"
		@input="onInput"
		@on-cancel="onCancel"
		@on-ok="onOk"
		@on-hidden="onHidden"
		@on-visible-change="onVisibleChange"
		@click.native="maskClick">
		<span slot="close"></span>
		<div class="svu-smart-modal-header">
	    	{{title}}
			<shield-icon v-if="closable" type="chahao" class="svu-smart-modal-close" @click="onClose"></shield-icon>
    	</div>
    	<loading-bar ref="loadingBar" style="position: absolute; top: 50px;"></loading-bar>
    	<div class="svu-smart-modal-body" :style="bodyStyles">
			<div v-show="!loading">
    			<slot></slot>
    		</div>
    	</div>
    	<div class="svu-smart-modal-footer">
    		<Button v-for="(btn, index) in normalBtns" :type="btn.type" :loading="loadingBtnName == btn.name"
    			@click="onBtnClickHandler(btn)">
    			{{btn.text}}
    		</Button>
    	</div>
	</Modal>
</template>
<style lang="scss">
	.svu-smart-modal{
		.ivu-modal{
			overflow: hidden;
			.ivu-modal-body{
				padding: 0;
			}
		}
		
		.svu-smart-modal-header{
			line-height: 22px;
			padding: 14px 16px;
			border-bottom: 1px solid $c-gray-bd;
			font-size: 14px;

			.svu-smart-modal-close{
				float: right;
				cursor: pointer;
			}
		}

		.svu-smart-modal-body{
			overflow: auto;
			position: relative;
			padding: 16px;
		}

		.svu-smart-modal-footer{
			text-align: center;
			height: 54px;
			line-height: 54px;

			.ivu-btn{
				margin: 0 10px;
			}
		}
    }

	.svu-smart-modal-vertical-center{
		.svu-smart-modal-wrap{
			display: flex;
	        align-items: center;
	        justify-content: center;
		}
	}
</style>
<script>
	import shieldIcon from '@/components/icon'
	import emitter from '@/components/mixins/emitter'
	import {runQueue} from '@/components/global/queue'
	import loadingBar from './loadingBar'

	export default {
		name: "smartModal",
		components:{
			shieldIcon,
			loadingBar
		},
		mixins: [emitter],
		provide(){
			return {
				$modal: this
			}
		},
		props: {
			value: Boolean,

			width: {
				type: Number,
				default: 960
			},
			height: {
				type: [Number, String],
				default: "auto"
			},
			title:{
				type: String,
				default: ""
			},
			verticalCenter:{
				type: Boolean,
				default: true
			},
			top: {
				type: Number,
				default: 20
			},
			buttons:{
				type: Array,
				default: function(){
					return [
						{type: "primary", text: "确定", name: "confirm"},
						{type: "text", text: "取消", name: "cancel"}
					]
				}
			},
			closable: {
				type: Boolean,
				default: true
			},
			maskClosable: {
				type: Boolean,
				default: true
			}
		},
		data(){
			return {
				loading: true,
				btnLoading: false,
				loadingBtnName: "",
				// 弹出框生命周期钩子
				beforeEnterHook: [],
				afterEnterHook: [],
				// 按钮事件钩子
				btnClickHook: {}
			}
		},
		computed:{
			classes(){
				return {
					"svu-smart-modal-vertical-center" : this.verticalCenter
				}
			},
			modalStyles(){
				return {
					"top" : this.verticalCenter ? 0 : this.top + "px"
				}
			},
			bodyStyles(){
				return {
					"height" : isNaN(this.height) ? this.height : this.height - 54 - 51 + "px"
				}
			},
			normalBtns(){
				return this.buttons.map(t => Object.assign({
						closeModal: true
					}, t))
			}
		},
		methods:{
			onInput(v){
				this.$emit("input", v)
			},
			onClose(e){
				this.close()
			},
			onCancel(){
				this.$emit("on-cancel")
			},
			onOk(){
				this.$emit("on-ok")
			},
			onVisibleChange(val){
				this.$emit("on-visible-change", val)
			},
			onHidden(){
				this.$emit("on-hidden")
			},
			onBtnClickHandler(btn){
				var name = btn.name,
					queue = this.btnClickHook[name] || [],
					options = {}

				if(this.btnLoading) return

				this.btnLoading = true
				this.loadingBtnName = name

				// 执行按钮响应队列
				runQueue(queue, (hook, next) => {
						hook(next, options)
					}, () => {
						var ops = Object.assign({}, btn , options)

						if(ops.closeModal){
							// 队列执行完毕后关闭Modal
							this.close()
						}else{
							this.unloading()
						}
					})

				// this.broadcast("iForm", "smart-modal-" + name, this)
				// this.$emit("smart-modal-" + name, this)
				// this.$modal.$emit("smart-modal-" + name)
			},
			unloading(){
				this.btnLoading = false
				this.loadingBtnName = ""
			},
			close(){
				if(this.loadingBtnName){
					this.$emit(`close-by-${this.loadingBtnName}`)
				}
				this.unloading()
				this.$refs.innerModal.close()
			},
			EscClose (e) {
				var m = this.$refs.innerModal

                if (m && m.visible && this.closable) {
                    if (e.keyCode === 27) {
                        this.close();
                    }
                }
            },
            maskClick(e){
            	const className = event.target.getAttribute('class');
                if (className && className.indexOf("svu-smart-modal-wrap") > -1){
                	if(this.maskClosable){
                		this.close()
                	}
            	}
            },
            getChildren(){
            	var $innerModal = this.$refs.innerModal

            	return $innerModal.$children
            },
            beforeEnter(fn){
            	this.beforeEnterHook.push(fn)
            },
           	afterEnter(fn){
           		this.afterEnterHook.push(fn)
           	},
           	onBtnClick(name, fn){
           		this.btnClickHook[name] 
           			? this.btnClickHook[name].push(fn) 
           			: this.btnClickHook[name] = [fn] 
           	},
           	clearHook(){
           		this.beforeEnterHook = []
				this.afterEnterHook = []
				this.btnClickHook = {}
           	}
		},
		mounted(){
			if(this.closable){
				document.addEventListener('keydown', this.EscClose)
			}
		},
		watch:{
			value(val){
				var modal = this,
					$loadingBar = this.$refs.loadingBar

				if(val){
					this.loading = true
					$loadingBar.start()
					// 需要等待子组件创建挂载完毕
					this.$nextTick(function () {
						runQueue(modal.beforeEnterHook, (hook, next) => {
								hook(next)
							}, () => {
								// 加载完毕
								// console.log("Modal加载完毕")
								modal.loading = false
								$loadingBar.finish()
								
								runQueue(modal.afterEnterHook, (hook, next) => {
									hook(next)
								})
							})
					})
				}else{
					this.loading = true
					$loadingBar.reset()
					// 防止子组件重复注册事件
					this.clearHook()
				}
			}
		}
	}
</script>