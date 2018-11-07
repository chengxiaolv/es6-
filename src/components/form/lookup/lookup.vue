<template>
	<div class="svu-lookup">
		<div class="svu-lookup-content" @click="onSearch">
			<div class="svu-lookup-item" v-for="(item, i) in options">
				{{item.text}}
				<shield-icon v-if="options.length > 1 && isEditable" type="chahao" class="svu-lookup-deselect" 
					:data-value="item.value"
					@click.native="deSelect">
				</shield-icon>
			</div>
		</div>
		<shield-icon v-if="isClearable" type="chahao" class="svu-lookup-clear" @click.native="onClear"></shield-icon>
		<shield-icon type="search" class="svu-lookup-search-icon" @click.native="onSearch"></shield-icon>
		<smart-modal ref="innerModal"
			v-model="showModal"
			:title="title"
			:height="modalHeight"
			:buttons="[]"
			@on-visible-change='onVisibleChange'>
	        <slot></slot>
	    </smart-modal>
	</div>
</template>
<script>
	import shieldIcon from "@/components/icon"
	import smartModal from "@/components/smartModal"
	import emitter from '@/components/mixins/emitter'
	import {type} from '@/libs/util'

	export default {
		name: "Lookup",
		mixins: [emitter],
		components: {
			shieldIcon,
			smartModal
		},
		props: {
			size: {
				type: String,
				default: "default"
			},
			value: {
				type: Array,
				default: function() {
					return []
				}
			},
			disabled: {
				type: Boolean,
				default: false
			},
			readonly:{
				type: Boolean,
				default: false
			},
			clearable: {
				type: Boolean,
				default: true
			},
			label: {
				type: String,
				default: "text"
			},
			keyWord: {
				type: String,
				default: "value"
			},
			elementId:{
				type: String,
				default: ''
			},
			trigger: {
				type: String,
				default: 'confirm'
			},
			modalHeight: {
				type: Number,
				default: 640
			},
			title: {
				type: String,
				default: ""
			}
		},
		data(){
			return {
				showModal: false,
				$win: null
			}
		},
		model:{
			prop: "value",
			event: "change"
		},
		computed:{
			isEditable(){
				return !this.readonly && !this.disabled
			},
			isClearable(){
				if(this.clearable && this.isEditable){
					if(this.value.length > 0) return true
				}

				return false
			},
			options(){
				// normalize
				return this.value.map(v => {
					var _value = v[this.keyWord]
					var _text = v[this.label]

					return {
						value: _value,
						text: _text || _value
					}
				})
			}
		},
		methods:{
			onClear(e){
				this.$emit("change", [])
 			},
 			deSelect(e){
 				var target = e.target

 				if(target.className.indexOf('svu-lookup-deselect') >= 0){
 					var _value = target.dataset.value
 					var selected = this.value.slice()

 					selected.splice(this.options.findIndex(v => v.value == _value), 1)
 					this.$emit("change", selected)
 				}
 			},
 			onSearch(e){
 				if(this.isEditable) this.showModal = true
 			},
 			onChange(data){
 				if(type(data) != "array"){
 					data = [data]
 				}

 				this.$emit("change", data)
 				// 触发表单校验
 				this.dispatch('FormItem', 'on-form-blur', this.value)
 			},
 			onVisibleChange(isShow){
 				if(this.$win){
 					if(isShow){
 						this.$win.setData(this.value)
					}
 				}
 			}
		},
		mounted(){
			var $modal = this.$refs.innerModal

			// // 寻找子窗体，modal的第一个内容子组件
			this.$win = $modal.getChildren()[2] 

			if(this.$win){
				this.$win.$on("close", data => {
					this.onChange(data)
					$modal.close()
				})
			}
		}
	}
</script>
