// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from '@/locale'
import config from '@/config'

// 环境变量
import env from '../config/env'
// iview全局样式
import 'iview/dist/styles/iview.css'
// 全局样式
import '@/styles/index.scss'
// 全局mixin
import '@/components/global/mixin'
// 全局filter
import '@/components/global/filter'
// 全局mutate
import '@/components/global/mutate'
// 全局组件
import '@/components/global/components'

if (env === 'development'){
	require('@/mock')
	window.$store = store
	window.$vue = Vue
}

Vue.config.productionTip = false

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	i18n,
	render: h => h(App)
})