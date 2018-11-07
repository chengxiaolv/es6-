<template>
    <li :class="itemClasses" @click="toggle">
        <div :class="tailClasses"></div>
        <div :class="headClasses" ref="dot">
            <slot name="dot" :active="active"></slot>
        </div>
        <div :class="contentClasses">
            <slot></slot>
        </div>
    </li>
</template>
<script>
    const prefixCls = 'svu-timeline'

    export default {
        name: 'TimelineItem',
        props: {
            name:{
                type: String,
                default: ''
            }
        },
        data () {
            return {
                index: 0,
                active: false,
                dot: false
            };
        },
        mounted () {
            this.dot = this.$refs.dot.innerHTML.length ? true : false
        },
        computed: {
            itemClasses () {
                return `${prefixCls}-item`
            },
            tailClasses () {
                return `${prefixCls}-item-tail`
            },
            headClasses () {
                return [
                    `${prefixCls}-item-head`, // border画圆框
                    {
                        [`${prefixCls}-item-head-custom`]: this.dot, // 去掉border
                        'active': this.active // active 类
                    }
                ]
            },
            // customColor () {
            //     let style = {}

            //     // 决定节点标示颜色
            //     if(this.active){
            //         style = this.activeColor ? {
            //             'color': this.activeColor,
            //             'border-color': this.activeColor
            //         } : {
            //             'color': 'blue',
            //             'border-color': 'blue'
            //         }
            //     }else{
            //         style = this.color ? {
            //             'color': this.color,
            //             'border-color': this.color
            //         } : {
            //             'color': 'gray',
            //             'border-color': 'gray'
            //         }
            //     }
                
            //     return style
            // },
            contentClasses () {
                return `${prefixCls}-item-content`
            }
        },
        methods:{
            toggle(){
                var active = !this.active

                this.$parent.toggle({
                    name: this.name || this.index,
                    active: active
                })

                this.$parent.$emit("item-click", this.name || this.index)
            }
        }
    }
</script>
