<template>
    <div class="page">
        <div class="box">
            <div class="login">
                <h2 class="title">登录</h2>
                <div class="from">
                    <div>
                        <label for="account">账号</label>
                        <input type="text" name="account" v-model="account" />
                    </div>
                    <div>
                        <label for="passwors">密码</label>
                        <input type="password" name="password" v-model="password" />
                    </div>
                    <div>
                        <button @click="login">登录</button>
                    </div>
                </div>
            </div>

            <div class="register"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            account: "",
            password: ""
        };
    },
    methods: {
        login() {
            console.log(this.account);
            console.log(this.password);
            this.$api
                .login({
                    account: this.account,
                    password: this.password
                })
                .then(({ data }) => {
                    console.log(data);
                });
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    width: 100%;
    height: 100vh;
    background: #000;
    display: grid;
    .box {
        margin: auto;
        height: 400px;
        width: 400px;
        background-color: tomato;
        display: flex;
    }
}
</style>