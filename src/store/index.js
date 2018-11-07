import Vue from 'vue'
import Vuex from 'vuex'
// 系统状态
import app from './module/app'
import user from './module/user'
// 业务上下文状态
import customer from './module/customer'
import credit from './module/credit'
// 通用状态
import approvalProgress from './module/approvalProgress'
import opeRecord from './module/opeRecord'
import detail from './module/detail'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {
        //
    },
    modules: {
        app,
        user,
        customer,
        credit,
        approvalProgress,
        opeRecord,
        detail       
    }
})
