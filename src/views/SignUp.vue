<template>
  <div class="top-gap bottom-gap login-wrap make-footer-sticky">
    <el-card>
      <div slot="header">
        <span>สมัครสมาชิก</span>
        <router-link class="card-title-link" to="/login/">มีบัญชีแล้ว? เข้าสู่ระบบ</router-link>
      </div>
      <el-alert title="กรุณากรอกให้ครบทุกช่อง" type="error" v-show="hasBlankField"></el-alert>
      <el-alert :title="errorOnSignUp" type="error" v-show="errorOnSignUp"></el-alert>
      <el-alert
          title="สมัครสมาชิกเรียบร้อย กรุณาคลิกลิงก์ในอีเมลเพื่อยืนยันการสมัคร"
          type="success" :closable="false" v-if="successfullySignedUp">
      </el-alert>
      <el-form id="signup-form" v-if="!successfullySignedUp" v-loading="loading">
        <el-form-item label="อีเมล">
          <el-input type="text" v-model="fields.email"></el-input>
        </el-form-item>
        <el-form-item label="รหัสผ่าน">
          <el-input type="password" v-model="fields.password"></el-input>
        </el-form-item>
        <el-form-item label="ชื่อผู้ใช้งาน">
          <el-input type="text" v-model="fields.username"></el-input>
        </el-form-item>
        <el-button id="signup-btn" type="primary" round @click="checkBlankFields"
                   style="margin-top: 1em">สมัครสมาชิก
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
const Parse = require('parse/dist/parse.min');

Parse.initialize('A7gOtAmlXetuUbCejDVjEPiyMJpR4ET9TSjDHiqP', 'UaRg8CWpNhY9WbkDk93Ki6LQZ7ssnQfVRMXYyRJr');
Parse.serverURL = 'https://parseapi.back4app.com/';

export default {
  name: 'SignUp',
  data() {
    return {
      fields: {
        username: '',
        email: '',
        password: '',
      },
      hasBlankField: false,
      successfullySignedUp: false,
      errorOnSignUp: '',
      loading: false,
    };
  },
  methods: {
    checkBlankFields() {
      this.hasBlankField = false;
      this.errorOnSignUp = '';
      const allFields = Object.values(this.fields);
      allFields.forEach((f) => {
        if (f === '') this.hasBlankField = true;
      });
      if (!this.hasBlankField) {
        this.signUpUser(this.fields.username, this.fields.email, this.fields.password);
      }
    },
    signUpUser(usr, eml, pwd) {
      this.loading = true;
      const user = new Parse.User();
      const today = new Date();
      const m = today.getMonth() + 1;
      const d = today.getDate();
      // eslint-disable-next-line
      const mStr = m < 10 ? '0' + m : m;
      // eslint-disable-next-line
      const dStr = d < 10 ? '0' + d : d;
      const todayStr = `${today.getFullYear()}-${mStr}-${dStr}`;
      user.save({
        username: usr,
        email: eml,
        password: pwd,
        achievements: {
          earlyBird: true,
          loginStreak: [todayStr],
          maxLoginStreak: 1,
        },
      })
        .then(() => {
          this.successfullySignedUp = true;
          this.loading = false;
        }, (error) => {
          this.errorOnSignUp = error.message;
          this.loading = false;
        });
    },
  },
  mounted() {
    document.title = 'Sign Up | Oh Sheet!';
    this.$parent.$refs.topNav.$refs.topNavMenu.activeIndex = '/signup/';

    if (Parse.User.current() !== null) {
      this.$router.push('/');
    }

    document.getElementById('signup-form').addEventListener('keyup', (e) => {
      e.preventDefault();
      if (e.keyCode === 13) document.getElementById('signup-btn').click();
    });
  },
};
</script>
