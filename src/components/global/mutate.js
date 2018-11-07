// 处理JSON.parse抛异常的问题
if(window.JSON){
	window.JSON.safeParse = function(str){
		try{
			var result = window.JSON.parse(str)

			return typeof result == "object" ? result : false
		}catch(e){
			return false
		}
	}
	
	if(typeof Array.prototype.groupBy == "undefined"){
		Array.prototype.groupBy = function(iteratee){
			if(typeof iteratee == "string"){
				var _id = iteratee

				iteratee = function(e){
					return e[_id]
				}
			}

			if(typeof iteratee != "function"){
				throw new TypeError("groupBy iteratee`s type must be String or Functiom")
			}

			var groups = {},
				key = ''

			this.forEach(v => {
				key = iteratee(v)
				groups[key] ? groups[key].push(v) : (groups[key] = [v])
			})

			return groups
		}
	}
}