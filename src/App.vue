<template>
  <div id="app">
    <TopNav ref="topNav"></TopNav>
    <router-view/>
  </div>
</template>

<style lang="sass">
#mti_wfs_colophon
  visibility: hidden
body
  font-family: sans-serif
h1, h2, h3, h4, h5, h6, .el-form-item__label, .el-button
  font-family: 'Neue Helvetica W31', sans-serif
h1, h2
  line-height: 1.5em
  margin-top: 0
a
  color: #409EFF
  text-decoration: none
  &:visited
    color: #409EFF
  &:hover
    color: #409EFF - 20
.el-form-item
  margin-bottom: 0.5em
.material-icons
  font-size: 1em
  vertical-align: middle
.top-gap
  padding-top: 7em
.bottom-gap
  margin-bottom: 5em
.side-margin
  margin-left: 10px
  margin-right: 10px
.login-wrap
  max-width: 350px
  margin-left: auto
  margin-right: auto
.el-card.is-hover-shadow:hover
  border-color: #0000ff
.card-title-link
  float: right
  padding: 3px 0
  font-size: 0.9em
.dropzone
  border: 1px solid #dcdfe6 !important
  border-radius: 4px
  &:hover
    border-color: #c0c4cc !important
</style>

<script>
import store from '@/store';
import TopNav from '@/components/TopNav.vue';

const Parse = require('parse/dist/parse.min');

Parse.initialize(store.state.parseCred.appId, store.state.parseCred.jsKey);
Parse.serverURL = store.state.parseCred.serverUrl;

export default {
  components: {
    TopNav,
  },
  mounted() {
    if (Parse.User.current()) {
      this.$store.commit('loggedIn', true);
    }
  },
};
</script>
