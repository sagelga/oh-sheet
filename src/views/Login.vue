<template>
    <div class="login">
        <el-row :gutter="10">

            <el-col :xs="1" :sm="1" :md="4" :lg="6" :xl="1">
                <div class="grid-content"></div>
            </el-col>

            <el-col :xs="22" :sm="22" :md="16" :lg="12" :xl="11">
                <div class="bg-purple-light">
                    <h1>Sign in. For all Lecture.</h1>

                    <form>
                        <div><!--Username input-->
                            <p align="left">Username</p>
                            <el-input v-model="username"
                                      clearable=""
                                      size="large"
                                      class="inputTextLogin"
                                      auto-complete="on"
                                      type="text">
                            </el-input>
                        </div>

                        <div><!--Password input-->
                            <p align="left">Password</p>
                            <el-input v-model="password"
                                      clearable=""
                                      size="large"
                                      class="inputTextLogin"
                                      auto-complete="on"
                                      type="password">
                            </el-input>
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
                        <br/><br/>

                        <!--Sign In / Sign Up Button-->
                        <el-button type="primary" round>Login</el-button>
                        <el-button type="primary" round>Sign Up</el-button>

                    </form>
                </div>
            </el-col>

            <el-col :xs="1" :sm="1" :md="4" :lg="6" :xl="1">
                <div class="grid-content"></div>
            </el-col>

        </el-row>
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

  // methods: {
  //   onSubmit() {
  //     console.log('Submit the login form !!');
  //   },
  // },

};
</script>

<style scoped>
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        width: 50%;
        alignment: center;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }


</style>
