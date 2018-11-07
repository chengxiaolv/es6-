<template>
	<bus-card title="客户信息" @jump="customerInfoJump">
		<Row>
			<Col span="24">
				<div class="buse-header">
					<h3 class="info-username">{{customerInfo.userName}}</h3>
					<div class="cus-bar">
						<Row>
							<Col span="24" class="icon-wrap">
								<shield-icon type="phone" size="18"></shield-icon>
								<span class="info-text">{{customerInfo.contactMobile}}</span>
							</Col>
						</Row>
						<Row>
							<Col span="24" class="icon-wrap">
								<shield-icon type="location" size="18"></shield-icon>
								<span class="info-text">{{customerInfo.birthAddr}}</span>
							</Col>
						</Row>
					</div>
				</div>
			</Col>
		</Row>	
	</bus-card>
</template>
<style lang="scss" scoped>
	.cus-bar{
		margin: 15px auto;

		.icon-wrap{
			text-align: left;
		}
	}
</style>
<script>
	import busCard from '@/components/container/busCard'
	import shieldIcon from '@/components/icon'
	import Dict from '@/components/global/dict'
	import { createNamespacedHelpers } from 'vuex'

	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/customerInfo')

	export default {
		components:{
			shieldIcon,
			busCard
		},
		data(){
			return {
				cstType: Dict.NULL
			}
		},
		computed:{
			...mapState({
				customerInfo: "customerInfo"
			})
		},
		methods:{
			customerInfoJump(){
				var type = this.cstType.val(this.customerInfo.cstType)

				if(type == "个人客户"){
					this.$router.push({
                        name: 'personal-detail',
                        params: {
                            id: this.customerInfo.id
                        }
                    })
				}

				if(type == "企业客户"){
					this.$router.push({
                        name: 'corp-detail',
                        params: {
                            id: this.customerInfo.id
                        }
                    })
				}
            }
		},
		mounted(){
			Dict.get("cstType").then(cstType => this.cstType = cstType)
		}
	}
</script>