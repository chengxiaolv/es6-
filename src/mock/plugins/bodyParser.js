import qs from 'qs'

export default {
	install(Mock){
		Mock.on("beforeResponse", ({req, requestHeaders}) => {
			if(req.body){
				// 反序列化req数据，便于mock模版使用
				requestHeaders["Content-Type"].indexOf("json") >= 0 
					? req.body = JSON.parse(req.body)  
					: req.body = qs.parse(req.body) 
			}	
		})
	}
}