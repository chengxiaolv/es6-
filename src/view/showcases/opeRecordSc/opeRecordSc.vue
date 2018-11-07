<template>
    <bus-card title="操作记录" @jump="showOpeRecordModal = true">
        <div class="svu-ope-record-item" v-for="(item,index) in latestOperateList" :key="index">
            <p>{{item.createTime| ymdL}}
            <p v-for="(innerItem,innerIndex) in item.content">{{innerItem}}</p>
        </div>
        <!-- 操作记录弹出窗 -->
        <smart-modal title="操作记录" v-model="showOpeRecordModal" :height="640"
            :buttons="[]">
            <ope-record-list v-if="showOpeRecordModal"></ope-record-list>
        </smart-modal>
    </bus-card>
</template>
<script>
    import smartModal from '@/components/smartModal'
    import busCard from '@/components/container/busCard'
    import opeRecordList from './opeRecordList'
    import { createNamespacedHelpers } from 'vuex'

    const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('opeRecord')

    export default {
        components: {
            smartModal,
            busCard,
            opeRecordList
        },
        props: {
            maxNum: {
                type: Number,
                default: 3
            }
        },
        data(){
            return {
                showOpeRecordModal: false
            }
        },
        computed: {
            ...mapState({
                records: "records"
            }),
            latestOperateList() {
                return this.records.slice(0, this.maxNum)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .svu-ope-record-item {
        margin-bottom: 20px;
        font-size: 12px;
        color: #333;
    }
</style>
