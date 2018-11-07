<template>
	<bus-card title="客户跟进" @jump="showModal('cstTrack')">
		<template v-if="tracksForShow.length > 0">
			<div style="width: 100%;min-height: 40px;padding-top:10px;padding-left:10px;"
				v-for="(item, index) in tracksForShow">
				<div>{{item.createTime|ymdL}}</div>
				<div>{{item.content}}</div>
			</div>
		</template>
		<div v-else>暂无跟进信息</div>
	</bus-card>
</template>
<script>
	import busCard from '@/components/container/busCard'
	import { createNamespacedHelpers } from 'vuex'

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/cstTrack')
	const { mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		components: {
			busCard
		},
		props: {
			maxNum: {
				type: Number,
				default: 3
			}
		},
		computed: {
			...mapState({
				tracks: "tracks"
			}),
			
			tracksForShow() {
				return this.tracks.list.slice(0, this.maxNum)
			}
		},
		methods: {
			...mapDetailMutations([
                "showModal"
            ])
		}
	}

</script>
