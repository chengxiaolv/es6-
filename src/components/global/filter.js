import Vue from 'vue'
import {currency, ymd, ymdL, toUpperCase, toLowerCase, capitalize} from '@/libs/util'

Vue.filter('currency', currency)
Vue.filter('ymd', ymd)
Vue.filter('ymdL', ymdL)
Vue.filter('upper', toUpperCase)
Vue.filter('lower', toLowerCase)
Vue.filter('capitalize', capitalize)
// Vue.filter('dateDiff', dateDiff)
// Vue.filter('currency', currency)
