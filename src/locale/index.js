import Vue from 'vue'
import VueI18n from 'vue-i18n'
import customZhCn from './lang/zh-CN'
import customZhTw from './lang/zh-TW'
import customEnUs from './lang/en-US'
import zhCnLocale from 'iview/src/locale/lang/zh-CN'
import enUsLocale from 'iview/src/locale/lang/en-US'
import zhTwLocale from 'iview/src/locale/lang/zh-TW'

Vue.use(VueI18n)

// 自动根据浏览器系统语言设置语言
// const navLang = navigator.language
// const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
// let lang = window.localStorage.lang || localLang || 'zh-CN'
let lang = 'zh-CN'

Vue.config.lang = lang
Vue.locale = () => {}

const messages = {
	'zh-CN': Object.assign(zhCnLocale, customZhCn),
	'zh-TW': Object.assign(zhTwLocale, customZhTw),
	'en-US': Object.assign(enUsLocale, customEnUs)
}

const i18n = new VueI18n({
	locale: lang,
	missing: (locale, key, vm) => {
		return ''
	},
	messages
})

export default i18n