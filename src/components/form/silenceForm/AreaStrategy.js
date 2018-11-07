import {Strategy} from './index'

class AreaStrategy{
	constructor(options) {
		
	}
	
	execute(value, key, obj) {
		if(!value){
			return ''
		} 
		var temp = ""
		var area = JSON.parse(value)
		Object.keys(area).forEach(n=> temp = temp + " " + area[n].name)
		return temp
	}
}

Strategy.register("Area", AreaStrategy)