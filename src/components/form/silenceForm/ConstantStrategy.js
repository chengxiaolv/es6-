import {Strategy} from './index'

class ConstantStrategy {
	constructor(options) {
		options = options || {}

		this._constant = options.constant || {}
	}
	
	execute(value, key, obj) {
		var result = this._constant.displayNameOf(value)
		return result?result:''
	}
}

Strategy.register("Constant", ConstantStrategy)
