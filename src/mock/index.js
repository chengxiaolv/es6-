/* eslint-disable */
import Mock from './mock'
import { login, logout, getUserInfo } from './login'
import './customer'
import './materials'
import './contract'
import './dict'

// 登录相关和获取用户信息
Mock.mock(/\/login/, login)
Mock.mock(/sys\/user\/info/, getUserInfo)
Mock.mock(/\/logout/, logout)

export default Mock
