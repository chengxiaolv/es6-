import Cookies from 'js-cookie'
// cookie保存的天数
import config from '@/config'
import { forEach, hasOneOf } from '@/libs/tools'
import tinytime from 'tinytime'

export const TOKEN_KEY = 'token'

export function type(obj) {
    return (obj === null || obj === undefined) ? String(obj) : Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase()
}

export const setToken = (token) => {
    Cookies.set(TOKEN_KEY, token, { expires: config.cookieExpires || 1 })
}

export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false
}

export const hasChild = (item) => {
    return item.children && item.children.length !== 0
}

const showThisMenuEle = (item, access) => {
    return canTurnTo(item, access)
}

/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
    let res = []
    forEach(list, item => {
        if (item.meta && !item.meta.hideInMenu) {
            let obj = {
                icon: (item.meta && item.meta.icon) || '',
                name: item.name,
                meta: item.meta
            }
            if (hasChild(item) && showThisMenuEle(item, access)) {
                obj.children = getMenuByRouter(item.children, access)
            }
            if (showThisMenuEle(item, access)) res.push(obj)
        }
    })
    return res
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (routeMetched) => {
    let res = routeMetched
        .map(item => {
            let obj = {
                icon: (item.meta && item.meta.icon) || '',
                name: item.name,
                meta: item.meta
            }
            return obj
        })

    res = res.filter(item => {
        if(item.meta){
            if(typeof item.meta.hideCrumb == "undefined"){
                item.meta.hideCrumb = item.meta.hideInMenu
            }

            return !item.meta.hideCrumb
        }

        return true
    })

    return [{
        name: 'home',
        to: '/home',
        meta: {
            title: '首页'
        }
    }, ...res]
}

export const showTitle = (item, vm) => vm.$config.useI18n ? vm.$t(item.name) : ((item.meta && item.meta.title) || item.name)

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
    localStorage.tagNaveList = JSON.stringify(list)
}

/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
    const list = localStorage.tagNaveList
    return list ? JSON.parse(list) : []
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = routers => {
    let i = -1
    let len = routers.length
    let homeRoute = {}
    while (++i < len) {
        let item = routers[i]
        if (item.children && item.children.length) {
            let res = getHomeRoute(item.children)
            if (res.name) return res
        } else {
            if (item.name === 'home') homeRoute = item
        }
    }
    return homeRoute
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
    const { name, path, meta } = newRoute
    let newList = [...list]
    if (newList.findIndex(item => item.name === name) >= 0) return newList
    else newList.push({ name, path, meta })
    return newList
}

/**
 * @param {Boolean} status 状态 1 => locked  0 => unlocked
 * @description 这里只是为了演示，实际应该将锁定状态的设置和获取用接口来实现
 */
export const setLockStatus = (status) => {
    localStorage.isLocked = status
}

export const getLockStatus = () => {
    return parseInt(localStorage.isLocked)
}

/**
 * @param {*} to 即将跳转的路由
 * @param {*} access 用户权限数组
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (to, access) => {
    access = access || []

    // 特殊路由，无权限控制
    if(["/401", "/500", "*", "/login"].indexOf(to.path) >= 0){
        return true
    }

    // 系统使用权限全局控制
    if(!(access)){
        return false
    }
    
    // 忽略未配置access的路由
    if(!to.meta || !to.meta.access){
        return true
    }

    // 根据:index判断路由权限
    var routeAccess = to.meta.access
    // if(type(routeAccess) != "array"){
    //     routeAccess = [routeAccess]
    // }

    return access.findIndex(v => v.resource == `${routeAccess}:index`) >= 0
}

// 是否有权访问系统
export const canSystemAccess = (access) => {
    return access.findIndex(v => v.deep == 1) >= 0
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
    const keyValueArr = url.split('?')[1].split('&')
    let paramObj = {}
    keyValueArr.forEach(item => {
        const keyValue = item.split('=')
        paramObj[keyValue[0]] = keyValue[1]
    })
    return paramObj
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextTag = (list, name) => {
    let res = ''
    if (list.length === 2) {
        res = {
            path: '/home'
        }
    } else {
        if (list.findIndex(item => item.name === name) === list.length - 1) res = list[list.length - 2]
        else res = list[list.findIndex(item => item.name === name) + 1]
    }

    return res
}

/* istanbul ignore next */
export function addClass(el, cls) {
    if (!el) return;
    let curClass = el.className;
    const classes = (cls || '').split(' ');

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else {
            if (!hasClass(el, clsName)) {
                curClass += ' ' + clsName;
            }
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}

/* istanbul ignore next */
export function removeClass(el, cls) {
    if (!el || !cls) return;
    const classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else {
            if (hasClass(el, clsName)) {
                curClass = curClass.replace(' ' + clsName + ' ', ' ');
            }
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}

// 金额格式化，默认2位小数，逗号分隔
export function currency(s, n) {
    // 空字符直接转为0
    if(s == "" || s == null || s == undefined){
        s = "0"
    }

    n = n >= 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";

    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1] || '',
        t = "";

    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length && l[i + 1] != "-" ? "," : "");
    }

    return t.split("").reverse().join("") + (r.length > 0 ? "." + r : '');
}

