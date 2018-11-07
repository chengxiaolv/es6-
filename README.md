[TOC]

### js代码规范
##### js函数要么是异步的，要么是同步的，绝对不允许存在二义性。

```js
// 经典反例
fetch(){
    if(this.id){
        // 1. 作为异步函数，返回Promise
        return getXXX(id).then(res => this.info = res.data)
    }else{
        // 2. 作为同步函数，返回普通值
        this.id = ''
    }
}
```
因为使用一个二义性函数是很危险的。比如在调用反例中的fetch()时，fetch().then()在id为空的场景会报错；

而直接使用fetch(); xxx do something，问题更多，因为保证不了时序性。

在更复杂的场景里，其危险性更隐蔽。比如fetch在自身逻辑结束后发出一个事件。那么你可能会写出如下代码：
```js
{   
    count: 0,
    fetch(){
        if(this.id){
            getXXX(id).then(data => {
                this.trigger("done", data.userName)
            })
        }else{
            this.trigger("done", "游客")
        }
    },

    init(){
        this.fetch()
        this.on("done", function(userName){
            this.count++
        })
    }
}
```
最终count可能等于0，因为在同步场景下，done事件在注册前就已经触发了。危险的是，这种代码不会报错，而且逻辑上也很难看出问题，追踪起来异常困难。

##### js对象中，以_开头的属性是私有属性，只能在对象内部使用，其它场景禁止直接访问。
```js
// 反例，直接访问字典对象的list
Dict.get(["cstType"]).then(cstType => this.cstTypeList = cstType._list)
```
字典对象在其内部对_list进行了状态跟踪，直接引用_list可能会导致意外修改_list而丢失跟踪状态。

### iview实践规范
##### 表单子控件需要加单位的，统一使用append slot
```html
<Input v-model="mInfo.applyTerm" placeholder="申请期限">
    <span slot="append">月</span>
</Input>
```
slot会让input框自动收缩留出单位显示空间，不影响布局；另外样式统一，方便后续维护

##### input型控件需要增加maxlength长度限制
```html
<!-- 注意maxlength的使用 -->
<FormItem label="贷款用途:" prop="loanUse">
    <Input type="textarea" v-model="mInfo.loanUse" placeholder="贷款用途" :maxlength="64"></Input>
</FormItem>
```

##### 表单数据对象需要显示列出所需字段名，在查询与提交的时候只操作显示指定的字段
```js
// 表单数据
pInfo: {
    id: '',
    caseId: this.materialId,
    customerId: this.customerId,
    userName: '',
    cstType: '',
    credNumber: '',
    mobile: '',
    addr: '',
    remark: ''
}
// 取数，指定字段赋值
return partenerInfo(this.id).then(res => Object.keys(this.pInfo).forEach(name =>this.pInfo[name] = res.data.cstPartener[name]))
```
主要目的是为了让代码更容易理解，而且在编写表单模版的时候，实际上你已经把要用到的字段罗列出来了。另外显示指定字段，也能避免提交多余的字段到后台。

##### 对于接受非原始值类型的表单子控件，使用计算属性完成类型转换。比如日期控件、lookup控件、所属区域控件
```js
computed:{
    birthDateMask:{
        get(){
            return this.eInfo.birthday ? new Date(this.eInfo.birthday) : ''
        },
        set(val){
            this.eInfo.birthday = ymd(val)
        }
    } 
}
```
##### 只在view组件中调用api接口
判断是否是view组件的一般条件：

1. 路由组件

2. Modal组件

3. 与业务紧密相联，为了表达业务而存在

* 用来做数据预加载的接口调用场景暂停一下，后面有详细描述

Vue组件可以分为2类，view组件和element组件。

view组件与业务耦合在一起，其布局和功能都是为用户定制的，无法在别的系统中复用，比如person-detail.vue个人客户详情、hone主页等等。

element组件是与业务无关的，从具有普遍性的、通用性的需求而来，可以在多个系统中复用，甚至作为npm包发布共享。比如Input组件、栅格组件、DatePicker等等。api接口本身代表的就是业务，因此如果你打算设计一个element组件，请不要调用任何api，否则它的通用性会大大降低。

