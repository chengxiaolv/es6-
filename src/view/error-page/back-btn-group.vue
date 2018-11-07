<template>
    <div>
        <template v-if="canSystemAccess">
            <Button size="large" type="text" @click="backHome">返回首页</Button>
            <Button size="large" type="text" @click="backPrev">返回上一页({{ second }}s)</Button>
        </template>
        <Button v-else size="large" type="text">无权访问该系统</Button>
    </div>
</template>
<script>
    import './error.less'
    import { canSystemAccess } from '@/libs/util'

    export default {
        name: 'backBtnGroup',
        data() {
            return {
                second: 5,
                timer: null
            }
        },
        computed: {
            canSystemAccess() {
                return canSystemAccess(this.$store.state.user.access || [])
            }
        },
        methods: {
            backHome() {
                this.$router.replace({
                    name: 'home'
                })
            },
            backPrev() {
                this.$router.go(-1)
            }
        },
        mounted() {
            if (this.canSystemAccess) {
                this.timer = setInterval(() => {
                    if (this.second === 0) {
                        this.backPrev()
                        clearInterval(this.timer)
                    } else this.second--
                }, 1000)
            }
        },
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer)
            }
        }
    }
</script>
