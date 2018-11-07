<template>
    <div class="svu-timeline-container">
        <ul :class="classes" ref="timeline" @scroll="scrollHandler">
            <slot></slot>
        </ul>
    </div>
</template>
<script>
    import {type, throttle} from '@/libs/util'

    const prefixCls = 'svu-timeline';
    
    export default {
        name: 'Timeline',
        props: {
            pending: {
                type: Boolean,
                default: false
            },
            multiple: {
                type: Boolean,
                default: true
            },
            value: {
                type: Array,
                default: function(){
                    return []
                }
            },
            selectable:{
                type: [Boolean, Function],
                default: true
            }
        },
        data(){
            return {
                childrenPosition: [],
                navigators: []
            }
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-pending`]: this.pending
                    }
                ];
            },
            canSelect(){
                if(type(this.selectable) == "boolean"){
                    return this.selectable
                }

                if(type(this.selectable) == "function"){
                    return this.selectable()
                }

                return false
            }
        },
        methods:{
            toggle(data){
                var {name, active} = data,
                    activeItems = this.value.slice(0),
                    nameIndex = activeItems.indexOf(name),
                    canSelect = this.selectable,
                    changed = false

                if(type(this.selectable) == "function"){
                    canSelect = this.selectable(name)
                }

                // 不可选择的
                if(canSelect == false){
                    return
                }

                if(this.multiple){
                    if(active){
                        if(nameIndex >= 0){
                            return
                        }else{
                            activeItems.push(name)
                            changed = true
                        }
                    }else{
                        if(nameIndex >= 0){
                            activeItems.splice(nameIndex, 1)
                            changed = true
                        }
                    }
                }else{
                    if(name != activeItems[0]){
                        changed = true
                    }
                    activeItems = [name]
                }
                
                this.setActiveItems(activeItems)

                if(changed){
                    this.$emit("change", {
                        value: activeItems,
                        name,
                        active
                    })
                }
            },
            setActiveItems(names){
                this.$children.forEach(($item, index) => {
                    $item.index = index
                    
                    if(names.indexOf($item.name || $item.index) >= 0){
                        $item.active = true
                    }else{
                        $item.active = false
                    }
                })

                this.$emit("update:value", names)
            },
            scrollTo(name){
                var index = name,
                    target
                
                if(type(name) == "string"){
                    index = this.$children.findIndex(v => v.name == name)
                }

                target = this.$children[index]

                if(target){
                    this.$refs.timeline.scrollTop = target.$el.offsetTop
                }
            },
            scrollHandler: throttle(250, function(e){
                var target = e.target
                var scrollTop = target.scrollTop
                var current = 0

                for(var i=0; i < this.childrenPosition.length; i++){
                    if(this.childrenPosition[i] == scrollTop){
                        current = i
                        break;
                    }
                    if(this.childrenPosition[i] > scrollTop){
                        current = i - 1
                        break;
                    }
                }

                this.$emit("scrollOn", this.$children[current])
            }),
            bindNavigator($timeline){
                if($timeline.multiple){
                    $Vue.util.warn("导航timeline必须为单选模式", $timeline)

                    return
                }

                // 导航器
                var nav = {
                    vm: $timeline,
                    scrollTo: name => {
                        this.scrollTo(name)
                    },
                    scrollOn: $item => {
                        $timeline.toggle({
                            name: $item.name || $item.index,
                            active: true
                        })
                    }
                }
                // 点击导航
                $timeline.$on("item-click", nav.scrollTo)
                // 反向同步
                this.$on("scrollOn", nav.scrollOn)

                this.navigators.push(nav)
            },
            unbindNavigator($timeline){
                var unbind = nav => {
                    var vm = nav.vm

                    this.$off("scrollOn", nav.scrollOn)
                    vm.$off("item-click", nav.scrollTo)
                }

                if($timeline){
                    // 移除指定的导航器
                    var index = this.navigators.findIndx(v => v.vm === $timeline)

                    if(index >= 0){
                        var nav = this.navigators.splice(index, 1)
                        unbind(nav)
                    }
                }else{
                    // 移除所有导航器
                    this.navigators.forEach(unbind)
                }
            }
        },
        mounted(){
            this.setActiveItems(this.value)
            // 记录item的位置
            this.$nextTick(() => {
                this.$children.forEach((t, index) => this.childrenPosition[index] = t.$el.offsetTop)
            })
        },
        beforeDestroy(){
            // 销毁前移除所有导航
            this.unbindNavigator()
        }   
    }
</script>
