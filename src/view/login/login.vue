<style lang="less">
@import './login.less';

</style>
<template>
    <div class="login" @keydown.enter="handleLogin">
        <div class="login-con">
            <Card class="svu-login-card" :bordered="false" :padding="28">
                <div class="svu-login-title">欢迎登录</div>
                <div class="form-con">
                    <login-form @on-success-valid="handleSubmit"></login-form>
                </div>
            </Card>
        </div>
    </div>
</template>
<style lang="scss">
    .svu-login-card{
        background-color: rgba(255, 255, 255, 0.45);

        .svu-login-title{
            color: #fff;
            padding: 4px 0 10px 0;
            font-size: 24px;
        }
    }
</style>
<script>
import loginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
    components: {
        loginForm
    },
    methods: {
        ...mapActions([
            'handleLogin',
            'getUserInfo'
        ]),
        handleSubmit({ userName, password }) {
            this.handleLogin({ userName, password }).then(res => {
                this.getUserInfo().then(res => {
                    this.$router.push({
                        name: 'home'
                    })
                })
            })
        }
    }
}

</script>
