<template>
    <div class="side-menu-wrapper">
        <slot></slot>
        <Menu ref="menu" v-show="!collapsed" width="auto"
            :active-name="activeName" 
            :open-names="openedNames" 
            :accordion="accordion" 
            :theme="theme"
            @on-select="handleSelect">
            <template v-for="item in menuList">
                <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
                <menu-item v-else :name="`${item.name}`" :key="`menu-${item.name}`">
                    <shield-icon :type="item.icon" /><span>{{ showTitle(item) }}</span>
                </menu-item>
            </template>
        </Menu>
        <div class="menu-collapsed" v-show="collapsed" :list="menuList">
            <collapsed-menu v-for="item in menuList"
                hide-title
                :root-icon-size="rootIconSize" 
                :icon-size="iconSize" 
                :theme="theme" 
                :parent-item="item" 
                :key="`drop-menu-${item.name}`"      
                @on-click="handleSelect">
            </collapsed-menu>
        </div>
    </div>
</template>
<script>
import sideMenuItem from './side-menu-item.vue'
import collapsedMenu from './collapsed-menu.vue'
import shieldIcon from '@/components/icon'
import { getIntersection } from '@/libs/tools'
import mixin from './mixin'

export default {
    name: 'sideMenu',
    mixins: [mixin],
    components: {
        sideMenuItem,
        collapsedMenu,
        shieldIcon
    },
    props: {
        menuList: {
            type: Array,
            default () {
                return []
            }
        },
        collapsed: {
            type: Boolean
        },
        theme: {
            type: String,
            default: 'dark'
        },
        rootIconSize: {
            type: Number,
            default: 20
        },
        iconSize: {
            type: Number,
            default: 16
        },
        accordion: Boolean,
        activeName: {
            type: String,
            default: ''
        },
        openNames: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            openedNames: []
        }
    },
    methods: {
        handleSelect(name) {
            this.$emit('on-select', name)
        },
        getOpenedNamesByActiveName(name) {
            return this.$route.matched.map(item => item.name).filter(item => item !== name)
        }
    },
    watch: {
        activeName(name) {
            if (this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name)
            else this.openedNames = getIntersection(this.openedNames, this.getOpenedNamesByActiveName(name))
        },
        openNames(newNames) {
            this.openedNames = newNames
        },
        openedNames() {
            this.$nextTick(() => {
                this.$refs.menu.updateOpened()
            })
        }
    },
    mounted() {
        this.openedNames = getIntersection(this.openedNames, this.getOpenedNamesByActiveName(name))
    }
}

</script>
<style lang="less">
@import './side-menu.less';

</style>
