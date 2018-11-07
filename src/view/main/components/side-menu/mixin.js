export default {
	methods: {
		showTitle(item) {
			return this.$config.useI18n ? this.$t(item.name) : ((item.meta && item.meta.title) || item.name)
		},
		showChildren(item) {
			if(item.children){
				var childs = item.children.filter(r => {
					if(r.meta && r.meta.hideInMenu == false){
						return false
					}

					return true
				})

				return childs.length > 0
			}
			
			return false
		}
	}
}