##### 数据预加载统一放在路由组件的beforeRouteEnter与beforeRouteUpdate事件中
```js
// 示范代码，进件详情

// 数据取数独立
function fetchData(materialId){
    return Promise.all([
        Dict.get([
            "productType", "busMode", "rateType", "paybackType", "guaranteeType", 
            "reciveNode", "feeBase", "feeRateType", "cstType"
        ]),
        materialsInfo(materialId),
        feeStandardList(),
        partenerList()
    ])
}
// 在beforeRouteEnter，beforeRouteUpdate路由事件中取数
export default {
    // ... code ...
    fillData(args){
        // 各种为$data赋值
    },
    beforeRouteEnter (to, from, next) {
        fetchData(to.params.id)
            .then(args => {
                next(vm => vm.fillData(args))
            })
    },

    // when route changes and this component is already rendered,
    // the logic will be slightly different.
    beforeRouteUpdate (to, from, next) {
        fetchData(to.params.id)
            .then(args => {
                this.fillData(args)
                next()
            })
    }
}
```
主要有2个目的，一是提前加载好数据，避免页面渲染时出现闪烁；二是让页面切换的loadingBar更加接近实际情况。

##### Table列表组件实现字典字段id转text
```js
import {mapCell} from '@/components/grid/renderCell'

data(){
    return {
        // ...
        reciveNode: Dict.NULL
    }
}

computed:{
    feeColumns(){
        return [
            { type: 'index', width: 60, align: 'center', title: '序号' },
            { title: '费用名称', key: 'itemName' },
            { title: '收取环节', key: 'reciveNode', render: mapCell(this.reciveNode.val())},
            { title: '费用基数', key: 'feeBase', render: mapCell(this.feeBase.val())},
            { title: '费用类型', key: 'feeRateType', render: mapCell(this.feeRateType.val())},
            { title: '费率值', key: 'feeRate' },
            { title: '操作', key: 'action', align: 'center', render: this.feeAction}
        ]
    }
}
```
使用dictCell作为渲染函数；

用计算属性实现列的创建。计算属性是延迟加载的，可以依赖data属性，同时也是响应式的。

另外一个细节点，reciveNode等字典对象，在初始化时要给Dice.NULL值，保证数据流通畅。

##### SilenceForm实现字典字段id转text
```html
<silence-form :data="baseInfo" :prefix="'case.base.'" :strategy="baseStrat"></silence-form>
```
```js
import {silenceForm, Strategy} from '@/components/form/silenceForm'

data(){
    return {
        // ...
        baseStrat: Strategy.NULL,
    }
},

methods:{
    fillData(args){
        // 获取字典对象
        var [dicts] = args
        this.baseStrat = new Strategy([{type: "Dict", dicts: dicts}])
    }
}
```

##### 利用vuex复用view组件
如果一个view组件会在多个页面中出现，那么可以将其依赖的数据对象放到vuex中，从此成为一个可共享的视图。
这样做的好处是，我们可以将大的view拆分成小的可组合复用的小view，并且不违反统一在路由跳转时预加载数据的约定。
```js
function fetchData(materialId){
    return Promise.all([
        // ... 统一取数
        store.dispatch("credit/fetchPartener", {caseId: materialId}),
        store.dispatch("credit/fetchFee", {dataId: materialId})
    ])
}
```

##### 数字、金额类控件请使用InputNumber，它会自动过滤非法字符
```html
<!-- 金额类型 -->
<FormItem label="申请金额:" prop="applyAmount">
    <input-number v-model="mInfo.applyAmount" placeholder="申请金额" :allowNegative="false"></input-number>
</FormItem>

<!-- 整型 -->
<FormItem label="申请期限:" prop="applyTerm">
    <input-number v-model="mInfo.applyTerm" placeholder="申请期限" :allowNegative="false" 
        :allowDecimal="false" :includeThousandsSeparator="false">
        <span slot="append">月</span>
    </input-number>
</FormItem>
```

##### Modal数据预加载
```js
export default {
    // 添加inject选项，引入$modal对象
    inject:{
        $modal:{default: null}
    },
    // 在mounted事件中，注册钩子
    mounted(){
        var $pInfo = this.$refs.pInfo
        
        // 绑定confirm事件
        this.$modal.$on("smart-modal-confirm", $modal => {
            // ... 业务逻辑
        })

        // 绑定cancel事件
        this.$modal.$on("smart-modal-cancel", $modal => {
            $modal.close()
        })
        
        // 数据预加载
        this.$modal.beforeEnter((next) => {
            // api 取数
            Promise.all([
                Dict.get(["nation", "maritalStat","credTypePersonal","educationLevel","livingStat","sourceFrom","cstSort"]), 
                this.fetch()
            ])
            .then(args => {
                var [groups] = args
                Object.keys(groups).forEach(name => this.$data[name+'List'] = groups[name].val())
                
                // 记得调用next触发下一步，否则Modal窗口不会显示内容
                next()
            })
        })
    }
}
```

