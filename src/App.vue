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
.lecture-not-found
  display: block
  width: 100%
  max-width: 360px
  margin-top: 2em
  margin-left: auto
  margin-right: auto
.el-dialog
  width: 100%
  max-width: 400px
  @media screen and (max-width: 360px)
    height: 100vh
    margin-top: 0 !important
</style>

<script>
import store from '@/store';
import TopNav from '@/components/TopNav.vue';
import ph from '@/helpers/parseHelper';
import ut from '@/helpers/util';

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
      this.$store.commit('updateUsername', Parse.User.current().get('username'));
      ph.updateLoginStreak(Parse.User.current());
      ph.isUserInRole(Parse.User.current().id, 'moderator')
        .then(() => { this.$store.commit('updateRoleMod', true); })
        .catch();
      ph.getLectureCategories()
        .then((categories) => {
          const tempCategories = [];
          const catAttrs = ['objectId', 'thaiName', 'englishName', 'value'];
          categories.forEach((c) => {
            tempCategories.push(ut.getObjWithAttrs(c, catAttrs));
          });
          this.$store.commit('updateCategoryList', tempCategories);
        });
    }
  },
};
</script>
