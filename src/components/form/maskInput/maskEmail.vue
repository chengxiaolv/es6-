<template>
    <masked-input type="text"
        :value = "value"
        @input = "val => $emit('input', val)"
        :mask="mask" 
        :name="name"  
        :guide="guide" 
        :showMask='false'
        :placeholderChar="placeholderChar">
    </masked-input>
</template>
<script>
import emailMask from './emailMask'

export default {
    props: {
        value:{
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        guide: {
            type: Boolean,
            default: true
        },
        placeholderChar:{
            type: String,
            default: '#'
        },
        atSymbol:{
            type: String,
            default: '@'
        },
        dot:{
            type: String,
            default: '.'
        }
    },
    methods:{
        mask: emailMask
    }
}
</script>
<style>
</style>
