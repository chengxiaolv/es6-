<template>
	<div class="cont-wrap">
		<Row :gutter="8">
			<Col span="6">
				<Card class="admin-card">
					<Row>
						<Col span="5">
							<Avatar :src="user.avatorImgPath" size="large"/>
						</Col>
						<Col span="19">
							<div>{{user.userName}}，欢迎您！</div>
							<div>{{user.roles.join(',')}}</div>
						</Col>
					</Row>
				</Card>
			</Col>
		</Row>
	</div>
</template>
<style lang="scss" scoped>
	.cont-wrap{
        width: 100%;
        background: $c-gray-bg;
        padding:10px;
    }

    .admin-card{
        .p-title{
            font-size: 14px;
            font-weight: bold;
        }
    }
</style>
<script>
	import { mapState } from 'vuex'
	
	export default {
		name: 'home',

		computed:{
			...mapState({
				user: "user"
			})
		}
	}
</script>
