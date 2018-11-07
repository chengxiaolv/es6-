<template>
    <Submenu :name="`${parentName}`">
        <template slot="title">
            <shield-icon :type="parentItem.icon" />
            <span>{{ showTitle(parentItem) }}</span>
        </template>
        <template v-for="item in children">
            <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item">
            </side-menu-item>
            <menu-item v-else :name="`${item.name}`" :key="`menu-${item.name}`">
                <shield-icon :type="item.icon" /><span>{{ showTitle(item) }}</span>
            </menu-item>
        </template>
    </Submenu>
</template>
<script>
import mixin from './mixin'
import itemMixin from './item-mixin'
import shieldIcon from '@/components/icon'

export default {
    name: 'sideMenuItem',
    mixins: [mixin, itemMixin],
    components: {
        shieldIcon
    }
}

</script>
