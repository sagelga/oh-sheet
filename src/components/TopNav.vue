<template>
  <BoxedContainer class="main-nav-container">
    <el-menu :default-active="defaultActive" mode="horizontal"
             :router="true" class="main-nav" ref="topNavMenu">

      <el-input prefix-icon="el-icon-search" v-model="topSearchInput" id="top-search"></el-input>

      <el-menu-item index="/">
        <span class="material-icons">explore</span>
        สำรวจ
      </el-menu-item>

      <el-menu-item index="/upload/" v-if="isLoggedIn">
        <span class="material-icons">cloud_upload</span>
        อัปโหลด
      </el-menu-item>

      <el-menu-item index="/favourite/" v-if="isLoggedIn">
        <span class="material-icons">star</span>
        ติดดาว
      </el-menu-item>

      <el-submenu id="topnav-more" index="#" v-if="isLoggedIn">
        <template slot="title">
          <span class="material-icons">account_circle</span>
          {{ username }}
          <el-badge value="mod" type="primary" v-if="isModerator"/>
        </template>
        <el-menu-item :index="'/profile/' + username + '/'">โปรไฟล์ของฉัน</el-menu-item>
        <el-menu-item index="/manage-reports/" v-if="isModerator">
          จัดการเนื้อหาไม่เหมาะสม
        </el-menu-item>
        <el-menu-item index="#" @click="logOutUser()">ออกจากระบบ</el-menu-item>
      </el-submenu>

      <el-menu-item index="/login/" v-if="!isLoggedIn">
        เข้าสู่ระบบ / สมัครบัญชีใหม่
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
  .el-input
    display: inline-block
    position: absolute
    left: 0
    max-width: 300px
    margin-top: 10px
    @media screen and (max-width: 1140px)
      margin-left: 1em
    @media screen and (max-width: 640px)
      display: none
  .material-icons
    font-size: 20px
  .el-badge
    top: 3px
    margin-left: 3px
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
      topSearchInput: '',
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.loggedIn;
    },
    username() {
      return this.$store.state.username;
    },
    isModerator() {
      return this.$store.state.roles.mod;
    },
  },
  methods: {
    logOutUser() {
      Parse.User.logOut()
        .then(() => {
          this.$store.commit('loggedIn', false);
          this.$store.commit('updateRoleMod', false);
          this.$store.commit('updateUsername', undefined);
        });
    },
    submitSearch(text) {
      this.$store.commit('updateTopSearchInput', text);
      this.$router.push('/');
    },
  },
  mounted() {
    document.getElementById('top-search').addEventListener('keyup', (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        this.submitSearch(this.topSearchInput);
        this.topSearchInput = '';
      }
    });
    document.getElementById('top-search').addEventListener('click', () => {
      if (this.$router.currentRoute.path === '/') document.getElementById('home-title-input').focus();
    });
  },
};
</script>
