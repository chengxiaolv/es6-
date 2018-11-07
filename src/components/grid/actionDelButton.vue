<template>
	<Poptip
        confirm
        :title="title"
        @on-ok="ok"
        @on-cancel="cancel">
        <Button type="text" size="small">{{text}}</Button>
    </Poptip>
</template>
<script>
	export default {
		props: {
			title: {
				type: String,
				default: "您确认删除这条内容吗？"
			},
			text: {
				type: String,
				default: "删除"
			},
			ok:{
				type: Function,
				default: () => {}
			},
			cancel:{
				type: Function,
				default: () => {}
			}
		}
	}
</script>