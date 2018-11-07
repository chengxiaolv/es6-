
import {Strategy} from './index'
import {currency} from '@/libs/util'

class CurrencyStrategy {
	constructor(options) {
		options = options || {}
	}
	
	execute(value, key, obj) {
		return currency(value)
	}
}

Strategy.register("Currency", CurrencyStrategy)