### 权限管理
权限管理分为2个部分，菜单级权限、组件级权限。

    每个菜单都对应一个业务模块，因此统一做了业务模块的权限过滤（会自动隐藏没有权限的菜单）。

    组件级权限对应每个接口，因为组件的使用很灵活，也不一定对应某个接口，所以需要在代码中做控制。

项目中，每个组件已经混入了权限管理属性和方法，使用this.hasAccess('actionName')即可判断是否具备权限。

    组件级权限由2个部分来描述，{business}{action}，其中{business}代表业务模块权限，{action}代表动作点权限，

    action目前只有6种，'index', list', 'update', 'delete', 'info', 'save'。

    比如：personal:cstpersonalcredit:update，可以理解为{personal:cstpersonalcredit}{update}，个人客户-更新权限。

另外，为了便于使用，结合组件的父子关系，提出了parentAccess、access、fullAccess、routeaccess、hasAccess五个概念（已混入到每个组件）。

    parentAccess：prop属性，代表上级组件的业务模块权限，默认取自最近一个fullAccess不为空的父组件，可以自行指定。

    access：prop属性，代表当前组件的业务模块权限，可以为空。

    fullAccess：计算属性，fullAccess = parentAccess + access。代表业务模块权限{business}

    routeAccess：计算属性，等于路由组件的fullAccess，在路由元信息meta.access中设置。因为其它组件都是路由组件的子组件，所以可以认为它是默认的parentAccess。

    hasAccess：方法，接受一个参数actionName，代表{action}，内部使用fullAccess + actionName来判定是否具备组件权限。

通过hasAccess判定权限，即可做出隐藏、禁用等等UI控制。

### 字典用法

代码中以下划线_开头的变量表示自定义变量

- 获取/操作单个字典

```js
import Dict from '@/components/common/dict'

Dict.get("nation").then(nation => {
    // 获取民族字典列表 options
    nation.val()
    // 获取指定id的text
    nation.val(_id)
    // 获取指定text的id
    nation.keyOf(_text)
    // 查找字典项，返回{id, text}对象
    nation.find(_id)
    nation.find(v => v.id == _id)
    nation.find(v => v.text.length > 3)
    // 批量查找，返回结果数组
    nation.findAll(v => v.text.length > 3)
    // 修改或者新增option
    nation.val(_id, _text)
    // 提交修改到后台
    nation.update()
})
```

- 获取/操作多个字典

```js
import Dict from '@/components/common/dict'

// 传递数组实现同时获取多个字典对象
Dict.get(["nation", "maritalStat"]).then(groups => {
    // nation 与 maritalStat 分别就是民族字典和婚姻状态字典，使用方法同单个字典
    var {nation, maritalStat} = groups

    // 批量提交所有字典修改，Dict会跟踪所有字典对象
    maritalStat.val(_id, _value)
    nation.val(_id, _value)
    
    Dict.update()
})
```

### 常量用法
常量跟字典不同，它只有一个value值，但是这个value值通常没有可读性，需要在程序里另取一个名字来使用。为了方便管理，统一封装了常量定义，主要实现了命名空间以及多语言转换。

```js
// 定义常量 Constant.js
const _const = {
    process:{
        stage:{
            "Initiate": 1,
            "InProcess": 2,
            "EndApproval": 3
        }
    }
}

// 对应的多语言文件 zh-CN.js
{
    // 常量
    "constant":{
        "process":{
            "stage":{
                "Initiate": "发起流程",
                "InProcess": "流程审批",
                "EndApproval": "审批结束"
            }
        }
    }
}

// 使用常量
import Constant from '@/components/common/Constant'
// 通过.分path来访问常量
var STAGES = Constant.get("process.action")
// 引用常量
STAGES.Initiate
// 获取译名
STAGES.displayNameOf(STAGES.Initiate)
// 常量组对应的译名列表
STAGES.toList() // [{id: 1, text: '发起审批'}, {id:2, text: '流程审批'}, {id:3, text: '审批结束'}]
```

### api接口定义及使用说明

比如在@/src/api/user.js中定义getUserInfo接口
```js
import axios from '@/libs/axios'

export const getUserInfo = (token) => {
    return axios.get('get_info', {
        params: {
            token
        }
    })
}
```

然后在view组件中调用
```js
import {getUserInfo} from '@/src/api/user'

// 获取用户信息
getUserInfo().then(res => {
    this.$router.push({
        name: 'home'
    })
})
```

