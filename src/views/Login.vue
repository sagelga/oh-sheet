<template>
    <div class="login">
        <div class="grid-content">

            <h1>Sign in.</h1>
            <h3>For all Lecture.</h3>

            <div>

                <div><!--Username input-->
                    <el-input v-model="username" clearable="" size="large">
                        <template slot="prepend">Username</template>
                    </el-input>
                </div>

                <div><!--Password input-->
                    <el-input v-model="password" clearable="" size="large">
                        <template slot="prepend">Password</template>
                    </el-input>
                </div>
            </div>

            <br/>

            <!--Remember Password-->
            <el-switch
                    v-model="rememberPassword"
                    active-color="#13ce66"
                    inactive-color="#909399"
                    active-value="True"
                    inactive-value="False"
                    active-text="Remember password">
            </el-switch>
            <br><br>

            <!--Sign In / Sign Up Button-->
            <el-button type="primary" round>Login</el-button>
            <el-button type="primary" round>Sign Up</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
                rememberPassword: 'False',
            };
        },
    };
</script>

<!--<style scoped>-->

<!--</style>-->
