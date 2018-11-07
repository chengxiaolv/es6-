<template>
	<bus-card title="业务信息" @jump="jump">
    	<Row v-if="currentBusInfo">
			<Col span="24">
				<div class="buse-header">
					<h3 class="info-username">{{currentBusInfo.projectName}}-进件</h3>
					<div class="buse-bar">
						<Row>
							<Col span="8" class="icon-wrap">
								<shield-icon type="chaopiao" size="18" class="case-icon"></shield-icon>
								<span class="info-text">{{currentBusInfo.applyAmount / 10000 | currency(0)}}</span>万
							</Col>
							<Col span="8" class="icon-wrap">
								<shield-icon type="rili" size="18" class="case-icon"></shield-icon>
								<span class="info-text">{{currentBusInfo.applyTerm}}</span>月
							</Col>
							<Col span="8" class="icon-wrap">
								<shield-icon type="gupiao" size="18" class="case-icon"></shield-icon>
								<span class="info-text">{{currentBusInfo.applyRate}}</span>%
							</Col>
						</Row>
					</div>
				</div>
				<div>
					<spec-stage-bar></spec-stage-bar>
		        </div>
			</Col>
		</Row>
		<Row v-else>
			<Col span="24">
				<div style="text-align:cnter;">暂无业务信息</div>
			</Col>
		</Row>
    </bus-card>
</template>
<style lang="scss" scoped>
	.buse-bar{
		margin: 15px auto;

		.icon-wrap{
			text-align: center;
			line-height: 18px;
		}
		.case-icon{
			position: relative;
			top: 1px;
		}
		.info-text{
			color: $c-primary;
			margin: 0 4px;
		}
	}
</style>
<script>
	import busCard from '@/components/container/busCard'
	import shieldIcon from '@/components/icon'
	import specStageBar from '@/view/materials/components/specStageBar'
	import { createNamespacedHelpers } from 'vuex'

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('credit/busInfo')

	export default {
		components:{
			shieldIcon,
			busCard,
			specStageBar
		},
		computed:{
			...mapState({
				busInfo: "busInfo"
			}),
			...mapGetters({
				currentBusInfo: "currentBusInfo"
			})
		},
		methods:{
			jump(){
				var id = this.currentBusInfo.id
				
				if(id){
					this.$router.push({
	                    name: 'materials-detail',
	                    params: {
	                        id 
	                    }
	                })
				}
            }
		}
	}
</script>
