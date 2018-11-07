<template>
    <div :class="itemClasses">
        <div :class="headerClasses" @click="toggle">
            <shield-icon type="fold" color="#169BD5"></shield-icon>
            <slot name="header"></slot>
        </div>
        <shield-collapse-transition>
            <div :class="contentClasses" v-show="isActive">
                <div :class="boxClasses">
                    <slot></slot>
                </div>
            </div>
        </shield-collapse-transition>
    </div>
</template>
<style lang='scss'>
    .ivu-collapse>.svu-collapse-item>.svu-collapse-header>i {
        transition: -webkit-transform .2s ease-in-out;
        transition: transform .2s ease-in-out;
        transition: transform .2s ease-in-out,-webkit-transform .2s ease-in-out;
    }
    .ivu-collapse>.svu-collapse-item.svu-collapse-item-active>.svu-collapse-header>i {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }
    .ivu-collapse>.svu-collapse-item {
        border: 1px solid #dddee1;
        border-radius: 3px;
    }
    .ivu-collapse>.svu-collapse-item>.svu-collapse-header {
        height: 38px;
        line-height: 38px;
        padding-right: 32px;
        padding-left: 15px;
        color: #666;
        cursor: pointer;
        position: relative;
        background-color: #f7f7f7;
    }
    .svu-collapse-header{
        i{
            position: absolute;
            right: 15px;
        }
    }
    .svu-collapse-content {
        color: #495060;
        padding: 0 16px;
        background-color: #fff;
    }
</style>
<script>
    import ShieldIcon from '@/components/icon';
    import ShieldCollapseTransition from './collapse-transition';
    const prefixCls = 'svu-collapse';
    
    export default {
        name: 'sPanel',
        components: { ShieldIcon, ShieldCollapseTransition },
        props: {
            name: {
                type: String
            }
        },
        data() {
            return {
                index: 0, // use index for default when name is null
                isActive: false
            };
        },
        computed: {
            itemClasses() {
                return [
                    `${prefixCls}-item`,
                    {
                        [`${prefixCls}-item-active`]: this.isActive
                    }
                ];
            },
            headerClasses() {
                return `${prefixCls}-header`;
            },
            contentClasses() {
                return `${prefixCls}-content`;
            },
            boxClasses() {
                return `${prefixCls}-content-box`;
            }
        },
        methods: {
            toggle() {
                this.$parent.toggle({
                    name: this.name || this.index,
                    isActive: this.isActive
                });
            }
        }
    };
</script>
