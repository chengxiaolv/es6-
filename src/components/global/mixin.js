import Vue from 'vue'

// 权限功能
let permission = {
	props:{
		parentAccess: {
			type: String,
			default: ''
		},
		access:{
			type: String,
			default: ''
		}
	},
	computed:{
		routeAccess(){
			var r = this.$route
			return r && r.meta && r.meta.access || ''
		},
		fullAccess(){
			var parentAccess = this.parentAccess

			// 尝试继承最近父组件的fullAccess
			if(!parentAccess){
				var $parent = this.$parent
				
				while($parent && $parent.$options.name != "Main" && $parent !== this.$root){
					if($parent.fullAccess){
						parentAccess = $parent.fullAccess
						break;
					}

					$parent = $parent.$parent
				}
			}

			// 尝试继承路由access
			if(!parentAccess){
				parentAccess = this.routeAccess
			}

			return parentAccess + this.access
		}
	},
	methods:{
		/** 权限判断
		 * @param {*} action 功能点，目前分为6种 ['index', list', 'update', 'delete', 'info', 'save']
		 */
		hasAccess(action){
			// 用户权限数组
			var perms = this.$store.state.user.access || []

			// 权限判定
			return perms.findIndex(v => v.resource == `${this.fullAccess}:${action}`) >= 0
		} 
	}
}

Vue.mixin(permission)