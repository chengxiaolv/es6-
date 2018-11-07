<template>
	<svu-panel class="svu-detail-panel" :name="name" ref="p">
        <div class="svu-detail-panel-title" slot="header">
            <span>基本信息</span>
            <Button class="svu-detail-panel-header-btn" v-if="isActive" type="primary" size="small"
                @click.stop="showModal(modalName)">
                修改
            </Button>
        </div>
        <silence-form :data="personalInfo" :prefix="'personal.'" :strategy="baseStrat"></silence-form>
        <smart-modal v-if="personalInfo.customerId"  title="基本信息" 
        	:value="modals[modalName]" @input="toggleModal(modalName)" :height="640"
            @close-by-confirm='fetchPersonalInfo(personalInfo.customerId)'>
            <base-form v-if="modals[modalName]" :customerId="personalInfo.customerId"></base-form>
        </smart-modal>
    </svu-panel>
</template>
<script>
	import { panelable, Panel as svuPanel } from '@/components/container/panel'
	import { silenceForm, Strategy } from '@/components/form/silenceForm'
	import { createNamespacedHelpers } from 'vuex'
	import Dict from '@/components/global/dict'
	import Constant from '@/components/global/constant'
	import smartModal from '@/components/smartModal'
	import baseForm from './baseForm'
	
	const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('customer/personalInfo')
	const { mapState : mapDetailState, mapMutations : mapDetailMutations } = createNamespacedHelpers('detail')

	export default {
		mixins:[panelable],
		components: {
			svuPanel,
			smartModal,
			silenceForm,
			baseForm
		},
		props: {
			name: {
				type: String
			}
		},
		data() {
			return {
				// 业务相关
				modalName: "personalInfo",
				baseStrat: Strategy.NULL
			}
		},
		computed: {
			...mapState({
				personalInfo: "personalInfo"
			}),
			...mapDetailState({
				modals: "modals"
			})
		},
		methods: {
			...mapActions([
				"fetchPersonalInfo"
			]),
			...mapDetailMutations([
				"showModal",
				"toggleModal"
			])
		},
		mounted() {
			Dict.get([
				"credTypePersonal","maritalStat","nation","livingStat","educationLevel"
			]).then(dicts => {
				dicts.credType = dicts.credTypePersonal
				this.baseStrat = new Strategy([
					{ type: "Dict", dicts: dicts},
					{ type:"Constant",constant: Constant.get("sex"), rule: "sex"},
					{ type:"Area",options: [], rule: "cityId" },
				])
			})
		}
	}
</script>
