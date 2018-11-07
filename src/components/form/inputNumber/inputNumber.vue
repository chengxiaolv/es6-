<template>
    <div :class="wrapClasses">
        <div :class="[prefixCls + '-group-prepend']" v-if="prepend" v-show="slotReady">
            <slot name="prepend"></slot>
        </div>
        <i class="ivu-icon" 
            v-if="clearable && maskedValue"
            :class="[
                'ivu-icon-ios-close-circle ', 
                prefixCls + '-icon', 
                prefixCls + '-icon-clear' , 
                prefixCls + '-icon-normal', 
                prefixCls + '-icon-append']"  
            @click="handleClear">
        </i>
        <mask-input type="text" ref="maskInput"
            :class="inputClasses"
            :value="maskedValue" 
            :mask="mask"
            :name="name" 
            :guide="guide" 
            :placeholder="placeholder"
            :disabled="disabled" 
            :readonly="readonly" 
            :placeholderChar="placeholderChar" 
            @input="handleInput"
            @keyup.enter="handleEnter"
            @keyup="handleKeyup"
            @keypress="handleKeypress"
            @keydown="handleKeydown"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange">
        </mask-input>
        <div :class="[prefixCls + '-group-append']" v-if="append" v-show="slotReady">
            <slot name="append"></slot>
        </div>
    </div>
</template>
<script>
import MaskInput from 'vue-text-mask'
import numberMask from '@/components/form/maskInput/numberMask'
import emitter from '@/components/mixins/emitter'
import {type} from '@/libs/util'

const prefixCls = 'ivu-input';

export default {
    mixins: [emitter],
    components: {
        MaskInput
    },
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        // 是否显示mask占位符，引导输入
        guide: {
            type: Boolean,
            default: false
        },
        // mask占位符
        placeholderChar: {
            type: String,
            default: '#'
        },
        size: {
            validator(value) {
                return oneOf(value, ['small', 'large', 'default']);
            }
        },
        clearable: {
            type: Boolean,
            default: true
        },
        // 空提示
        placeholder: {
            type: String,
            default: ''
        },
        // 禁用
        disabled: {
            type: Boolean,
            default: false
        },
        // 只读
        readonly: {
            type: Boolean,
            default: false
        },
        // 前缀
        prefix: {
            type: String,
            default: ''
        },
        // 后缀
        suffix: {
            type: String,
            default: ''
        },
        // 是否包含千分位
        includeThousandsSeparator: {
            type: Boolean,
            default: true
        },
        // 千分位符号
        thousandsSeparatorSymbol: {
            type: String,
            default: ','
        },
        // 是否允许小数
        allowDecimal: {
            type: Boolean,
            default: true
        },
        // 小数点符号
        decimalSymbol: {
            type: String,
            default: '.'
        },
        // 小数最大长度
        decimalLimit: {
            type: Number,
            default: 2
        },
        // 小数位必填
        requireDecimal: {
            type: Boolean,
            default: false
        },
        // 是否允许负数
        allowNegative: {
            type: Boolean,
            default: true
        },
        // 是否允许前导0
        allowLeadingZeroes: {
            type: Boolean,
            default: true
        },
        // 整数位最大长度
        integerLimit: {
            type: Number,
            default: 28
        },
        // 最小值
        min: {
            default: ''
        },
        // 最大值
        max: {
            default: ''
        }
    },
    data() {
        return {
            maskedValue: this.value + '',
            prefixCls: prefixCls,
            prepend: true,
            append: true,
            slotReady: false
        }
    },
    computed: {
        wrapClasses () {
            return [
                `${prefixCls}-wrapper`,
                {
                    [`${prefixCls}-wrapper-${this.size}`]: !!this.size,
                    [`${prefixCls}-type`]: this.type,
                    [`${prefixCls}-group`]: this.prepend || this.append,
                    [`${prefixCls}-group-${this.size}`]: (this.prepend || this.append) && !!this.size,
                    [`${prefixCls}-group-with-prepend`]: this.prepend,
                    [`${prefixCls}-group-with-append`]: this.append,
                    [`${prefixCls}-hide-icon`]: this.append  // #554
                }
            ];
        },
        inputClasses () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-${this.size}`]: !!this.size,
                    [`${prefixCls}-disabled`]: this.disabled
                }
            ];
        },
        strValue(){
            return this.value + ''
        }
    },
    methods: {
        mask: numberMask,
        toNumber(rawValue) {
            return rawValue ?
                parseFloat(rawValue.replace(this.prefix, '')
                    .replace(this.suffix, '')
                    .replace(new RegExp(this.thousandsSeparatorSymbol, "g"), '')) : 0
        },
        handleClear () {
            const e = { target: { value: '' } };

            this.maskedValue = ''
            this.$emit('input', '');
            this.$emit('on-change', e);
        },
        handleEnter (event) {
            this.$emit('on-enter', event);
        },
        handleKeydown (event) {
            this.$emit('on-keydown', event);
        },
        handleKeypress(event) {
            this.$emit('on-keypress', event);
        },
        handleKeyup (event) {
            this.$emit('on-keyup', event);
        },
        handleFocus (event) {
            this.$emit('on-focus', event);
        },
        handleBlur (event) {
            // < min
            if(this.isOverflow(this.toNumber(this.value)) < 0){
                this.$refs.maskInput.updateValue(this.min)
            }

            this.$emit('on-blur', event);
            this.dispatch('FormItem', 'on-form-blur', this.value)
        },
        handleInput (val) {
            var value = this.toNumber(val)
            this.maskedValue = val

            this.$emit('input', value + "")
            this.$emit('on-change', event)
            this.dispatch('FormItem', 'on-form-change', this.value)
        },
        handleChange (event) {
            // < min
            if(this.isOverflow(this.toNumber(this.value)) < 0){
                this.$refs.maskInput.updateValue(this.min)
            }

            this.$emit('on-input-change', event);
        },
        isOverflow(curValue){
            if(type(this.min) == "number"){
                if(curValue < this.min){
                    return -1
                }
            }

            if(type(this.max) == "number"){
                if(curValue > this.max){
                    return 1
                }
            }

            return 0
        }
    },
    mounted () {
        this.prepend = this.$slots.prepend !== undefined;
        this.append = this.$slots.append !== undefined;

        this.slotReady = true;
    },
    watch:{
        value(val){
            // 去除重复计算
            if(parseFloat(val) == this.toNumber(this.maskedValue)){
                return
            }

            this.$refs.maskInput.updateValue(val)
        }
    }
}

</script>
