<template>
	<div>
		<Row>
			<Col span="24">
				<div class="tag" v-for="(item, index) in tags" type="border" 
					:class="{active : active == index}" 
					@click="switchTag(index)">
					{{item.text}}
				</div>
			</Col>
		</Row>
		<Row>
			<Col span="24">
				<component v-bind:is="com"></component>
			</Col>
		</Row>
	</div>
</template>
<style lang="scss" scoped>
	$primary: #2d8cf0;

	.tag{
		border: 1px solid $c-gray-bd;
		color: $c-in-active-font;
		display: inline-block;
		margin-right: 25px;
		line-height: 34px;
		cursor: pointer;
		border-radius: 3px;
		min-width: 92px;
		text-align: center;
		margin-bottom: 16px;
		
		&.active{
			border-color: $primary;
			color: white;
			background-color: $primary;
		}
	}
</style>
<script>
	import personForm from "./personal/personalForm"
	import corpForm from "./corp/addCorpForm"
	import Dict from '@/components/global/dict'

	export default {
		components:{
			personForm,
			corpForm
		},
		inject:{
           $modal:{default: null}
        },
		data(){
			return {
				tags: [
					{text:"个人客户", value: "personForm"},
					{text:"企业客户", value: "corpForm"}
				],
				com: "personForm",
				active: 0
			}
		},
		methods:{
			switchTag(i){
				this.active = i
				this.$modal.clearHook()
				this.com = this.tags[i].value
			}
		},
		mounted() {
		    // 数据预加载
            this.$modal.beforeEnter((next) => {
                // api 取数
                Promise.all([
                    Dict.get(["sourceFrom", "cstType"])
                ])
                .then(args => {
                    // 记得调用next触发下一步，否则Modal窗口不会显示内容
                    next()
                })
			})
		}
	}
</script>