需要注意的是，所有api接口返回的都是
[Promise](https://github.com/nzakas/understandinges6/blob/master/manuscript/11-Promises.md)
对象，根据
[接口数据结构规范](#jiekou)
，当code=200时，promise状态为resolved，否则promise状态为rejectd

### Mock用法示例

先定义api，再写mock

- POST请求

```js
import axios from '@/libs/axios'

export const login = ({ userName, password }) => {
    // 第一个参数为url，最终请求的url为/login
    // 第二个参数为需要传递给后台的data数据
    return axios.post('login', {
        userName,
        password
    })
}
```

最终url的是按如下规则得到的

    $baseURL/login

其中$baseURL为全局配置的路径前缀，目前项目中为 '/'


对应的mock方法为：
```js
// @/mock/index.js
// 第一个参数用于匹配请求url，可以是字符串也可以是正则式
// 第二个参数是mock数据，也可以是返回mock数据的函数
Mock.mock(/\/login/, login)

// @/mock/login.js
const USER_MAP = {
    super_admin: {
        name: 'super_admin',
        user_id: '1',
        access: ['super_admin', 'admin'],
        token: 'super_admin',
        avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
    },
    admin: {
        name: 'admin',
        user_id: '2',
        access: ['admin'],
        token: 'admin',
        avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
    }
}

// login是自定义的一个函数，返回mock数据
export const login = ({body}) => {
    // 返回mock数据，可以使用mockjs语法
    return {
        code: 200,
        data: { token: USER_MAP[body.userName].token },
        msg: ''
    }
}
```

- GET请求

```js
// api定义
export const getUserInfo = (token) => {
    return axios.get('get_info', {
        params: {
            token
        }
    })
}
```

第一个参数为url，最终请求的url为/get_info?token=xxx

params会被解析为查询字符串拼接在url后面

对应的mock方法为：

```js
// 为了匹配get_info
Mock.mock(/\/get_info/, getUserInfo)

// mock数据
export const getUserInfo = ({body, url}) => {
    const params = getParams(url)
    // 返回了对应的mock数据
    // params是解析查询字符串所得到的对象
    return {
        code: 200,
        data: USER_MAP[params.token],
        msg: ''
    }
}
```

- REQUEST语法，可以自行指定http method

```js
// api定义
export const logout = () => {
    return axios.request({
        url: 'logout',
        method: 'post'
    })
}
```

最终请求的url为/logout

如果需要发送数据，可以添加属性params（查询字符串）、data（body数据）

```js
export const logout = () => {
    return axios.request({
        url: 'logout',
        method: 'post',
        params:{
            type: 3
        },
        data:{
            userName: "xxx",
            avatar: "/imgs/tx.jpg"
        }
    })
}
```

对应的mock方法为：

```js
// @/mock/index.js
Mock.mock(/\/logout/, logout)

// @/mock/login.js
export const logout = () => {
    return {
        code: 200,
        data: null,
        msg: ''
    }
}
```

##### Mock.mock(url, template)说明

-url String | RegExp

如果url为string，则会通过 == 运算来匹配请求

如果url为RegExp，则会通过 reg.test(url) 来匹配请求

-template Object | Function

当template为对象时，直接作为mock数据返回

当template是一个函数时（ 原型function(response){ return ... } ），将其返回值作为mock数据。形参response的结构如下：

```js
{
    body: {...}, // request请求发来的body数据
    status: Number // 请求响应状态
    type: String, // 请求method，如 get、post
    url: String // 请求url
}
```

### 后台接口文档说明

<span id="jiekou"></span> **接口数据结构规范**:

```js
{
    code: 200, // 200表示成功，非200表示失败
    data: {...}, // code=200时返回的数据
    msg: "..." // code!=200时返回的错误信息
}
```

字段名全部来自**数据库设计表**

接口文档**原始文件**目录 ～/gacm/gacm-portal/src/main/resources/public/doc/api/*.yaml（.yaml文件是xml文件的一个变种，用来描述文档结构，可以作为文本文件查看）

[在线接口文档](http://shendun-demo.wesoft.cn/)

一般来说是后台开发人员先提供接口文档，然后前端根据文档来定义api以及其mock。但是实际情况会有所偏差，所以如果遇到缺少接口说明的情况，就自己先拟定一个，基本结构和字段名称满足规范即可，后面再改也不是什么难事。

### 参考资料
[Axios文档](https://github.com/mzabriskie/axios)

[Mockjs语法文档](http://mockjs.com/examples.html)

[Mockjs语法示例](http://mockjs.com/examples.html)


