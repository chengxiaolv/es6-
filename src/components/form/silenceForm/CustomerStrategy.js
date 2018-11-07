import {Strategy} from './index'

class CustomerStrategy{
	constructor(options){
		options = options || {}
		
		this._exec = options.execute || (value) => value
	}

	execute(value, key, obj){
		return this._exec(value, key, obj)
	}
}

Strategy.register("Customer", CustomerStrategy)