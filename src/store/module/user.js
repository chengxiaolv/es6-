import { login, logout, getUserInfo } from '@/api/user'
import { setToken, getToken } from '@/libs/util'
import defaultUser from '@/assets/images/defaultUser.png'

import md5 from 'md5'

export default {
    state: {
        userName: '',
        userId: '',
        avatorImgPath: '',
        token: getToken(),
        access: '',
        roles: []
    },
    mutations: {
        setAvator(state, avatorPath) {
            state.avatorImgPath = avatorPath
        },
        setUserId(state, id) {
            state.userId = id
        },
        setUserName(state, name) {
            state.userName = name
        },
        setAccess(state, access) {
            state.access = access
        },
        setToken(state, token) {
            state.token = token
            setToken(token)
        },
        setRoles(state, roles){
            state.roles = roles
        }
    },
    actions: {
        // 登录
        handleLogin({ commit }, { userName, password }) {
            userName = userName.trim()
            return new Promise((resolve, reject) => {
                login({
                    userName,
                    password
                }).then(res => {
                    const passport = res.data.passport
                    commit('setToken', md5(userName))
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 退出登录
        handleLogOut({ state, commit }) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                        commit('setToken', '')
                        commit('setAccess', [])
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                    // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
                    // commit('setToken', '')
                    // commit('setAccess', [])
                    // resolve()
            })
        },
        // 获取用户相关信息
        getUserInfo({ state, commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo(state.token).then(res => {
                    const passport = res.data.passport

                    if(!passport){
                        return Promise.reject({msg: "未登陆，无权限访问"})
                    }

                    const {user, perms, roles} = passport
                    
                    commit('setAvator', user.avatar || defaultUser)
                    commit('setUserName', user.nickName)
                    commit('setUserId', user.id)
                    // commit('setAccess', perms.filter(v => v.deep < 2))
                    commit('setAccess', perms)
                    commit('setRoles', roles)
                    
                    resolve(state)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}
