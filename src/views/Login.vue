<template>
<div class="login">
    <h1>Sign in. For all Lecture.</h1>
    <h3>Please try not to hack us. lel.</h3>

    <el-input placeholder="Please input password" v-model="username_input"></el-input>
    <el-input placeholder="Please input password" v-model="password_input"></el-input>
    <vs-button v-on:click="type = disabled">Sign In</vs-button>
</div>
</template>

<script>
export default {
  name: 'Login',
  data() {

    return {
        sign_in_click: false,
      username_input: 'Username',
        password_input: 'Password',
    };
  },
};
</script>

<!--<style scoped>-->

<!--</style>-->
