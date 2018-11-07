import {Strategy} from './index'

class DictStrategy{
	constructor(options){
		options = options || {}
		
		this._dicts = options.dicts || {}
	}

	execute(value, key, obj){
		var dict = this._dicts[key]
		//console.log(dict);
		
		return dict ? dict.val(value) : ''
	}
}

Strategy.register("Dict", DictStrategy)
