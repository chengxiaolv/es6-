import Vue from 'vue'

import MaskedInput from 'vue-text-mask'
import MaskedNumber from './maskedNumber'
import MaskedCurrency from './maskedCurrency'
import MaskedEmail from './maskedEmail'

function install (Vue, options) {
	Vue.component('masked-input', MaskedInput)
	Vue.component('masked-number', MaskedNumber)
	Vue.component('masked-currency', MaskedCurrency)
	Vue.component('masked-email', MaskedEmail)
}

Vue.use(install)