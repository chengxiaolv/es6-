import Handler from './mock/handler'
import Util from './mock/util'
import Random from './mock/random'
import RE from './mock/regexp'
import toJSONSchema from './mock/schema'
import valid from './mock/valid'
import XHR from './mock/xhr'

var _mocked = {};

/*!
    Mock - 模拟请求 & 模拟数据
    https://github.com/nuysoft/Mock
    墨智 mozhi.gyy@taobao.com nuysoft@gmail.com
*/
var Mock = {
    Handler: Handler, // 用来解析模版
    Random: Random, // 随机数据
    Util: Util,
    XHR: XHR, // XMLHttpRequest代理对象
    RE: RE,
    toJSONSchema: toJSONSchema,
    valid: valid,
    heredoc: Util.heredoc,
    setup: function(settings) {
        return XHR.setup(settings)
    },
    findRule: function(cb){
        var target = Object.keys(_mocked).find(function(urlType){
            return cb(urlType, _mocked[urlType]);
        })

        return target ? _mocked[target] : undefined;
    }
}

var plugins = []
Util.extend(Mock,
    // 事件接口
    Util.Event, {
        events: {},
        // 插件注册
        use: function(plugin, options) {
            // 去重判断
            if (plugins.some(function(p) {
                    p === plugin;
                })) {
                return true;
            }

            plugin.install(Mock, options);
        }
    });

Mock.version = '1.0.1-beta3'

// 避免循环依赖（XHR内部使用了Mock.mock方法，其实无所谓，这种引用关系js模块系统是可以正确解析的，所有模块最终会达到完毕状态）
if (XHR) {
    XHR.Mock = Mock
    window.XMLHttpRequest = XHR
}

/*
    * Mock.mock( template )
    * Mock.mock( function() )
    * Mock.mock( rurl, template )
    * Mock.mock( rurl, function(options) )
    * Mock.mock( rurl, config, template )
    * Mock.mock( rurl, config, function(options) )
    
    config {}
        .type Http-verbs POST | GET | DELETE | PUT | PATCH
        .resStatus 响应Http状态 number | Funtion

    根据数据模板生成模拟数据。
*/
Mock.mock = function(rurl, config, template) {
    // Mock.mock(template)
    if (arguments.length === 1) {
        var event = {};
        event.type = 'templateCompiled' 
        event.data = Handler.gen(rurl);
        // 提供模版编译后事件
        this.trigger(event.type, event);
        return event.data;
    }
    // Mock.mock(rurl, template)
    if (arguments.length === 2) {
        template = config
        config = undefined
    }

    // _mocked mock仓库，存储所有的mock规则，应该隐藏防止外部意外修改
    _mocked[rurl + ((config && config.type) || '')] = {
        rurl: rurl,
        config: config,
        template: template
    }

    return Mock
}

export default Mock
