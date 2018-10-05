<template>
  <div class="top-gap login-wrap">
    <el-card>
      <div slot="header">
        <span>สมัครสมาชิก</span>
        <router-link class="card-title-link" to="/login/">เข้าสู่ระบบ</router-link>
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
        <el-form-item label="ชื่อที่ใช้แสดง">
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
      user.save({
        username: usr,
        email: eml,
        password: pwd,
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
    document.getElementById('signup-form').addEventListener('keyup', (e) => {
      e.preventDefault();
      if (e.keyCode === 13) document.getElementById('signup-btn').click();
    });
  },
};
</script>
