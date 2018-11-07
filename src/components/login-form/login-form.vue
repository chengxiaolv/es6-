<template>
    <Form ref="loginForm" :model="form" :rules="rules">
        <FormItem prop="userName">
            <Input v-model="form.userName" placeholder="请输入用户名">
            <span slot="prepend">
                <img class="login-icon" src="../../assets/images/MaleUser.png" alt="">
            </span>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="form.password" placeholder="请输入密码">
            <span slot="prepend">
                <img class="login-icon" src="../../assets/images/Lock.png" alt="">
            </span>
            </Input>
        </FormItem>
        <Row style="margin-bottom: 24px;">
            <Col span="12">
                <Checkbox v-model="form.auto">下次自动登录</Checkbox>
            </Col>
            <Col span="12">
                <div class="login-forget-pwd">忘记密码</div>
            </Col>
        </Row>
        <FormItem>
            <Button @click="handleSubmit" type="primary" long>登录</Button>
        </FormItem>
    </Form>
</template>
<style lang="scss" scoped>
    .login-icon{
        width: 14px;
        height: 14px;
    }
    .login-forget-pwd{
        color: #fff;
        text-align: right;
        cursor: pointer;
        font-size: 12px;
    }
</style>
<script>
export default {
    name: 'loginForm',
    props: {
        userNameRules: {
            type: Array,
            default: () => {
                return [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ]
            }
        },
        passwordRules: {
            type: Array,
            default: () => {
                return [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    data() {
        return {
            auto: 0,
            form: {
                userName: 'ywy1',
                password: ''
            }
        }
    },
    computed: {
        rules() {
            return {
                userName: this.userNameRules,
                password: this.passwordRules
            }
        }
    },
    methods: {
        handleSubmit() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.$emit('on-success-valid', {
                        userName: this.form.userName,
                        password: this.form.password
                    })
                }
            })
        }
    }
}

</script>
