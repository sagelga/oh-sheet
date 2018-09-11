<template>
  <div class="top-gap login-wrap">
    <el-card>
      <div slot="header" class="clearfix">
        <span>เข้าสู่ระบบ</span>
        <el-button style="float: right; padding: 3px 0" type="text">สมัครสมาชิก</el-button>
      </div>
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
        <el-button type="primary" round>เข้าสู่ระบบ</el-button>
        <el-button type="text" style="margin-right: 2em">ลืมรหัสผ่าน</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<style>
  .login-wrap {
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
  }
</style>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      rememberPassword: false,
    };
  },
};
</script>

