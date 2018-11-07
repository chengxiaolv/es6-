import parentView from '@/components/parent-view'

export default [{
		path: '/home',
		name: 'home',
		meta: {
			hideInMenu: true,
			notCache: true,
			title: '首页'
		},
		component: () =>
			import ('@/view/single-page/home')
	},
	{
		path: '/workbench',
		name: 'workbench',
		meta: {
			icon: 'gongzuotai',
			title: '我的工作台'
		},
		component: parentView,
		children: [{
				path: 'todo',
				name: 'todo',
				meta: {
					icon: 'daiban',
					title: '我的待办'
				},
				component: () =>
					import ('@/view/workbench/todo.vue')
			},
			{
				path: 'dashboard',
				name: 'dashboard',
				meta: {
					icon: 'yibiaopan',
					title: '仪表盘'
				},
				component: () =>
					import ('@/view/workbench/dashboard.vue')
			}
		]
	},
	{
		path: '/customer',
		name: 'customer',
		redirect: '/customer/list',
		meta: {
			icon: 'kehu',
			title: '客户管理',
			access: 'comm:cstcustomer'
		},
		component: parentView,
		children: [
			{
				path: 'list',
				name: 'customer-list',
				meta: {
					hideInMenu: true,
					title: '客户管理',
					access: 'comm:cstcustomer'
				},
				component: () =>
					import ('@/view/customer/list.vue')
			},
			{
				path: 'personal/detail/:id',
				name: 'personal-detail',
				meta: {
					hideInMenu: true,
					hideCrumb: false,
					title: "客户详情"
				},
				component: () =>
					import ('@/view/customer/personal-detail.vue')
			},
			{
				path: 'corp/detail/:id',
				name: 'corp-detail',
				meta: {
					hideInMenu: true,
					hideCrumb: false,
					title: "客户详情"
				},
				component: () =>
					import ('@/view/customer/corp-detail.vue')
			}
		]
	},
	{
		path: '/materials',
		name: 'materials',
		redirect: '/materials/list',
		meta: {
			icon: 'jinjian',
			title: '进件管理',
			access: 'entry:cstcase'
		},
		component: parentView,
		children:[
			{
				path: 'list',
				name: 'materials-list',
				meta: {
					hideInMenu: true,
					title: '进件管理',
					access: 'entry:cstcase'
				},
				component: () =>
					import ('@/view/materials/list.vue')
			},
			{
				path: 'detail/:id',
				name: 'materials-detail',
				meta: {
					hideInMenu: true,
					hideCrumb: false,
					title: '进件详情'
				},
				component: () =>
					import ('@/view/materials/detail.vue')
			}
		]
	},
	{
		path: '/contract',
		name: 'contract',
		redirect: '/contract/list',
		meta: {
			icon: 'qianyue',
			title: '签约管理',
			access: 'sign:cstcontract'
		},
		component: parentView,
		children:[
			{
				path: 'list',
				name: 'contract-list',
				meta: {
					hideInMenu: true,
					title: '签约管理',
					access: 'sign:cstcontract'
				},
				component: () =>
					import ('@/view/contract/list.vue')
			},
			{
				path: 'detail/:id/:caseId',
				name: 'contract-detail',
				meta: {
					hideInMenu: true,
					hideCrumb: false,
					title: '签约详情'
				},
				component: () =>
					import ('@/view/contract/detail.vue')
			}
		]
	},
	{
		path: '/loan',
		name: 'loan',
		meta: {
			icon: 'daihou',
			title: '贷后管理'
		},
		component: () =>
			import ('@/view/loan/list.vue')
	},
	{
		path: '/guarantee',
		name: 'guarantee',
		meta: {
			icon: 'yapin',
			title: '押品管理'
		},
		component: () =>
			import ('@/view/guarantee/list.vue')
	},
	{
		path: '/archives',
		name: 'archives',
		meta: {
			icon: 'dangan',
			title: '档案管理'
		},
		component: parentView,
		children: [{
				path: 'image',
				name: 'image',
				meta: {
					icon: 'yingxiang',
					title: '影像材料'
				},
				component: () =>
					import ('@/view/archives/image.vue')
			},
			{
				path: 'document',
				name: 'document',
				meta: {
					// access: ['super_admin'],
					icon: 'wendang',
					title: '文档材料'
				},
				component: () =>
					import ('@/view/archives/document.vue')
			}
		]
	},
	{
		path: '/report',
		name: 'report',
		meta: {
			icon: 'baobiao',
			title: '报表查询'
		},
		component: () =>
			import ('@/view/report/index.vue')
	},
	{
		path: '/order',
		name: 'order',
		meta: {
			icon: 'dingdan',
			title: '订单管理'
		},
		component: parentView,
		children: [{
				path: 'order1',
				name: 'order1',
				meta: {
					icon: 'xiahu',
					title: '下户订单'
				},
				component: () =>
					import ('@/view/order/order1.vue')
			},
			{
				path: 'order2',
				name: 'order2',
				meta: {
					// access: ['super_admin'],
					icon: 'pinggu',
					title: '评估订单'
				},
				component: () =>
					import ('@/view/order/order2.vue')
			}
		]
	}
]
