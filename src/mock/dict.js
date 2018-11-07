import Mock from './mock'
import dict from './plugins/dictData'

function convert(s){
	var result = {}

	s.split("&").forEach(v => {
		var r1 = v.split(":")

		result[r1[0].trim()] = {
			pid: "@uuid",
			list: r1[1].trim().split(' ').map(text => ({id: "@uuid", text}))
		}
	})

	return result
}

// 读取字典
Mock.mock(/dict\/list/, ({ body }) => {
	var groupName = body.sortVal.split(",")
	var data = {}

	groupName.forEach(name => data[name] = dict[name])

	return {
		"code": 200,
		data
	}
})

// 新增字典
Mock.mock(/dict\/save/, ({ body }) => {
	return {
		code: 200
	}
})
