import {type} from "@/libs/util"
import i18n from '@/locale'

const _const = {
	process:{
		stage:{
			"Initiate": 1,
			"InProcess": 2,
			"EndApproval": 3
		},
		auditStatType:{
			"Pass": "Pass",
			"Reject": "Reject",
			"SendBack": "SendBack",
			"Transfer": "Transfer"
		},
		action:{
			"Pass": 1,
			"Reject": 2,
			"SendBack": 3
		}
	},
	sex:{
		'Male':1,
		'Female':0
	},
	choise:{
		'Yes':1,
		'No':0,
	},
	yseOrNo:{
		'Yes': 1,
		'No': 0
	}
}

// 使用.分路径访问常量对象
function parse(path){
	var parts = path.split(".")
	var _constant = _const, i
	for(i=0; i<parts.length; i++){
		_constant = _constant[parts[i]]

		if(!_constant) break
	}
	
	var c = {
		// 翻译函数
		t(name){
			return i18n.t("constant." + path + "." + name)
		},
		// 转化为可读的字典列表
		toList(){
			return  _constant ? Object.keys(_constant).map(name => ({id: _constant[name], text: this.t(name)})) : []
		},
		// 获取value对应的译名
		displayNameOf(v){
			if(_constant){
				for(var name in _constant){
					if(v == _constant[name]){
						return this.t(name)
					}
				}
			}

			return v
		}
	}
	
	if(_constant){
		Object.keys(_constant).forEach(name => c[name] = _constant[name])
	}

	return c
}

export default {
	get(path){
		return parse(path)
	}
}