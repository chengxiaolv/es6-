import Axios from 'axios'
import baseURL from '_conf/url'
import { Message } from 'iview'
import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/libs/util'
import qs from 'qs'
import store from '@/store'

// 存储请求队列
var queue = {},
    seed = 1,
    recordChanged = false;

// 销毁请求实例
function destroy(key) {
    delete queue[key]

    return Object.keys(queue).length
}

function intercept(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
        // 除了与用户登陆相关的接口，header中都添加token
        if (!config.url.includes('/user')) {
            config.headers['x-access-token'] = Cookies.get(TOKEN_KEY)
        }
        // Spin.show()
        // 在发送请求之前做些什么
        config._seed = seed++
        var contentType = config.headers['Content-Type']
        if (contentType && contentType.indexOf('x-www-form-urlencoded') >= 0) {
            if (config.data) {
                // console.log(config.data)
                config.data = qs.stringify(config.data)
                // console.log(config.data)
            }
        }
        console.log(config.method + " " + config.baseURL + config.url + '[' + config._seed + ']')

        return config
    }, error => {
        // 对请求错误做些什么
        return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use(res => {
        let { data, config } = res
        const is = destroy(config._seed)
        
        if(config.url.match(/\/(update|save)$/)){
            // 调用过以/save或者/update结尾的接口
            recordChanged = true
        }

        // 当所有异步请求都执行完毕时
        if (!is) {
            if(recordChanged){
                // 存在操作记录变更，刷新操作记录状态
                store.dispatch("opeRecord/fetchOpeRecord", store.state.detail.curCustomerId)
                console.log("refresh ope record !!")
                recordChanged = false
            }
        }
        // Blob表示类文件对象
        if (!(data instanceof Blob)) {
            if(typeof data.data == "undefined") {
                data.data = {}
            }
            
            if (data.code !== 200) {
                // 后端服务在个别情况下会报201，待确认
                if (data.code === 401) {
                    Cookies.remove(TOKEN_KEY)
                    window.location.href = '/#/login'
                    Message.error('未登录，或登录失效，请登录')
                } else {
                    if (data.msg) Message.error(data.msg)
                }
                
                return Promise.reject(data)
            }
        }
        
        // console.log("response: " + config._seed)
        // normalize data

        return data
    }, (error) => {
        Message.error('服务内部错误')
        // 对响应错误做点什么
        return Promise.reject(error)
    })
}

// axios实例
var axios = Axios.create({
    baseURL: baseURL,
    // timeout: 2000,``
    headers: {
        // 'Content-Type': 'application/json; charset=utf-8',
        'Content-Type':'application/x-www-form-urlencoded',
        'X-URL-PATH': location.pathname
    }
});

intercept(axios)
axios.create = function(conf){
    return intercept(Axios.create(conf));
}

export default axios