// 转大写
export function toUpperCase(s){
    if(!s) return ''

    return s.toString().toUpperCase()
}

// 转小写
export function toLowerCase(s){
    if(!s) return ''

    return s.toString().toLowerCase()
}

// 单词首字母大写
export function capitalize(s){
    if (!s) return ''
    s = s.toString()
    
    return s.charAt(0).toUpperCase() + s.slice(1)
}

// 日期格式化为 年-月-日 时:分:秒
const ymdL = (function(){
    var t = tinytime("{YYYY}-{Mo}-{DD} {H}:{mm}:{ss}", { padMonth: true , padDays: true})

    return function(s){
        if(s == "" || s == null || s == undefined){
            return ""
        }
        
        var _d = new Date(s)
        // 非法dateString
        if(_d.toString() == "Invalid Date"){
            throw new Error("Invalid Date")
        }

        return t.render(_d)
    }
})()

// 日期格式化为 年-月-日
const ymd = (function(){
    var t = tinytime("{YYYY}-{Mo}-{DD}", { padMonth: true , padDays: true})

    return function(s){
        if(s == "" || s == null || s == undefined){
            return ""
        }

        var _d = new Date(s)
        // 非法dateString
        if(_d.toString() == "Invalid Date"){
            throw new Error("Invalid Date")
        }

        return t.render(_d)
    }
})()

export {ymd, ymdL}

var proto = Object.prototype;
var gpo = Object.getPrototypeOf;

function isPojo (obj) {
  if (obj === null || typeof obj !== "object") {
    return false;
  }
  return gpo(obj) === proto;
}

export {isPojo}

export function throttle( delay, noTrailing, callback, debounceMode ) {

    /*
     * After wrapper has stopped being called, this timeout ensures that
     * `callback` is executed at the proper times in `throttle` and `end`
     * debounce modes.
     */
    var timeoutID;

    // Keep track of the last time `callback` was executed.
    var lastExec = 0;

    // `noTrailing` defaults to falsy.
    if ( typeof noTrailing !== 'boolean' ) {
        debounceMode = callback;
        callback = noTrailing;
        noTrailing = undefined;
    }

    /*
     * The `wrapper` function encapsulates all of the throttling / debouncing
     * functionality and when executed will limit the rate at which `callback`
     * is executed.
     */
    function wrapper () {

        var self = this;
        var elapsed = Number(new Date()) - lastExec;
        var args = arguments;

        // Execute `callback` and update the `lastExec` timestamp.
        function exec () {
            lastExec = Number(new Date());
            callback.apply(self, args);
        }

        /*
         * If `debounceMode` is true (at begin) this is used to clear the flag
         * to allow future `callback` executions.
         */
        function clear () {
            timeoutID = undefined;
        }

        if ( debounceMode && !timeoutID ) {
            /*
             * Since `wrapper` is being called for the first time and
             * `debounceMode` is true (at begin), execute `callback`.
             */
            exec();
        }

        // Clear any existing timeout.
        if ( timeoutID ) {
            clearTimeout(timeoutID);
        }

        if ( debounceMode === undefined && elapsed > delay ) {
            /*
             * In throttle mode, if `delay` time has been exceeded, execute
             * `callback`.
             */
            exec();

        } else if ( noTrailing !== true ) {
            /*
             * In trailing throttle mode, since `delay` time has not been
             * exceeded, schedule `callback` to execute `delay` ms after most
             * recent execution.
             *
             * If `debounceMode` is true (at begin), schedule `clear` to execute
             * after `delay` ms.
             *
             * If `debounceMode` is false (at end), schedule `callback` to
             * execute after `delay` ms.
             */
            timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
        }

    }

    // Return the wrapper function.
    return wrapper;

}

// 合并vuex config
export function vuexMerge(source){
    var targets = Array.prototype.slice.call(arguments, 1)
    
    if(isPojo(source) == false){
        throw new TypeError("合并项必须为Plain Object")
    }
    
    if(type(targets) != "array"){
        targets = [targets]
    }
    
    return targets.reduce((acc, t) => _vuexMerge(acc, t), source)
}

const _vuexMerge = (source, target) => {
    Object.keys(target).forEach(key => {
        switch(key){
            case "state":
            case "getters":
            case "mutations":
            case "actions":
                if(!source[key]){
                    source[key] = {}
                }
                
                Object.assign(source[key], target[key])
                break
            default:
                source[key] = target[key]
        }
    })

    return source
}

// id、pid结构转层级签套
// 前提: id唯一、没有签套结构
export function listToTree(list, _rootId = '', _id = "id", _pId = "pId"){
    var map = {}
    
    // copy
    list = list.map(t => Object.assign({}, t))

    // 建立索引
    list.forEach(t => map[t[_id]] = t)

    // 建立父子关系
    list.forEach(t => {
        var parent = map[t[_pId]]
        
        t.isEnd = true
        
        parent && (parent.children ? parent.children.push(t) : parent.children = [t], parent.isEnd = false)
    })
    
    // 返回tree
    return list.filter(t => t[_pId] == _rootId)
}


