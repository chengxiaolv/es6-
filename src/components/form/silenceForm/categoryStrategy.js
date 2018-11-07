import {Strategy} from './index'

class CategoryStrategy{
	constructor(options) {
		
	}
	
	execute(value, key, obj) {
		if(!value){
			return ''
		} 
	
	}
}

Strategy.register("Category", categoryStrategy)