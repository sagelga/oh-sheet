<template>
  <div class="top-gap signup-wrap">
    <el-card>
      <div slot="header">
        <span>สมัครสมาชิก</span>
        <router-link class="card-title-link" to="/login/">เข้าสู่ระบบ</router-link>
      </div>
      <el-form>
        <el-form-item label="อีเมล">
          <el-input type="text" v-model="email"></el-input>
        </el-form-item>
        <el-form-item label="รหัสผ่าน">
          <el-input type="text" v-model="password"></el-input>
        </el-form-item>
        <el-form-item label="ชื่อที่ใช้แสดง">
          <el-input type="text" v-model="username"></el-input>
        </el-form-item>
        <el-button type="primary" round>สมัครสมาชิก</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
      username: '',
    };
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
