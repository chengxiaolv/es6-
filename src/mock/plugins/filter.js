import mm from 'micromatch'
import mockignore from '@/mockignore'
import fs from 'fs'

const local = localStorage

let status = localStorage['shendun_mock']

if (typeof status == "undefined") {
	status = true
} else {
	status = status === "true"
}

// console.log(mockignore)
export default {
	install(Mock) {
		// 全局控制
		Mock.turnOn = () => {
			status = true
			localStorage['shendun_mock'] = true
		}

		Mock.turnOff = () => {
			status = false
			localStorage['shendun_mock'] = false
		}

		Mock.on("matched", e => {
			// 若总开关为false，则不mock任何请求
			if (!status) {
				e.matched = false;
			} else {
				// 根据配置，选择性 mock
				// mockignore 文件缺失时，会由webpack自动创建
				if (mockignore.findIndex(ignore => {
						return mm.isMatch(e.options.url, ignore)
					}) >= 0) {
					e.matched = false;
				}
			}
		})
	}
}
