import Vue from 'vue'
import i18n from '@/locale'
import iView from 'iview'
import iviewArea from 'iview-area'
import InputNumber from '@/components/form/inputNumber'
import {Timeline, TimelineItem} from '@/components/nav/timeline'
import noData from '@/components/noData'
import actionDelButton from '@/components/grid/actionDelButton'

// ivew组件考虑了国际化并mixin了翻译函数t以及翻译本文，但是t本身不具备翻译功能，它是一个开放的函数接口
// 默认实现是,使用vuei18n的翻译函数$t，但是这个默认实现有bug
// 它用Object.getPrototype(vm || Vue).$t来获取$t，vm的原型就是Vue,而调用Vue.$t会报错（这个也许是vuei18n的版本兼容问题，本项目是7.x）
// 因此重写这个接口，保证其使用正确的i18n实例翻译函数
iView.i18n((key, value) => i18n.t(key, value))

Vue.use(iView)
Vue.use(iviewArea)

Vue.component("InputNumber", InputNumber)
Vue.component("Timeline", Timeline)
Vue.component("TimelineItem", TimelineItem)
Vue.component("NoData", noData)
Vue.component("ActionDelButton", actionDelButton)
