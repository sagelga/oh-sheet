<template>
  <div class="top-gap login-wrap">
    <el-card>
      <div slot="header" class="clearfix">
        <span>เข้าสู่ระบบ</span>
        <router-link class="card-title-link" to="/signup/">สมัครสมาชิก</router-link>
      </div>
      <el-alert :title="error" type="error" v-show="error"></el-alert>
      <el-form>
        <el-form-item label="ชื่อผู้ใช้"><!--Username input-->
          <el-input v-model="username"
                    class="inputTextLogin"
                    auto-complete="on"
                    type="text">
          </el-input>
        </el-form-item>
        <el-form-item label="รหัสผ่าน"><!--Password input-->
          <el-input v-model="password"
                    size="large"
                    class="inputTextLogin"
                    auto-complete="on"
                    type="password">
          </el-input>
        </el-form-item>
        <!--Remember Password-->
        <el-form-item>
          <el-checkbox v-model="rememberPassword">จำฉันไว้</el-checkbox>
        </el-form-item>
        <!--Sign In / Sign Up Button-->
        <el-button type="primary" round @click="logInUser(username, password)">
          เข้าสู่ระบบ
        </el-button>
        <el-button type="text" style="margin-right: 2em">ลืมรหัสผ่าน</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import router from '../router';

const Parse = require('parse/dist/parse.min');

Parse.initialize('A7gOtAmlXetuUbCejDVjEPiyMJpR4ET9TSjDHiqP', 'UaRg8CWpNhY9WbkDk93Ki6LQZ7ssnQfVRMXYyRJr');
Parse.serverURL = 'https://parseapi.back4app.com/';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      rememberPassword: false,
      error: '',
    };
  },
  methods: {
    logInUser(usr, pwd) {
      const that = this;
      this.error = '';
      Parse.User.logIn(usr, pwd)
        .then(() => {
          that.openModal();
          this.$parent.loggedIn = true;
          router.push('/');
        }, (error) => {
          that.error = error.message;
        });
    },
    openModal() {
      this.$alert('เข้าสู่ระบบสำเร็จ', 'ยินดีด้วย', {
        confirmButtonText: 'ตกลง',
      });
    },
  },
};
</script>
