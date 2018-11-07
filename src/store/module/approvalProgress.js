import { findNode, isCan } from '@/api/flow'
import { getContractByCaseId } from '@/api/contract'

export default {
	namespaced: true,

	state: {
		approval:{
			list: [],
			nextTask: "",
			processId: "",
			userName: "",
			stage: "",
			action: "",
			isCan: false
			// isContractExist: false
		},
		onlineProcess: [
			"进件初审",
			"进件复审",
			"合同签约",
			"合同审批"
		]
	},

	getters: {
		canApproval(state) {
			var {isCan, nextTask} = state.approval

			return isCan && state.onlineProcess.indexOf(nextTask) >= 0
		}
	},

	mutations: {
		setData(state, data) {
			Object.keys(state.approval).forEach(k => state.approval[k] = data[k])
		}
	},

	actions: {
		fetch({ commit }, dataId) {
			Promise.all([
					findNode(dataId),
					isCan(dataId)
					// getContractByCaseId(dataId)
				])
				.then(args => {
					var data = {}

					Object.assign(data, args[0].data, {
						isCan: !!args[1].data.dataId
						// isContractExist: !!args[2].data
					})

					commit("setData", data)
				})
		}
	}
}
