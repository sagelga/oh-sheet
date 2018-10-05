<template>
  <BoxedContainer>
    <el-menu :default-active="defaultActive" mode="horizontal"
             :router="true" style="text-align: right;">

      <el-menu-item index="/">
        <i class="el-icon-search"></i>
      </el-menu-item>

      <el-menu-item index="/saved" v-if="isLoggedIn">
        <i class="el-icon-star-on"></i>
      </el-menu-item>

      <el-menu-item index="/upload" v-if="isLoggedIn">
        <i class="el-icon-upload"></i>
      </el-menu-item>

      <el-submenu id="topnav-more" index="#" v-if="isLoggedIn">
        <template slot="title"><i class="el-icon-setting"></i></template>
        <el-menu-item index="/profile/zartre">โปรไฟล์ของฉัน</el-menu-item>
        <el-menu-item index="#" @click="logOutUser()">ออกจากระบบ</el-menu-item>
      </el-submenu>

      <el-menu-item index="/login" v-if="!isLoggedIn">
        เข้าสู่ระบบ/สมัครสมาชิก
      </el-menu-item>

    </el-menu>
  </BoxedContainer>
</template>

<style>
  .el-menu--horizontal > .el-menu-item,
  .el-menu--horizontal > .el-submenu {
    float: none;
    display: inline-block;
  }

  .el-menu--horizontal > .el-submenu#topnav-more i.el-submenu__icon-arrow {
    display: none;
  }
</style>

<script>
import BoxedContainer from '@/components/BoxedContainer.vue';

const Parse = require('parse/dist/parse.min');

export default {
  name: 'TopNav',
  components: {
    BoxedContainer,
  },
  data() {
    return {
      defaultActive: '/',
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  methods: {
    logOutUser() {
      Parse.User.logOut()
        .then(() => {
          this.$store.commit('loggedIn', false);
        });
    },
  },
};
</script>
