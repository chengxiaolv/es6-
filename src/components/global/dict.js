import { dictList, dictSave } from '@/api/common'
import { type } from '@/libs/util'

function eopt(option) {
	if (typeof option == "object") {
		return {
			id: option.id,
			text: option.text,
			originText: option.originText
		}
	}

	return option
}

class Group {
	constructor(name, pid, list) {
		this._list = list ? list.map(v => ({
			id: v.id,
			text: v.text,
			// 记录原始值，追踪变化
			originText: v.text,
			changed: false
		})) : []

		this._groupName = name
		this._pid = pid
		// 记录创建时间
		this._createdTime = (new Date()).getTime()
	}

	val(key, value) {
		// val() 返回option列表
		if (arguments.length <= 0) {
			return this._list.map(v => eopt(v))
		}

		if (arguments.length >= 1) {
			// val(key) 返回单个option
			if (typeof value == "undefined") {
				var opt = this._list.find(item => item.id == key)

				return opt ? eopt(opt).text : void(0)
			} else {
				// val(key, value) 修改单个option
				var index = this._list.findIndex(v => v.id == key)
				var opt = this._list[index]

				if (opt) {
					opt.text = value
					if (opt.originText) {
						opt.changed = opt.originText != value
					}
				} else {
					this._list.push({ id: key, text: value, originText: null, changed: true })
					index = this._list.length - 1
				}

				return index
			}
		}
	}

	find(key) {
		if (typeof key == "function") {
			return eopt(this._list.find(key))
		} else {
			return eopt(this._list.find(item => item.id == key))
		}
	}

	findAll(predicate) {
		return this._list.filter(predicate).map(v => eopt(v))
	}

	keyOf(text) {
		var target = this.find(v => v.text == text)
		
		return target ? target.id : null
	}

	// 提交变更到后台
	update() {
		return Promise.all(this._list
			.filter(v => v.changed)
			.map(v => dictSave(this._pid, v.text)))
	}

	// 静态成员
	static create(name, pid, list) {
		return new Group(name, pid, list);
	}
}

// DICT cache
var DICT = {}

export default {
	// 获取group，如果sync为true则忽略缓存
	get(groupName, sync) {
		var result = {},
			isSingle = false

		if (type(sync) == "undefined") {
			sync = false
		}

		if (type(groupName) == "string") {
			groupName = [groupName]
			isSingle = true
		}

		if (type(groupName) == "array") {
			var groups = [],
				strangers = []

			return Promise.resolve()
				.then(res => {
					groupName.forEach(name => {
						if (DICT[name] && sync == false) {
							groups.push(DICT[name])
						} else {
							strangers.push(name)
						}
					})
				})
				.then(res => {
					if (strangers.length > 0) {
						return dictList(strangers.join(","))
							.then(res => {
								res = res.data

								Object.keys(res).forEach(name => {
									groups.push(DICT[name] = Group.create(name, res[name].pid, res[name].list))
								})
							})
					}
				})
				.then(res => {
					groups.forEach(v => result[v._groupName] = v)

					if (isSingle) {
						result = result[groupName[0]]
					}

					return result
				})
		}

		return Promise.resolve(result)
	},

	// 提交字典更新到后台
	update(groupName) {
		// 提交所有变更
		if (type(groupName) == "undefined") {
			groupName = Object.keys(DICT)
		}

		if (type(groupName) == "string") {
			groupName = [groupName]
		}

		if (type(groupName) == "array") {
			var task = []

			groupName.forEach(name => {
				var group = DICT[groupName]

				if (group) {
					task.push(group.update())
				}
			})

			return Promise.all(task)
		}

		return Promise.resolve()
	},
	
	NULL: new Group()
}

// 文件类型 sortType 
DICT.sortType = new Group("sortType", "", [{
		"text": "身份证",
		"id": "f33656e11a4748ee34da0674fb064a60"
	}, {
		"text": "配偶身份证",
		"id": "a6620f4846b1a236cb80f3938b6453a0"
	}, {
		"text": "结婚证",
		"id": "83d2b0a6a5cbbe5a804fcb47d3966db7"
	},{
		"text": "工资流水",
		"id": "92f85bd5f7193b2db3ae9a118c2523d4"
	},{
		"text": "资产负债表",
		"id": "c33db4f48e5b3245c302d09e3a4d9310"
	},{
		"text": "利润分配表",
		"id": "343ae00e01759c31d687864b60d9f2f5"
	},{
		"text": "现金流量表",
		"id": "cd7b058f8846913f9d86a7f49f0b8a6d"
	},{
		"text": "全部模版",
		"id": "74eb1e91705cf455259be9e8efa6103c"
	},{
		"text": "营业执照",
		"id": "e0b8cc863d5ce01c5f6e820a5bfb6f45"
	},{
		"text": "银行卡",
		"id": "77426762f50dc25b3b6f254863d7cb78"
	},{
		"text": "放款通知函",
		"id": "01bc3a323ac94981a6282164fc370aa0"
	},{
		"text": "合同扫描件",
		"id": "a8e4a2b66f7cfa83b3e1be6fcaae22b0"
	},{
		"text": "尽职报告资料",
		"id": "e68f8e4d00b4655e2093dd3a1ec43fdf"
	},{
		"text": "授信尽调模版",
		"id": "060bcb7c6acde0d6cd0681fe29c7d33f"
	}
])
