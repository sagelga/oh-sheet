<template>
  <div class="top-gap signup-wrap">
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
      <el-form v-if="!successfullySignedUp">
        <el-form-item label="อีเมล">
          <el-input type="text" v-model="fields.email"></el-input>
        </el-form-item>
        <el-form-item label="รหัสผ่าน">
          <el-input type="password" v-model="fields.password"></el-input>
        </el-form-item>
        <el-form-item label="ชื่อที่ใช้แสดง">
          <el-input type="text" v-model="fields.username"></el-input>
        </el-form-item>
        <el-button type="primary" round @click="checkBlankFields">สมัครสมาชิก</el-button>
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
      const user = new Parse.User();
      user.save({ username: usr, email: eml, password: pwd })
        .then((response) => {
          this.successfullySignedUp = true;
          console.log(response);
        }, (error) => {
          console.log('e here');
          this.errorOnSignUp = error.message;
        });
    },
  },
};
</script>

<style>
.signup-wrap {
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
}
.card-title-link {
  float: right;
  padding: 3px 0;
  font-size: 0.9em;
}
</style>
