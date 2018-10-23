<template>
  <BoxedContainer class="main-nav-container">
    <el-menu :default-active="defaultActive" mode="horizontal"
             :router="true" class="main-nav">

      <el-menu-item index="/">
        <i class="el-icon-search"></i>
      </el-menu-item>

      <el-menu-item index="/favourite" v-if="isLoggedIn">
        <i class="el-icon-star-on"></i>
      </el-menu-item>

      <el-menu-item index="/upload" v-if="isLoggedIn">
        <i class="el-icon-upload"></i>
      </el-menu-item>

      <el-submenu id="topnav-more" index="#" v-if="isLoggedIn">
        <template slot="title"><i class="el-icon-setting"></i></template>
        <el-menu-item :index="'/profile/' + username">โปรไฟล์ของฉัน</el-menu-item>
        <el-menu-item index="#" @click="logOutUser()">ออกจากระบบ</el-menu-item>
      </el-submenu>

      <el-menu-item index="/login" v-if="!isLoggedIn">
        เข้าสู่ระบบ/สมัครสมาชิก
      </el-menu-item>

    </el-menu>
  </BoxedContainer>
</template>

<style lang="sass">
  .main-nav-container
    position: fixed
    width: 100%
    max-width: 100%
    z-index: 2000
    & + div:not(.top-gap)
      padding-top: 61px
  .main-nav
    margin-left: auto
    margin-right: auto
    max-width: 1100px
    text-align: right
    box-shadow: 0 10px 10px -8px rgba(0, 0, 0, 0.2)
    & > .el-menu-item, & > .el-submenu
      float: none
      display: inline-block
    & > .el-submenu#topnav-more i.el-submenu__icon-arrow
      display: none
</style>

<script>
import BoxedContainer from '@/components/BoxedContainer.vue';
import store from '@/store';

const Parse = require('parse/dist/parse.min');

Parse.initialize(store.state.parseCred.appId, store.state.parseCred.jsKey);
Parse.serverURL = store.state.parseCred.serverUrl;

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
    username() {
      return Parse.User.current().get('username');
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
