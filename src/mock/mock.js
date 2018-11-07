// 插件
import bodyParser from './plugins/bodyParser'
import extend from './plugins/extend'
import filter from './plugins/filter'
import Mock from './src/mock.js'

Mock.setup({
    timeout: 100
})

// 加载插件
Mock.use(bodyParser)
Mock.use(extend)
Mock.use(filter)

window.$mock = Mock

export default Mock
