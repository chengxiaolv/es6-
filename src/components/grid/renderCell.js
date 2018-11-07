import { type } from '@/libs/util'
import Vue from 'vue'

// 超链接
export function anchorCell(options) {
	options = Object.assign({
		compile: function(row, column, index) {
			return row[column.key]
		}
	}, options)

	return function(h, data) {
		var { row, column, index } = data

		return h("a", {
			class: {
				"svu-grid-cell-anchor": true
			},
			domProps: {
				innerHTML: options.compile.call(this, row, column, index)
			},
			on: {
				'click': function(e) {
					e.preventDefault()

					if (options.click) {
						options.click.call(e.target, row, column, index)
					}
				}
			}
		})
	}
}

// 简单的map映射，支持数组或者map对象
export function mapCell(map) {
	return function(h, data) {
		var { row, column, index } = data
		var key = row[column.key],
			value = key

		if(type(map) == "array"){
			var option = map.find(v => v.id == row[column.key])

			value = option ? option.text : key
		}
		
		if(type(map) == "object"){
			value = map[key] ? map[key] : key
		}

		return h("span", {
			// class: {
			// 	"svu-single-line": true
			// }
		}, value)
	}
}

// 支持全局filter的管道操作
export function pipeCell(formatter) {
	return function(h, data) {
		var { row, column, index } = data
		var value = row[column.key]
		var text = formatter.trim().split("|")
			.reduce((acc, part) => {
				var matchs = /^(\w*)(?:\((.*)\))?$/.exec(part)
				var filter = Vue.options.filters[matchs[1].trim()]

				if (filter) {
					// 目前参数只支持字符串
					var params = matchs[2] ? matchs[2].split(",") : []

					return filter.apply(null, [acc, ...params])
				}

				return acc
			}, value)

		return h("span", {
			// class: {
			// 	"svu-single-line": true
			// }
		}, text)
	}
} 
