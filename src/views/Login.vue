<template>
  <div class="top-gap bottom-gap login-wrap">
    <el-card>
      <div slot="header" class="clearfix">
        <span>เข้าสู่ระบบ</span>
        <router-link class="card-title-link" to="/signup/">ผู้ใช้งานใหม่? สมัครที่นี่</router-link>
      </div>
      <el-alert :title="error" type="error" v-show="error"></el-alert>
      <el-form id="login-form" v-loading="loading">
        <el-form-item label="ชื่อผู้ใช้งาน"><!--Username input-->
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
        <!--Sign In / Sign Up Button-->
        <div style="margin-top: 1.25em">
          <el-button id="login-btn" type="primary" round @click="logInUser(username, password)">
            เข้าสู่ระบบ
          </el-button>
          <el-button type="text" style="margin-right: 2em" @click="resetPwdDialogVisible = true">
            ลืมรหัสผ่าน</el-button>
        </div>
      </el-form>
    </el-card>
    <el-dialog title="รีเซ็ตรหัสผ่าน" :visible.sync="resetPwdDialogVisible" id="reset-dialog">
      <el-alert title="กรุณาตรวจสอบอีเมลเพื่อรีเซ็ตรหัสผ่าน" type="success"
                v-if="resetSucceed && !resetLoading"></el-alert>
      <el-alert :title="resetFailText" type="error"
                v-if="!resetSucceed && !resetLoading && resetFailText"></el-alert>
      <el-form>
        <el-form-item label="กรอกอีเมลที่ต้องการรีเซ็ตรหัสผ่าน">
          <el-input v-model="resetPwdEmail" size="large" type="email" id="reset-input"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetPwdDialogVisible = false">ยกเลิก</el-button>
        <el-button type="primary" @click="resetPwd(resetPwdEmail)" id="reset-btn">รีเซ็ต</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store';
import ph from '@/helpers/parseHelper';

const Parse = require('parse/dist/parse.min');

Parse.initialize(store.state.parseCred.appId, store.state.parseCred.jsKey);
Parse.serverURL = store.state.parseCred.serverUrl;

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      rememberPassword: false,
      error: '',
      loading: false,
      resetPwdEmail: '',
      resetPwdDialogVisible: false,
      resetSucceed: false,
      resetLoading: false,
      resetFailText: '',
    };
  },
  methods: {
    logInUser(usr, pwd) {
      this.loading = true;
      this.error = '';
      Parse.User.logIn(usr, pwd)
        .then(() => {
          this.$store.commit('loggedIn', true);
          ph.isUserInRole(Parse.User.current().id, 'moderator')
            .then(() => { this.$store.commit('updateRoleMod', true); })
            .catch();
          ph.updateLoginStreak(Parse.User.current());
          this.loading = false;
          this.$store.commit('updateUsername', Parse.User.current().get('username'));

          const nextPath = this.$route.query.redirect ? this.$route.query.redirect : '/';
          this.$router.push(nextPath);
        }, (e) => {
          this.loading = false;
          this.error = e.message;
        });
    },
    resetPwd(email) {
      this.resetLoading = true;
      Parse.User.requestPasswordReset(email)
        .then(() => {
          this.resetSucceed = true;
          this.resetLoading = false;
        })
        .catch((err) => {
          this.resetSucceed = false;
          this.resetLoading = false;
          this.resetFailText = err.message;
        });
    },
  },
  mounted() {
    document.title = 'Login | Oh Sheet!';
    this.$parent.$refs.topNav.$refs.topNavMenu.activeIndex = '/login/';

    if (Parse.User.current() !== null) {
      this.loading = true;
      const nextPath = this.$route.query.redirect ? this.$route.query.redirect : '/';
      this.$router.push(nextPath);
    }

    document.getElementById('login-form').addEventListener('keyup', (e) => {
      e.preventDefault();
      if (e.keyCode === 13 && document.activeElement.id !== 'reset-input') {
        document.getElementById('login-btn').click();
      }
    });
    document.getElementById('reset-dialog').addEventListener('keyup', (e) => {
      e.preventDefault();
      if (e.keyCode === 13 && document.activeElement.id === 'reset-input') {
        document.getElementById('reset-btn').click();
      }
    });
  },
};
</script>
