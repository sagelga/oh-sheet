<template>
  <div id="app">
    <TopNav></TopNav>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  font-family: sans-serif;
}
h1, h2 {
  line-height: 1.5em;
  margin-top: 0;
}
a {
  color: #409EFF;
  text-decoration: none;
  &:visited {
    color: #409EFF;
  }
  &:hover {
    color: #409EFF - 20;
  }
}
.el-form-item {
  margin-bottom: 0.5em;
}
.material-icons {
  font-size: 1em;
  vertical-align: middle;
}
.top-gap {
  margin-top: 5em;
}
.row-wrap {
  margin-left: 10px;
  margin-right: 10px;
}
.login-wrap {
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

<script>
import TopNav from '@/components/TopNav.vue';

export default {
  components: {
    TopNav,
  },
};
</script>
