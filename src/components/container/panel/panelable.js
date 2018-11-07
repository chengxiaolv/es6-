// mixin，让普通组件支持panel折叠效果
export default {
	data() {
		return {
			// panel组件相关
			isActive: false,
			index: -1,
			panelName: "p"
		}
	},
	methods: {
		// panel展开/收缩接口
		toggle(data) {
			this.$parent.toggle(data)
		}
	},
	watch: {
		// 衔接collpse接口
		isActive(val) {
			this.$refs[this.panelName].isActive = val
		},
		index(val) {
			this.$refs[this.panelName].index = val
		}
	}
}
