import {type} from '@/libs/util'

const strategies = {}

class Strategy{
	constructor(options){
		options = options || []

		if(type(options) != 'array'){
			options = [options]
		}

		this._strats = []
		options.forEach(opt => {
			var executor = this.create(opt)

			if(executor){
				this._strats.push({
					type: opt.type,
					executor,
					rule: opt.rule
				})
			}
		})
	}
	
	// 子策略工厂函数
	create(options){
		if(strategies[options.type]){
			return new strategies[options.type](options)
		}else{
			// 默认接受 函数式策略
			if(options.execute && type(options.execute) == "function"){
				options.type = "Function"
				
				return {
					execute: options.execute
				}
			}
		}
	}

	// 执行函数
	execute(value, key, obj){
		var isMatch = false
		var result = value
		var t = ''

		for(var i=0; i<this._strats.length; i++){
			var strat = this._strats[i]
			
			// 多字段名匹配
			if(type(strat.rule) == "array"){
				isMatch = strat.rule.findIndex(v => v == key) >= 0
			}

			// 单字段名匹配
			if(type(strat.rule) == "string"){
				isMatch = strat.rule == key
			}

			// 自定义规则匹配
			if(type(strat.rule) == "function"){
				isMatch = strat.rule(key)
			}

			// 任意匹配
			if(!strat.rule){
				isMatch = true
			}

			if(isMatch){
				t = strat.executor.execute(result, key, obj)

				if(t){
					result = t
				}
			}
		}

		return result
	}

	// 注册策略
	static register(type, cst){
		if(!type){
			throw new RangeError("type不能为空")
		}

		strategies[type] = cst

		return this
	}

	static unregister(type){
		if(strategies[type]){
			delete strategies[type]

			return true
		}

		return false
	}
}

Strategy.NULL = new Strategy()

export default Strategy