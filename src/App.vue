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
.top-gap {
  margin-top: 5em;
}
.row-wrap {
  margin-left: 10px;
  margin-right: 10px;
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
